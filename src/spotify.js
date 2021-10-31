//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "7feed2ffa419451b853bd5dff8492ecb";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const loginUrl =
  '${authEndpoint}?client_id=${clientId}&redirect_Uri=${redirectUri}$scope=${scopes.join("%20")}&response_type=token&show_dialog=true';
