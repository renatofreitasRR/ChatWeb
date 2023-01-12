import '../styles/message.css';

interface MessageProps {
    side: 'right' | 'left',
    userNickName: string;
    message: string;
}

export function Message({ side, userNickName, message }: MessageProps) {
    return (
        <div className={`message-container ${side}`}>
            <div className='message-user-container'>
                <div className='message-user-icon'></div>
                <strong className='message-user-name'>
                    {userNickName}
                </strong>
            </div>
            <div className='message-box'>
                <p className='message-text'>
                    {message}
                </p>
            </div>
        </div>
    )
}