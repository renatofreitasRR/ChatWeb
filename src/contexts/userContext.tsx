import { createContext, ReactNode, useState } from "react";
import { getLocalItem, setLocalItem } from "../utils/localStorage";


interface UserContextType {
    userName: string;
    currentPage: 1 | 2;
    setName: (value: string) => void;
    changePage: () => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType);

export function UserProvider({ children }: UserProviderProps) {
    const [name, setName] = useState(() => {
        const item = getLocalItem('@chat-name');
        
        return item;
    });

    const [currentPage, setCurrentPage] = useState<1 | 2>(1);

    function addUserName(value: string) {
        setLocalItem('@chat-name', value);
        setName(value);
    }

    function changePage(){
        if(currentPage === 1)
            setCurrentPage(2);
        else
            setCurrentPage(1);
    }

    return (
        <UserContext.Provider
            value={
                {
                    userName: name,
                    currentPage: currentPage,
                    setName: addUserName,
                    changePage: changePage
                }
            }
        >
            {children}
        </UserContext.Provider>
    )
}