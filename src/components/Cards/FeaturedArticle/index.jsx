import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import Moment from "react-moment";
function FeaturedArticle(props) {
  const { article } = props;
  const maxLine = {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  };
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        mb: 4,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${article.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}

      {article.image && (
        <img
          style={{ display: "none" }}
          src={article.image}
          alt={article.imageText}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Grid container>
        <Grid item md={11}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography
              component="h2"
              variant={window.innerWidth > 768 ? "h4" : "h6"}
              color="inherit"
              gutterBottom
              sx={{ ...maxLine, WebkitLineClamp: 2 }}
            >
              {article.title}
            </Typography>
            <Typography variant="subtitle1" color="inherit" sx={{ my: 2 }}>
              <Moment fromNow>{new Date(article.date)}</Moment>
            </Typography>
            <Typography
              variant={window.innerWidth > 768 ? "h6" : "subtitle1"}
              color="inherit"
              paragraph
              sx={{ ...maxLine, WebkitLineClamp: 4 }}
            >
              {article.description}
            </Typography>
            <Link variant="subtitle1" to={article.link} component={RouterLink}>
              {article.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

FeaturedArticle.propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedArticle;
