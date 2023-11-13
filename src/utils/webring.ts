interface WebringURL {
  name: string;
  url: string;
}

interface WebringURLs {
  prev: WebringURL;
  next: WebringURL;
}

const fetchFromAPI = async (): Promise<WebringURL[]> => {
  try {
    const res = await fetch(
      "https://pombosmalvados.github.io/webring/webring.json",
    );
    const websites: WebringURL[] = await res.json();

    return websites;
  } catch {
    return [
      { name: "Friend", url: "#" },
      { name: "Eduardo Espadeiro", url: "#" },
    ];
  }
};

export default async (): Promise<WebringURLs> => {
  const websites = await fetchFromAPI();
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
