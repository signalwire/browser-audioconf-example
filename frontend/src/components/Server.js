import axios from "axios"

// URL of our own server
export const url = 'http://127.0.0.1:8080'

/**
 * This function obtains a Video Room Token from our own server.
 *
 * @param {string} user The name of the user
 * @param {string} room The name of the room
 *
 * @returns {string} the Video Room Token
 */
export async function getToken(user, room) {
  // ****** TODO ******
  // Get the Room Token from `${url}/get_token`
  
  return "..."

  /*
  const response = await axios.post(`${url}/get_token`, {
    user_name: user,
    room_name: room,
  });
  return response.data.token;
  */
}
