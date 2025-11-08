use std::{
    error::Error,
    fs::File,
    io::{self, Write},
    path::Path,
};

use rss::{ChannelBuilder, ItemBuilder};
use time::{OffsetDateTime, format_description};

use crate::{blog::Post, data};

pub fn generate_rss(posts: &[Post], out_dir: impl AsRef<Path>) -> Result<(), Box<dyn Error>> {
    let items: Vec<_> = posts
        .iter()
        .filter_map(|post| {
            let url = format!("{}/blog/{}", data::BASE_URL, post.slug);
            let pub_date = OffsetDateTime::parse(
                &post.frontmatter.date.to_string(),
                &format_description::well_known::Rfc3339,
            )
            .ok()?;

            let formatted_pub_date = pub_date
                .format(&format_description::well_known::Rfc2822)
                .ok()?;

            Some(
                ItemBuilder::default()
                    .title(Some(post.frontmatter.title.clone()))
                    .link(Some(url))
                    .description(Some(post.frontmatter.description.clone()))
                    .content(Some(post.content.clone()))
                    .pub_date(Some(formatted_pub_date))
                    .build(),
            )
        })
        .collect();

    let channel = ChannelBuilder::default()
        .title("Eduardo's Blog")
        .link(data::BASE_URL)
        .description("A blog about programming and other things.")
        .items(items)
        .build();

    let file = File::create(out_dir.as_ref().join("rss.xml"))?;
    channel
        .write_to(file)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e))?;
    Ok(())
}

pub fn generate_sitemap(posts: &[Post], out_dir: impl AsRef<Path>) -> Result<(), Box<dyn Error>> {
    let mut file = File::create(out_dir.as_ref().join("sitemap.xml"))?;
    writeln!(file, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>")?;
    writeln!(
        file,
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">"
    )?;

    let home_url = data::BASE_URL;
    writeln!(file, "  <url>")?;
    writeln!(file, "    <loc>{}\n</loc>", home_url)?;
    writeln!(file, "  </url>")?;

    let blog_url = format!("{}/blog", data::BASE_URL);
    writeln!(file, "  <url>")?;
    writeln!(file, "    <loc>{}\n</loc>", blog_url)?;
    writeln!(file, "  </url>")?;

    for post in posts {
        let post_url = format!("{}/blog/{}", data::BASE_URL, post.slug);
        let pub_date = OffsetDateTime::parse(
            &post.frontmatter.date.to_string(),
            &format_description::well_known::Rfc3339,
        )?;

        writeln!(file, "  <url>")?;
        writeln!(file, "    <loc>{}\n</loc>", post_url)?;
        writeln!(
            file,
            "    <lastmod>{}\n</lastmod>",
            pub_date.format(&time::macros::format_description!("[year]-[month]-[day]"))?
        )?;
        writeln!(file, "  </url>")?;
    }

    writeln!(file, "</urlset>")?;

    Ok(())
}
