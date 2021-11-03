// import * as SignalWire from "@signalwire/js"
// import * as Server from './Server'

/**
 * This function connects the client to the specified room.
 *
 * @param {string} room The name of the room
 * @param {string} room The name of the user
 * @param {function} onParticipantsUpdated Function that is called whenever the
 *                   list of participants changes. Receives the list of
 *                   participants.
 * @param {function} onParticipantTalking Function that is called whenever a
 *                   member starts or stops talking. Receives as first parameter
 *                   the id of the member, and as second parameter a boolean
 *                   indicating whether they are talking.
 * @param {function} onMutedUnmuted Function that is called whenever the current
 *                   member is muted or unmuted. Receives a boolean indicating
 *                   the current state.
 *
 * @returns a RoomSession object
 */
export default async function Audio({
  room,
  user,
  onParticipantsUpdated = () => { },
  onParticipantTalking = () => { },
  onMutedUnmuted = () => { },
}) {

  // ****** TODO ******
  // Get a Virtual Room Token from our own server, specifying the
  // name of the room and the name of the user

  /*
  const token = await Server.getToken(user, room)
  */



  // ****** TODO ******
  // Create a RoomSession object for the room we're interested in

  /*
  const roomSession = new SignalWire.Video.RoomSession({
    token: token,
    audio: true,
    video: false
  })
  */



  // ****** TODO ******
  // Connect events for retrieving the updated list of participants, and call
  // `onParticipantsUpdated` to update the UI

  // remove:
  setTimeout(() => onParticipantsUpdated([{name: "someone", audio_muted: false}]))

  /*
  let members = []
  
  roomSession.on('room.joined', async (e) => {
    const currMembers = await roomSession.getMembers()
    members = [...currMembers.members];
    onParticipantsUpdated(members);
  })
  */

  /*
  roomSession.on('member.joined', (e) => {
    members = [...members, e.member]
    onParticipantsUpdated(members)
  })
  */

  /*
  roomSession.on('member.updated', (e) => {
    const memberIndex = members.findIndex(
      x => x.id === e.member.id
    )
    if (memberIndex < 0) return
    members[memberIndex] = {
      ...members[memberIndex],
      ...e.member
    }
    onParticipantsUpdated([...members])
  })
  */

  /*
  roomSession.on('member.left', (e) => {
    members = members.filter(
      (m) => m.id !== e.member.id
    );
    onParticipantsUpdated([...members]);
  })
  */



  // ****** TODO ******
  // Connect events for detecting when a participant is talking, and call
  // `onParticipantTalking` to update the UI

  /*
  roomSession.on('member.talking', (e) => {
    onParticipantTalking(e.member.id, e.member.talking)
  })
  */



  // ****** TODO ******
  // Connect events for detecting when we get muted or unmuted, and call
  // `onMutedUnmuted` to update the UI

  /*
  roomSession.on('member.updated', (e) => {
    // Have we been muted/unmuted? If so, trigger an event.
    if (e.member.id === roomSession.memberId) {
      if (e.member.updated.includes('audio_muted')) {
        onMutedUnmuted(e.member.audio_muted)
      }
    }
  })
  */



  // ****** TODO ******
  // Join the room session

  /*
  await roomSession.join()
  */


  
  // ****** TODO ******
  // Return the room session object so that it can be used from the outside

  // remove:
  return {}

  /*
  return roomSession
  */
}
