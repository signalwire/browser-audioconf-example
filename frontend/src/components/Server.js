import axios from "axios"

const url = 'https://6i94n.sse.codesandbox.io'
// const url = 'https://my-app-13.herokuapp.com'

export async function getToken(user, room) {
  const response = await axios.post(`${url}/get_token`, {
    user_name: user,
    room_name: room,
    mod: false,
  });
  return response.data.token;
}

export async function getRooms() {
  const response = await axios.get(`${url}/roomsAndParticipants?timestamp=${new Date().getTime()}`);
  const rooms = response.data;
  return rooms
}