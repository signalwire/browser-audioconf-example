import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Loader from "react-loader-spinner";

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

  /*
  {
    "id": "1b3f7a21-3191-46df-ae15-30c558a5afbc",
    "room_id": null,
    "name": "Roomname1",
    "display_name": "Roomname1",
    "max_members": 20,
    "quality": "720p",
    "fps": 20,
    "join_from": null,
    "join_until": null,
    "remove_at": null,
    "remove_after_seconds_elapsed": null,
    "layout": "grid-responsive",
    "record_on_start": false,
    "start_time": "2021-10-01T16:07:43Z",
    "end_time": null,
    "duration": 11,
    "status": "in-progress",
    "cost_in_dollars": 0,
    "created_at": "2021-10-01T16:07:42Z",
    "updated_at": "2021-10-01T16:07:44Z",
    "room": {
      "id": "65a2072c-8582-4c3a-9e26-4c5ed521a4e1",
      "name": "Roomname1"
    },
    "members": [{
        "id": "a27d2580-4ed5-48a9-8f2f-b7ceb85178ce",
        "member_id": "a27d2580-4ed5-48a9-8f2f-b7ceb85178ce",
        "room_session_id": "1b3f7a21-3191-46df-ae15-30c558a5afbc",
        "name": "daniel",
        "join_time": "2021-10-01T16:07:43Z",
        "leave_time": null,
        "duration": 13,
        "cost_in_dollars": 0
      }
    ]
  }
  */

  useEffect(() => {
    let lock = false  // to avoid making overlapping requests
    const tmr = setInterval(async () => {
      if (lock) return
      lock = true
      const rooms = await Server.getRooms()
      setRooms(rooms)
      lock = false
      setIsLoading(false)
    }, 1000)

    return () => clearInterval(tmr)
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