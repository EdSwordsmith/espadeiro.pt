use std::{
    error::Error,
    fs, io,
    path::Path,
    process::{Command, Stdio},
};
use tera::{Context, Tera};

mod blog;
mod data;
mod webring;

fn copy_static_files(src: impl AsRef<Path>, dst: impl AsRef<Path>) -> io::Result<()> {
    fs::create_dir_all(&dst)?;
    for entry in fs::read_dir(src)? {
        let entry = entry?;
        if entry.file_type()?.is_dir() {
            copy_static_files(entry.path(), dst.as_ref().join(entry.file_name()))?;
        } else {
            fs::copy(entry.path(), dst.as_ref().join(entry.file_name()))?;
        }
    }
    Ok(())
}

fn rebuild_tailwindcss(out_dir: impl AsRef<Path>) -> Result<(), Box<dyn Error>> {
    let mut child = Command::new("tailwindcss")
        .args([
            "-o",
            out_dir
                .as_ref()
                .join("output.css")
                .to_str()
                .ok_or("Error converting path to str.")?,
        ])
        .stderr(Stdio::null())
        .spawn()?;
    child.wait()?;
    Ok(())
}

fn main() -> Result<(), Box<dyn Error>> {
    let tera = Tera::new("templates/**/*.html")?;
    let mut context = Context::new();
    if let Some(neighbors) = webring::fetch_neighbors() {
        context.insert("webring", &neighbors);
    }

    context.insert("likes", data::LIKES);
    context.insert("projects", data::PROJECTS);
    context.insert("jobs", data::JOBS);

    let posts = blog::fetch_posts()?;
    context.insert("posts", &posts);

    let out_dir = Path::new("dist");

    copy_static_files("static", out_dir)?;
    rebuild_tailwindcss(out_dir)?;

    let file = fs::File::create(out_dir.join("index.html"))?;
    tera.render_to("home.html", &context, file)?;

    let blog_dir = out_dir.join("blog");
    fs::create_dir_all(&blog_dir)?;
    let file = fs::File::create(blog_dir.join("index.html"))?;
    tera.render_to("blog.html", &context, file)?;

    for post in posts.iter() {
        let post_dir = blog_dir.join(&post.slug);
        fs::create_dir_all(&post_dir)?;
        let file = fs::File::create(post_dir.join("index.html"))?;
        context.insert("post", post);
        tera.render_to("post.html", &context, file)?;
    }

    Ok(())
}
