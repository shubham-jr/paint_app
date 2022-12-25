export default (state = null, action) => {
  if (action.type === "SELECT_COLOR") {
    return (state = action.payload);
  }
  return state;
};
