use std::{
    fs::File,
    io::{self, Write},
    path::Path,
};

use chrono::DateTime;
use rss::{
    ChannelBuilder,
    ItemBuilder,
};

use crate::{
    blog::Post,
    data,
};

pub fn generate_rss(posts: &[Post], out_dir: impl AsRef<Path>) -> io::Result<()> {
    let items: Vec<_> = posts
        .iter()
        .map(|post| {
            let url = format!("{}/blog/{}", data::BASE_URL, post.slug);
            let pub_date = DateTime::parse_from_rfc3339(&post.frontmatter.date.to_string()).unwrap();

            ItemBuilder::default()
                .title(Some(post.frontmatter.title.clone()))
                .link(Some(url))
                .description(Some(post.frontmatter.description.clone()))
                .content(Some(post.content.clone()))
                .pub_date(Some(pub_date.to_rfc2822()))
                .build()
        })
        .collect();

    let channel = ChannelBuilder::default()
        .title("Eduardo's Blog")
        .link(data::BASE_URL)
        .description("A blog about programming and other things.")
        .items(items)
        .build();

    let file = File::create(out_dir.as_ref().join("rss.xml"))?;
    channel.write_to(file).map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
    Ok(())
}

pub fn generate_sitemap(posts: &[Post], out_dir: impl AsRef<Path>) -> io::Result<()> {
    let mut file = File::create(out_dir.as_ref().join("sitemap.xml"))?;
    writeln!(file, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>")?;
    writeln!(
        file,
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
    )?;

    let home_url = data::BASE_URL;
    writeln!(file, "  <url>")?;
    writeln!(file, "    <loc>{}</loc>", home_url)?;
    writeln!(file, "  </url>")?;

    let blog_url = format!("{}/blog", data::BASE_URL);
    writeln!(file, "  <url>")?;
    writeln!(file, "    <loc>{}</loc>", blog_url)?;
    writeln!(file, "  </url>")?;

    for post in posts {
        let post_url = format!("{}/blog/{}", data::BASE_URL, post.slug);
        let pub_date = DateTime::parse_from_rfc3339(&post.frontmatter.date.to_string()).unwrap();

        writeln!(file, "  <url>")?;
        writeln!(file, "    <loc>{}</loc>", post_url)?;
        writeln!(
            file,
            "    <lastmod>{}</lastmod>",
            pub_date.format("%Y-%m-%d")
        )?;
        writeln!(file, "  </url>")?;
    }

    writeln!(file, "</urlset>")?;

    Ok(())
}
