use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct Website {
    name: String,
    url: String,
}

fn fetch_webring_members() -> Result<Vec<Website>, ureq::Error> {
    let mut response = ureq::get("https://pombosmalvados.github.io/webring/webring.json").call()?;
    let body = response.body_mut().read_json()?;
    Ok(body)
}

pub fn fetch_neighbors() -> Option<(Website, Website)> {
    let webring = fetch_webring_members().ok()?;
    let pos = webring
        .iter()
        .position(|website| website.name == "Eduardo Espadeiro")?;
    let prev = webring[(webring.len() + pos - 1) % webring.len()].clone();
    let next = webring[(pos + 1) % webring.len()].clone();
    Some((prev, next))
}
