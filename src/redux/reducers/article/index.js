import { createSlice } from "@reduxjs/toolkit";
import { Push } from "../notify";
import axios from "../../../axios";
import Fuse from "fuse.js";
export const initialState = {
  articles: [],
  filter: { search: "", items: [] },
  loading: false,
  allArticlesLoaded: false,
  page: 0,
};

const ArticleSlice = createSlice({
  name: "Article",
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter.search = payload.search;
      state.filter.items = payload.items;

      return state;
    },
    Fetch: (state, { payload }) => {
      state.articles = payload.articles;
      state.page = payload.page;
      state.allArticlesLoaded = payload.allArticlesLoaded;
      return state;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
      return state;
    },
  },
});

export const FetchArticles = ({ page, loadMore = false }) => async (
  dispatch,
  getState
) => {
  try {
    const state = getState();
    let {
      article: { articles },
    } = state;

    dispatch(setLoading(true));
    const { data } = await axios.get(`/articles`, {
      params: { page },
    });
    const {
      response: { docs },
    } = data;

    dispatch(
      Fetch({
        articles: loadMore ? [...articles, ...docs] : docs,
        allArticlesLoaded: docs.length === 0,
        page,
      })
    );
    let msg = !loadMore
      ? "Articles Loaded, successfully!."
      : "more articles loaded, successfully!.";
    dispatch(Push({ message: msg, variant: "success" }));
  } catch (err) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const filterArticles = ({ search }) => async (dispatch, getState) => {
  try {
    if (!search) {
      dispatch(setFilter(initialState.filter));
      return;
    }

    const state = getState();

    const {
      article: { articles },
    } = state;
    const fuse = new Fuse(articles, {
      keys: ["lead_paragraph", "abstract"],
    });
    const newArticles = fuse.search(search).map((i) => i.item);
    dispatch(setFilter({ search, items: newArticles }));
  } catch (err) {
  } finally {
  }
};

export const { setFilter, Fetch, setLoading } = ArticleSlice.actions;
export default ArticleSlice.reducer;
