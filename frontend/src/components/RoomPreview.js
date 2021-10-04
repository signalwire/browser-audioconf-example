import { FaUser, FaUserFriends } from 'react-icons/fa'

export default function RoomPreview({ room, onClick = () => {} }) {

  const membersSubset = room.members.slice(0,3);

  return (
    <div style={styles.roomPreview} onClick={onClick}>
      <div style={styles.roomTitle}>{room.display_name}</div>
      <div>
        {membersSubset.map((p, i) => <div key={i}>
          <FaUser /> {p.name}
        </div>)}
        {membersSubset.length < room.members.length
        ? <div><FaUserFriends /> {room.members.length - membersSubset.length} more...</div>
        : <></>}
      </div>
    </div>
  );
}

const styles = {
  roomPreview: {
    background: 'white',
    border: '1px solid #E2E2E2',
    borderRadius: '20px',
    margin: '10px 0',
    boxShadow: '0px 1px 2px 0px #E2E2E2',
    padding: '20px',
    cursor: 'pointer',
  },
  
  roomTitle: {
    fontWeight: 600,
    letterSpacing: '1px',
    marginBottom: '.8em',
  }
}