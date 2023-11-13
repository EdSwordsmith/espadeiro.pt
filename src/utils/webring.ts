interface WebringURL {
  name: string;
  url: string;
}

interface WebringURLs {
  prev: WebringURL;
  next: WebringURL;
}

export default async (): Promise<WebringURLs> => {
  const res = await fetch(
    "https://pombosmalvados.github.io/webring/webring.json",
  );
  const websites: WebringURL[] = await res.json();

  const index = websites.findIndex(
    (website) => website.name === "Eduardo Espadeiro",
  );
  const prevIndex = (index + websites.length - 1) % websites.length;
  const nextIndex = (index + 1) % websites.length;
  const prev = websites[prevIndex];
  const next = websites[nextIndex];

  return {
    prev,
    next,
  };
};
