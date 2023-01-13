import { createRef, FormEvent, useContext, useEffect, useState } from "react"
import { Message } from "../components/Message";
import { MessageType, UserType } from "../interfaces/Message";
import { IoMdSend, IoMdClose } from 'react-icons/io';

import '../styles/chat.css';

interface ChatProps {
    messages: MessageType[];
    users: string[];
    clientConnection: string;
    sender?: UserType;
    sendMessage: (message: string) => Promise<void>;
    closeConnection: () => Promise<void>;
}

export function Chat({ messages, users, clientConnection, sender, sendMessage, closeConnection }: ChatProps) {
    const [message, setMessage] = useState('');
    const messageRef = createRef<HTMLElement>();

    async function handleSendMessage(e: FormEvent) {
        e.preventDefault();

        await sendMessage(message);
        setMessage('');
    }

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;

            messageRef.current.scrollTo({
                left: 0, top: scrollHeight - clientHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div className='chat-background'>
            <div className='chat-with-users'>
                <aside>
                    <h3>Usuários conectados</h3>
                    <div className='users-list'>
                        {users.map((user, index) => (
                            <div key={index} className='user-connected'>
                                <strong>{user}</strong>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className='content'>
                    <header>
                        <IoMdClose
                            className='close-icon'
                            size={20}
                            onClick={closeConnection}
                        />
                        <div className='header-user right'>
                            <div className='user-icon'></div>

                        </div>
                    </header>
                    <main ref={messageRef}>
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                side={message.user.isMyMessage ? 'right' : 'left'}
                                userNickName={message.user.isMyMessage ? message.user.userNickName + '(Eu)' : message.user.userNickName}
                                message={message.message}
                            />
                        ))}
                    </main>
                    <footer>
                        <form onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder='Digite a sua mensagem'
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            />
                            <button type="submit">
                                <IoMdSend size={25} />
                            </button>
                        </form>
                    </footer>
                </div>
            </div>
        </div>
    )
}