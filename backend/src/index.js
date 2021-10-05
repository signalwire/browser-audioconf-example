require("dotenv").config();
const auth = {
  username: process.env.PROJECT_ID, // Project-ID
  password: process.env.API_KEY // API token
};
const apiurl = `https://${process.env.SPACE}/api/video`;
const moderatorPermissions = [
  "room.list_available_layouts",
  "room.recording",
  "room.set_layout",
  "room.member.audio_mute",
  "room.member.audio_unmute",
  "room.member.deaf",
  "room.member.undeaf",
  "room.member.remove",
  "room.member.set_input_sensitivity",
  "room.member.set_input_volume",
  "room.member.set_output_volume",
  "room.member.video_mute",
  "room.member.video_unmute"
];
const normalPermissions = [
  "room.self.audio_mute",
  "room.self.audio_unmute",
  "room.self.video_mute",
  "room.self.video_unmute",
  "room.self.deaf",
  "room.self.undeaf",
  "room.self.set_input_volume",
  "room.self.set_output_volume",
  "room.self.set_input_sensitivity",
  "room.hide_video_muted",
  "room.show_video_muted"
];

// Basic express boilerplate
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// End basic express boilerplate

app.get("/", (req, res) => {
  if (
    auth.username === undefined ||
    auth.password === undefined ||
    auth.username === "" ||
    auth.password === ""
  )
    return res.send(
      "Hello. My environment variables are not set.<br/> Please set them from your signalwire space."
    );
  else return res.send("Hello. I'm alive");
});

// Endpoint to request token for video call
app.post("/get_token", async (req, res) => {
  let { user_name, room_name, mod } = req.body;
  console.log("Name: ", user_name, "Room: ", room_name);
  if (mod) console.log("As Moderator");
  try {
    let token = await axios.post(
      apiurl + "/room_tokens",
      {
        user_name,
        room_name: room_name,
        permissions: mod
          ? [...normalPermissions, ...moderatorPermissions]
          : normalPermissions
      },
      { auth }
    );

    token = token.data?.token;
    console.log(
      "Token:",
      token.length < 7 ? token : token.substring(0, 6) + "..."
    );
    console.log(
      "Permissions: ",
      mod ? [...normalPermissions, ...moderatorPermissions] : normalPermissions
    );

    return res.json({ token });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

// Endpoint to obtain the file of a given recording
app.get("/get_recording/:id", async (req, res) => {
  try {
    const rec = await axios.get(`${apiurl}/room_recordings/${req.params.id}`, {
      auth
    });
    res.json(rec.data);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});

app.get("/rooms", async (req, res) => {
  const rooms = await axios.get(`${apiurl}/rooms`, { auth });
  res.json(rooms.data.data);
});

app.get("/roomsAndParticipants", async (req, res) => {
  let rooms = await axios.get(`${apiurl}/room_sessions`, { auth });
  rooms = rooms.data.data; // In real applications, check the "next" field.

  rooms = rooms.filter((r) => r.status === "in-progress");
  rooms = await Promise.all(
    rooms.map(async (r) => ({
      ...r,
      members: (
        await axios.get(`${apiurl}/room_sessions/${r.id}/members`, { auth })
      ).data.data
    }))
  );

  res.json(rooms);
});

async function start(port) {
  app.listen(port, () => {
    console.log("Server listening at port", port);
  });
}

// Start the server
const PORT = process.env.PORT || 8080;
start(PORT);

