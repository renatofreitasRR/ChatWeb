import { FormEvent, useContext, useState } from 'react';
import '../styles/home.css';

interface HomeProps {
    joinRoom: (name: string, room: string) => Promise<void>;
    groups: string[];
}

export function Home({ joinRoom, groups }: HomeProps) {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        await joinRoom(userName, room);
    }

    async function handleSelectGroup(roomSelected: string) {
        await joinRoom(userName, roomSelected);
    }

    return (
        <main className="background">
            <section>
                <h1>Bem vindo ao Chat!</h1>
                <form onSubmit={submitForm}>
                    <input
                        type="text"
                        placeholder="Digite aqui o nome do seu usuário"
                        onChange={(e) => setUserName(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Digite aqui o nome da sala"
                        onChange={(e) => setRoom(e.currentTarget.value)}
                    />
                    <button
                        type="submit"
                    >Entrar</button>
                </form>
            </section>
            <section className='groups'>
                <h2>Grupos disponíveis</h2>
                <div className='groups-list'>
                    {groups?.map((group, index) => (
                        <div
                            key={index}
                            className='group-item'
                            onClick={() => handleSelectGroup(group)}
                        >
                            <h2>{group}</h2>
                        </div>

                    ))}
                </div>
            </section>
        </main>
    )
}