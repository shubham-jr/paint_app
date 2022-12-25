export default (state = null, action) => {
  if (action.type === "SELECT_TOOL") {
    return (state = action.payload);
  }
  return state;
};
