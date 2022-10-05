export const formatArticel = (article) => {
  const image =
    article.multimedia.length > 0
      ? "https://static01.nyt.com/" + article.multimedia[0].url
      : null;
  return {
    date: article.pub_date,
    description: article.lead_paragraph,
    image,
    title: article.abstract,
    linkText: "Continue reading...",
    link: "/",
  };
};
