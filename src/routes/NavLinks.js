import { signOut } from "../redux/reducers/auth";

const NavLinks = ({ dispatch, isAuth, user }) => {
  const handleLogout = () => {
    console.log("handleLogout");
    dispatch(signOut());
  };
  switch (isAuth) {
    case true:
      return [
        {
          path: null,
          name: user.username,
          id: "profile-menu",
          Icon: null,
          onclick: null,
          children: [
            {
              name: "Logout",
              Icon: null,
              id: "logout",
              onclick: handleLogout,
              path: null,
            },
          ],
        },
      ];

    default:
      return [
        {
          path: "/login",
          name: "SignIn",
          Icon: null,
          id: "login",
          onclick: null,
          children: [],
        },
      ];
  }
};
export default NavLinks;
