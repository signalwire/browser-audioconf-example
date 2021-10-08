import axios from "axios"

// URL of our own server
const url = 'https://6i94n.sse.codesandbox.io'

/**
 * This function obtains a Video Room Token from our own server.
 *
 * @param {string} user The name of the user
 * @param {string} room The name of the room
 *
 * @returns {string} the Video Room Token
 */
export async function getToken(user, room) {
  const response = await axios.post(`${url}/get_token`, {
    user_name: user,
    room_name: room,
    mod: false,
  });
  return response.data.token;
}

/**
 * This function obtains a list of existing rooms from our own server.
 * It will be called by the UI to get the list of available rooms.
 * 
 * @returns an array of rooms, each one being an object such as
 * 
 *     {
 *       "id": "1b3f7a21-3191-1175-ae15-30c558a5afbc",
 *       "name": "Roomname1",
 *       "display_name": "Roomname1",
 *       "members": [
 *         { "name": "daniel" },
 *         { "name": "john" },
 *       ]
 *     }
 */
export async function getRooms() {
  const response = await axios.get(`${url}/roomsAndParticipants?timestamp=${new Date().getTime()}`);
  const rooms = response.data;
  return rooms
}