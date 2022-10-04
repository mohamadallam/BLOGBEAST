import { useSelector } from "react-redux";
const mapState = (state) => {
  return {
    site: state.site,
  };
};
const useSite = () => {
  const { site } = useSelector(mapState);

  return site;
};
export default useSite;
