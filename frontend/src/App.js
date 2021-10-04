import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Container from "react-bootstrap/Container";

import {
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage.js";
import RoomListPage from "./pages/RoomListPage.js";
import RoomPage from "./pages/RoomPage.js";

function App() {
  //let query = useQuery();
  let history = useHistory();
  const [username, setUsername] = useState("");

  return (
    <Container>
      <img src="swlogo.png" style={{height: 50, margin: 40}} alt="SignalWire" />
      <Switch>
        {/* Room list endpoint: */}
        <Route path="/rooms">
          {!username
            ? <Redirect to="/" />
            : <RoomListPage
              username={username}
            />
          }
        </Route>
        {/* Room endpoint: */}
        <Route path="/room/:roomName">
          {!username
            ? <Redirect to="/" />
            : <RoomPage
              username={username}
            />
          }
        </Route>
        {/* Login endpoint: */}
        <Route path="/">
          <LoginPage
            onJoin={(name) => {
              setUsername(name)
              history.push("/rooms");
            }}
          />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
