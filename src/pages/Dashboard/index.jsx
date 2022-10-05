import React, { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ArticleCard from "../../components/Cards/Article";
import SearchBar from "../../components/SearchBar";
import useArticles from "../../hooks/useArticles";
import { FetchArticles } from "../../redux/reducers/article";
import { useDispatch } from "react-redux";
import { formatArticel } from "../../utils";
import LoadMoreBox from "../../components/LoadMoreBox";
import { useOnScreen } from "../../hooks/useOnScreen";
import FeaturedArticle from "../../components/Cards/FeaturedArticle";
function Dashboard() {
  const dispatch = useDispatch();
  const [data] = useArticles();
  const loader = useRef();
  const mounted = useRef(false);
  const isOnScreen = useOnScreen(loader);
  const { articles, loading, filter, allArticlesLoaded, page } = data;

  useEffect(() => {
    // fetch articles when component mounted
    if (!mounted.current) {
      dispatch(FetchArticles({ loadMore: false, page }));
      mounted.current = true;
    }
  }, [dispatch, page]);
  useEffect(() => {
    // load more articles
    //    only when box show on screen
    //    scroll top > 0
    //    search input empty
    //    has more articles (until no more articles loaded)
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top > 0 && isOnScreen && mounted.current) {
      if (!loading && !filter?.search && !allArticlesLoaded) {
        dispatch(FetchArticles({ loadMore: true, page: page + 1 }));
      }
    }
  }, [isOnScreen, page, loading, filter, allArticlesLoaded, dispatch]);

  const getBoxMsg = () => {
    if (loading) {
      return "Loading More Articles...";
    } else if (filter?.search) {
      return "You are searching in loaded articles,\n to load More Articles Clear Search Input  \n and \n scroll to bottom .";
    } else if (allArticlesLoaded) {
      return "All Articles Loaded.";
    } else if (
      !articles ||
      (Array.isArray(articles) && articles.length === 0)
    ) {
      return "No Articles found!.";
    }
    return "Scroll down to load More Articles.";
  };
  const getArticles = () => {
    if (filter && filter.search) {
      return filter.items;
    }
    return articles;
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <SearchBar />
          </Grid>
        </Grid>
        {(getArticles() || []).map((article, index) => {
          let isFeatured = index % 3 === 0 || filter?.search;
          return (
            <Grid key={index} item xs={12} md={isFeatured ? 12 : 6}>
              {!isFeatured ? (
                <ArticleCard article={formatArticel(article)} />
              ) : (
                <FeaturedArticle article={formatArticel(article)} />
              )}
            </Grid>
          );
        })}
        <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          ref={loader}
        >
          <Grid item xs={6} md={6}>
            <LoadMoreBox loading={loading} message={getBoxMsg()} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
