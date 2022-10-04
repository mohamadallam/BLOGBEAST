import React, { useEffect, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ArticleCard from "../../components/ArticleCard";
import SearchBar from "../../components/SearchBar";
import useArticles from "../../hooks/useArticles";
import { FetchArticles } from "../../redux/reducers/article";
import { useDispatch } from "react-redux";
import { formatArticel } from "../../utils";
import LoadMoreBox from "../../components/LoadMoreBox";
import { useOnScreen } from "../../hooks/useOnScreen";
function Dashboard() {
  const dispatch = useDispatch();
  const [data] = useArticles();
  const loader = useRef();
  const isOnScreen = useOnScreen(loader);
  const { articles, loading, filter, allArticlesLoaded } = data;

  let mounted = false;
  let page = 0;
  useEffect(() => {
    if (!mounted) {
      mounted = true;
      loadArticles();
    }
  }, []);
  useEffect(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (
      !loading &&
      !filter?.search &&
      !allArticlesLoaded &&
      top > 0 &&
      isOnScreen
    ) {
      page += 1;
      loadMoreArticles();
    }
  }, [isOnScreen]);

  const loadArticles = () => {
    dispatch(FetchArticles({ loadMore: false, page }));
  };
  const loadMoreArticles = () => {
    dispatch(FetchArticles({ loadMore: true, page }));
  };

  const getBoxMsg = () => {
    if (loading) {
      return "Loading More Articles...";
    } else if (filter?.search) {
      return "You are searching in loaded articles,\n to load More Articles Clear Search Input  \n and \n scroll to bottom .";
    } else if (allArticlesLoaded) {
      return "All Articles Loaded.";
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
          return (
            <Grid key={index} item xs={12} md={6}>
              <ArticleCard article={formatArticel(article)} />
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
