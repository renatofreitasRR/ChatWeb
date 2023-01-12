import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { LogLevel } from "@microsoft/signalr/dist/esm/ILogger";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { MessageType, UserType } from "../interfaces/Message";
import { Chat } from "../pages/Chat";
import { Home } from "../pages/Home";


export function Routes() {
    const [connection, setConnection] = useState<HubConnection>();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [sender, setSender] = useState<UserType>();
    const [clientConnection, setClientConnection] = useState('');

    async function joinRoom(userNickName: string, room: string) {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7194/chat")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("UsersInRoom", (users) => {
                setUsers(users);
            })

            connection.on("ReceivedMessage", (sender : UserType, message) => {
                if (sender.id === connection.connectionId) {
                    sender.isMyMessage = true;

                    setMessages(prevMessages => [...prevMessages, { user: sender, message: message }]);
                } else {
                    sender.isMyMessage = false;
                    setMessages(prevMessages => [...prevMessages, { user: sender, message: message }]);
                }
            });

            connection.onclose(e => {
                setConnection(undefined);
                setMessages([]);
                setUsers([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { userNickName, room, id: '' });
            setConnection(connection);
        }
        catch (e: any) {
            console.log('Error on try join room', e);
        }
    }

    async function sendMessage(message: string) {
        try {
            await connection?.invoke("SendMessage", message);
        }
        catch (e: any) {
            console.log('Error on try Send Message', e);
        }
    }

    async function closeConnection() {
        try {
            await connection?.stop();
        }
        catch (e: any) {
            console.log('Error on try Close Connection ', e);
        }
    }

    return (
        <>
            {!connection
                ?
                <Home
                    joinRoom={joinRoom}
                />
                :
                <Chat
                    messages={messages}
                    sendMessage={sendMessage}
                    closeConnection={closeConnection}
                    users={users}
                    clientConnection={clientConnection}
                    sender={sender}
                />
            }
        </>
    )

}