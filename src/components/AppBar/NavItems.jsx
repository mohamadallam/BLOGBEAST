import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import NavLinks from "../../routes/NavLinks";
import { useNavigate } from "react-router-dom";

import { MenuItem, Menu, Box, Button, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch } from "react-redux";
export default function NavItems() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [menus, setMenus] = useState({});
  const handleOpenMenu = (event, key) => {
    let openedMenu = { ...menus };
    openedMenu[key] = event.currentTarget;
    setMenus(openedMenu);
  };
  const handleCloseMenu = (key) => {
    if (!Boolean(menus[key])) {
      return;
    }
    let openedMenu = { ...menus };
    delete openedMenu[key];
    setMenus(openedMenu);
  };
  const handleClick = (e, link, key) => {
    e.preventDefault();
    if (link?.onclick) {
      link.onclick();
    } else if (link?.path) {
      navigate(link?.path);
    }

    handleCloseMenu(key);
  };
  return NavLinks({ dispatch, ...auth })?.map((link, index) => {
    let key = link?.id || index;
    let isMenu =
      link?.children &&
      Array.isArray(link?.children) &&
      link?.children.length > 0;
    if (!isMenu) {
      return (
        <Button
          key={key}
          onClick={(e) => handleClick(e, link, key)}
          sx={{
            my: 2,
            color: "white",
          }}
        >
          {link?.name}
        </Button>
      );
    }
    if (isMenu) {
      return (
        <Box sx={{ flexGrow: 0 }} key={key}>
          <Tooltip title={link?.name}>
            <Button
              onClick={(e) => handleOpenMenu(e, key)}
              sx={{
                cursor: "pointer",
                color: "#fff",
              }}
              endIcon={
                Boolean(menus[key]) ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
            >
              {link?.name}
            </Button>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={menus[key] || null}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(menus[key])}
            onClose={() => handleCloseMenu(key)}
          >
            {link.children.map((childLink, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={(e) => handleClick(e, childLink, key)}
                >
                  {childLink?.name}
                </MenuItem>
              );
            })}
          </Menu>
        </Box>
      );
    }
    return null;
  });
}
