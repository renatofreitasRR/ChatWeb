import { UserProvider } from './contexts/userContext'
import { Routes } from './routes/routes';

export function App() {

  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  )
}
