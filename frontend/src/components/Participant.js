import { FaUser } from 'react-icons/fa'
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi'

export default function Participant({ name, muted, talking }) {

    const talkingStyle = talking ? styles.talking : {}
    return (
        <div style={styles.participant}>
            <div style={{...styles.wrapper, ...talkingStyle}}>
                <div style={styles.participantImage} >
                    <FaUser size="32px" />
                    <div style={styles.mic}>
                        {muted ? <BiMicrophoneOff /> : <BiMicrophone />}
                    </div>
                </div>
            </div>
            <div>{name}</div>
        </div>
    );
}

const styles = {
    wrapper: {
        borderRadius: '28px',
        padding: '3px',
        border: '3px solid transparent'
    },

    talking: {
        border: '3px solid rgb(222,222,222)'
    },

    participantImage: {
        background: '#6aa5ff',
        width: '64px',
        height: '64px',
        borderRadius: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

    participant: {
        margin: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },

    mic: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: '50%',
        backgroundColor: 'white',
        border: '1px solid #E2E2E2',
        height: 25,
        width: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
