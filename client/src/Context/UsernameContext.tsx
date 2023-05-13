import { createContext, FC, useState } from "react";
import { usernameContext, logInData, signUpData } from "../@types/username";

export const UsernameContext = createContext<usernameContext>({UserName: null, LogUserName: () => {}});

const UsernameContextProvider: FC <any> = ({children}) => {
    const [ username, setUsername ] = useState < string | null > ( null );
    const changeUsername = (data: logInData | signUpData | null): void => {
        if (data === null) {
            setUsername(null);
        }
        else {
            setUsername(data.username);
        }
    }
    return (
        <UsernameContext.Provider value={{UserName: username, LogUserName: changeUsername}}>
            {children}
        </UsernameContext.Provider>
    );
}

export default UsernameContextProvider;