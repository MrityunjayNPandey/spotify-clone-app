export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
  //remove initial token after finished debugging...
  token: 'BQBG1i1ip4no8J18k0NErBiDljIbqyADl03xVP0lthQvjZz-eMgX9M2e1SMyaXfQAXdhkJ-nb5qN-GIF0i15Y0QF9llPqDTctHemrsujmQ9UTciaq649cPw08gwgv_9E85p64ND0FVR9pva_ncvjxp2nwG1d-ZAN2rj0rDANtQVc26Uf',
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

    default:
      return state;
  }
};

export default reducer;
