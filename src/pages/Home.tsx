import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import '../styles/home.css';

interface HomeProps {
    joinRoom: (name: string, room: string) => Promise<void>;
}

export function Home({ joinRoom }: HomeProps) {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const { setName, changePage } = useContext(UserContext);

    async function submitForm(e: FormEvent) {
        e.preventDefault();
        await joinRoom(userName, room);
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
        </main>
    )
}