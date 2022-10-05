import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { Link as RouterLink } from "react-router-dom";
import Moment from "react-moment";
function Article(props) {
  const { article } = props;
  const maxLine = {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
    height: 56,
  };
  return (
    <CardActionArea component={"div"}>
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
            <Moment fromNow>{new Date(article.date)}</Moment>
          </Typography>
          <Typography
            variant="subtitle1"
            paragraph
            sx={{ ...maxLine, height: 112 }}
          >
            {article.description}
          </Typography>
          <Link variant="subtitle1" to={article.link} component={RouterLink}>
            {article.linkText}
          </Link>
        </CardContent>
        {article.image ? (
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={article.image}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 160,
            }}
          >
            <PanoramaIcon color="primary" sx={{ fontSize: 60 }} />
          </Box>
        )}
      </Card>
    </CardActionArea>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
