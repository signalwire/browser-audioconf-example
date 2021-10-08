import * as SignalWire from "@signalwire/js"
import * as Server from './Server'

const audioRootElement = document.createElement('div')

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

  let members = []

  // Get a token from our own server
  const token = await Server.getToken(user, room)

  const roomSession = new SignalWire.Video.RoomSession({
    token: token,
    audio: true,
    video: false,
    rootElement: audioRootElement
  })

  console.log("Joining...")

  // To experiment from the browser's development console
  window.room = roomSession

  roomSession.on('room.joined', async (e) => {
    console.log('Event: room.joined')
    const currMembers = await roomSession.getMembers()
    members = [...currMembers.members];
    onParticipantsUpdated(members);
  })

  roomSession.on('member.joined', (e) => {
    console.log('Event: member.joined')
    members = [...members, e.member]
    onParticipantsUpdated(members)
  })

  roomSession.on('member.updated', (e) => {
    console.log('Event: member.updated')
    const memberIndex = members.findIndex(
      x => x.id === e.member.id
    )
    if (memberIndex < 0) return
    members[memberIndex] = {
      ...members[memberIndex],
      ...e.member
    }
    onParticipantsUpdated([...members])

    // Have we been muted/unmuted? If so, trigger an event.
    if (e.member.id === roomSession.memberId) {
      if (e.member.updated.includes('audio_muted')) {
        onMutedUnmuted(e.member.audio_muted)
      }
    }
  })

  roomSession.on('member.left', (e) => {
    console.log('Event: member.left')
    members = members.filter(
      (m) => m.id !== e.member.id
    );
    onParticipantsUpdated([...members]);
  })

  roomSession.on('member.talking', (e) => {
    console.log('Event: member.talking')
    onParticipantTalking(e.member.id, e.member.talking)
  })

  await roomSession.join()
  console.log("Joined!")

  return roomSession
}
