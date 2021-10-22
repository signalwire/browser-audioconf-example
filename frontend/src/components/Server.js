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
  // TODO
  return "..."
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
  // TODO

  // remove this:
  return [{
    name: "room_1",
    display_name: "room_1",
    members: [
      { "name": "daniel" },
      { "name": "john" },
    ]
  }]
}