import { useDispatch, useSelector } from "react-redux";
import { filterArticles } from "../redux/reducers/article";
const mapState = (state) => {
  return {
    article: state.article,
  };
};
const useArticles = () => {
  const dispatch = useDispatch();
  const { article } = useSelector(mapState);
  const setSearch = (str) => {
    dispatch(filterArticles({ search: str }));
  };
  return [article, setSearch];
};
export default useArticles;
