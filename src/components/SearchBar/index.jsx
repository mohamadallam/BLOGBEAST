import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import useArticles from "../../hooks/useArticles";
export default function CustomizedInputBase() {
  const [{ filter }, setSearch] = useArticles();
  const handleClear = () => setSearch(null);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Paper
      component="div"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <InputBase
        onChange={handleChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search  in Loaded Articles"
        inputProps={{ "aria-label": "search in Loaded Articles" }}
        value={filter?.search || ""}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="clear input"
              onClick={handleClear}
              edge="end"
              sx={{
                visibility: filter && filter?.search ? "visible" : "hidden",
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <IconButton type="button" sx={{ p: "10px", mx: 1 }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
