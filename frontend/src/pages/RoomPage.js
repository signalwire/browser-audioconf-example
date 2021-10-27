import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'
import Loader from "react-loader-spinner";

import Participant from '../components/Participant.js'
import Audio from "../components/Audio.js";

export default function RoomPage({ username }) {
  const { roomName } = useParams()
  const history = useHistory();

  // Whether the current user is muted
  const [muted, setMuted] = useState(false)

  // The list of participants in the room
  const [participants, setParticipants] = useState([])

  // An object that for each key (the id of a participant) has a boolean value
  // indicating whether they are currently talking.
  const [talking, setTalking] = useState({})

  // The room session object with methods to control the room
  const roomSession = useRef(null)

  // Connect the audio session
  useEffect(() => {
    const ret = Audio({
      room: roomName,
      user: username,
      onParticipantsUpdated: (participants) => {
        setParticipants(participants)
      },
      onParticipantTalking: (participantId, isTalking) => {
        setTalking(talking => {
          delete talking[participantId]
          if (isTalking) {
            talking[participantId] = true
          }
          return { ...talking }
        })
      },
      onMutedUnmuted: (muted) => {
        setMuted(muted)
      }
    })

    // As soon as it's ready, store the RoomSession object
    // inside `roomSession.current`.
    ret.then(v => roomSession.current = v)

    // Cleanup
    return () => ret.then(v => {
      try {
        v.leave();
      } catch (_) { }
      roomSession.current = null;
    })
  }, [roomName, username])

  /**
   * This function is called whenever the user clicks on the microphone button
   * to mute or unmute themselves. In the `muted` variable you find the current
   * muted state, which needs to be inverted.
   */
  function toggleMute() {
    if (!roomSession.current) return

    // The RoomSession object returned by the Audio function is
    // stored in `roomSession.current`.

    if (muted) {
      // We need to unmute
      // TODO Call roomSession method to unmute audio
    } else {
      // We need to mute
      // TODO Call roomSession method to mute audio
    }

    setMuted(!muted)
  }

  function leave() {
    if (roomSession.current && roomSession.current.leave) {
      try {
        roomSession.current.leave()
      } catch (_) { }
    }
    history.push('/rooms')
  }

  return (
    <div id="roomPage">
      <Row className="roomHeader">
        <Col>
          <a href="#" onClick={_ => leave()}><IoChevronBackCircleSharp /> Hallway</a>
        </Col>
        <Col className="text-end">
          {username}
        </Col>
      </Row>
      <div className="card">
        <div className="roomName">
          {roomName}
        </div>
        {!roomSession.current || participants.length === 0
          ? <Row>
            <Col xs={12} style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Loader type="Puff" color="#6c757d" height={50} width={50} />
              Connecting...
            </Col>
          </Row>
          : <>
            <Row>
              {participants.map((p, i) =>
                <Col xs={4} key={i}>
                  <Participant name={p.name} muted={p.audio_muted} talking={talking[p.id]} />
                </Col>
              )}
            </Row>
            <div>
              <div style={styles.leave} onClick={_ => leave()}>✌️ Leave</div>
              <div style={styles.mute} onClick={_ => toggleMute()}>{muted ? <BiMicrophoneOff /> : <BiMicrophone style={{ color: 'red' }} />}</div>
            </div>
          </>}
      </div>
    </div>
  );
}

const styles = {
  leave: {
    borderRadius: '30px',
    backgroundColor: 'rgb(222,222,222)',
    width: 'max-content',
    height: '35px',
    padding: '5px 15px',
    fontWeight: 'bold',
    color: '#ff4242',
    cursor: 'pointer',
    float: 'left',
    margin: '20px'
  },
  mute: {
    borderRadius: '30px',
    backgroundColor: 'rgb(222,222,222)',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    float: 'right',
    margin: '20px'
  }
}