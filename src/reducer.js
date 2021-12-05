export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  // remove initial token after finished debugging...
  // token:
  //   "BQBLNpWpxxq2Uc8195eQI-b5huK6KAQJp50mDNQlYhMFJzGmEfLm94kZsqyNm7ngu9W7WdbKYZg8FLesNKxNEoOMTqV82c-t7T2T7OHyCUgzp7D2qZudFJMi1kkLkBsuS7U3jTxmuO7TL_e3lb7gVEt0OwNrGM5dXBh9moD-pSgKqR51gfAGZzs4bNK6oL_GnFJczVemDMBZE4mhrg",
};

const reducer = (state, action) => {
  console.log(action);

  //Action -> type, [payload]

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };

    default:
      return state;
  }
};

export default reducer;
