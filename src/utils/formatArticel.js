import moment from "moment";
export const formatArticel = (article) => {
  const image =
    article.multimedia.length > 0
      ? "https://static01.nyt.com/" + article.multimedia[0].url
      : null;
  const date = moment(article.pub_date).fromNow();
  return {
    date,
    description: article.lead_paragraph,
    image,
    title: article.abstract,
  };
};
