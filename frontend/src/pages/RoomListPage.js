import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "react-loader-spinner";
import socketIOClient from "socket.io-client";

import RoomPreview from '../components/RoomPreview.js'
import * as Server from '../components/Server'

export default function RoomListPage({ username }) {
  const history = useHistory();
  const [rooms, setRooms] = useState([])

  const [isLoading, setIsLoading] = useState(true);
  const [newRoomName, setNewRoomName] = useState("")

  const [showDialog, setShowDialog] = useState(false);

  const handleClose = () => setShowDialog(false);
  const handleShow = () => setShowDialog(true);
  const handleStartNew = () => history.push('/room/' + newRoomName.replace(/[^a-zA-Z0-9]/g, '_'));

  useEffect(() => {
    /**
     * We use socket.io to listen to the rooms_updated events that we emit
     * server-side. The value that we get is an array, with each entry being an
     * object such as
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
    const socket = socketIOClient(Server.url);
    socket.on("rooms_updated", rooms => {
      setRooms(rooms)
      setIsLoading(false)
    });
  }, [])

  return (
    <div>
      {isLoading ? <div style={styles.message}><Loader type="ThreeDots" color="#6c757d" height={50} width={50} />Loading...</div>
        : <>
          {rooms.length === 0
            ? <div style={styles.message}>
              There are no rooms yet!
            </div>
            : <></>
          }
          {rooms.map((room, i) =>
            <Row className="justify-content-md-center" key={i}>
              <Col lg={4}>
                <RoomPreview room={room} onClick={e => history.push('/room/' + room.name)} />
              </Col>
            </Row>
          )}
        </>}
      <div style={styles.start} onClick={handleShow}>+ Start a room</div>

      <Modal show={showDialog} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Start a room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Room name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Room name"
              onChange={(e) => setNewRoomName(e.target.value)}
              value={newRoomName}
              pattern="[^' ']+"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStartNew}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

const styles = {
  start: {
    borderRadius: '30px',
    backgroundColor: '#08a75d',
    width: 'max-content',
    height: '35px',
    padding: '5px 15px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    margin: '20px auto 20px auto',
  },
  message: {
    textAlign: 'center',
    margin: 100,
    fontSize: '1.3em'
  }
}