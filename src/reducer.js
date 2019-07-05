const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      //   return [action.payload];
      return { token: action.payload };
    case "logout":
      //   return [];
      return { token: "" };
    default:
      return state;
  }
};

export default reducer;
