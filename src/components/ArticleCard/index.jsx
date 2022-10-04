import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
function ArticleCard(props) {
  const { article } = props;
  const maxLine = {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
    height: 56,
  };
  return (
    <CardActionArea component={Link} to="/">
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography
            component="h2"
            variant="h5"
            sx={{ ...maxLine, WebkitLineClamp: 2 }}
          >
            {article.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ my: 2 }}>
            {article.date}
          </Typography>
          <Typography
            variant="subtitle1"
            paragraph
            sx={{ ...maxLine, height: 112 }}
          >
            {article.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        {article.image ? (
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={article.image}
          />
        ) : (
          <Box
            sx={{
              width: 160,
              display: { xs: "none", sm: "block" },
              backgroundColor: "primary.dark",
            }}
          />
        )}
      </Card>
    </CardActionArea>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArticleCard;
