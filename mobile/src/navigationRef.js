import { NavigationActions } from "react-navigation";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

// Function that will tell React to change its state, and to show a
// different screen to the User
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
