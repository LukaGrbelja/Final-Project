import { createContext, FC, useState } from "react";
import { usernameContext } from "../@types/username";

export const UsernameContext = createContext<usernameContext>({UserName: null, LogUserName: () => {}});

const UsernameContextProvider: FC <any> = ({children}) => {
    const [ username, setUsername ] = useState < string | null > ( null );
    const changeUsername = (userName?: string): void => {
        if (typeof userName == "string") {
            setUsername(userName);
        }
        else {
            setUsername(null)
        }
    }
    return (
        <UsernameContext.Provider value={{UserName: username, LogUserName: changeUsername}}>
            {children}
        </UsernameContext.Provider>
    );
}

export default UsernameContextProvider;