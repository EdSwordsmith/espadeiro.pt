use comrak::nodes::AstNode;
use serde::{Deserialize, Serialize};
use std::{error::Error, fs, io, path::Path};
use toml::value::Datetime;

#[derive(Debug, Deserialize, Serialize)]
pub struct FrontMatter {
    title: String,
    date: Datetime,
    image: Option<String>,
    description: String,
}

#[derive(Debug, Serialize)]
pub struct Post {
    pub frontmatter: FrontMatter,
    content: String,
    pub slug: String,
}

fn parse_frontmatter<'a>(root: &'a AstNode<'a>) -> Result<FrontMatter, Box<dyn Error>> {
    for node in root.descendants() {
        if let comrak::nodes::NodeValue::FrontMatter(ref frontmatter) = node.data.borrow().value {
            let lines = frontmatter.lines().skip(1);
            let count = lines.clone().count() - 2;
            let toml_frontmatter = lines.take(count).collect::<Vec<_>>().join("\n");
            let parsed = toml::from_str(&toml_frontmatter)?;
            return Ok(parsed);
        }
    }

    Err("Missing frontmatter.".into())
}

fn get_post_slug(filename: impl AsRef<Path>) -> Option<String> {
    Some(
        filename
            .as_ref()
            .with_extension("")
            .file_name()?
            .to_str()?
            .into(),
    )
}

fn parse_post(filename: impl AsRef<Path>) -> Result<Post, Box<dyn Error>> {
    let markdown = fs::read_to_string(filename.as_ref())?;
    let arena = comrak::Arena::new();
    let mut options = comrak::Options::default();
    options.extension.front_matter_delimiter = Some("---".to_owned());
    let root = comrak::parse_document(&arena, &markdown, &options);

    let frontmatter = parse_frontmatter(root)?;
    let mut html = Vec::new();
    comrak::format_html(root, &comrak::Options::default(), &mut html)?;

    Ok(Post {
        frontmatter,
        slug: get_post_slug(filename).ok_or("Cannot compute post's slug.")?,
        content: String::from_utf8(html)?,
    })
}

pub fn fetch_posts() -> io::Result<Vec<Post>> {
    let mut posts: Vec<Post> = fs::read_dir("posts")?
        .filter_map(Result::ok)
        .map(|entry| entry.path())
        .filter(|path| path.extension().map(|ext| ext.to_str()).flatten() == Some("md"))
        .filter_map(|path| parse_post(path).ok())
        .collect();

    posts.sort_by(|a, b| b.frontmatter.date.cmp(&a.frontmatter.date));

    Ok(posts)
}
