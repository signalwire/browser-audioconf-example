<<<<<<< HEAD
=======
import * as SignalWire from "@signalwire/js"
import * as Server from './Server'

const audioRootElement = document.createElement('div')

>>>>>>> master
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

  // TODO: Get a Virtual Room Token from our own server, specifying the name of
  //       the room and the name of the urse

  // TODO: Create a RoomSession object for the room we're interested in

  // TODO: Connect events for retrieving the updated list of participants, and
  //       call `onParticipantsUpdated` to update the UI

  // remove:
  setTimeout(() => onParticipantsUpdated([{name: "someone", audio_muted: false}]))

  // TODO: Connect events for detecting when a participant is talking, and call
  //       `onParticipantTalking` to update the UI

  // TODO: Connect events for detecting when we get muted or unmuted, and call
  //       `onMutedUnmuted` to update the UI

  // TODO: Join the room session

  // TODO: Get the current list of participants, and call
  //       `onParticipantsUpdated` to update the UI

  // TODO: Return the room session object so that it can be used from the
  //       outside

  // remove:
  return {}
}
