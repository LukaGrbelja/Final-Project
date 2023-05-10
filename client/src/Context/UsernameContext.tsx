import { createContext, FC, useState } from "react";
import { usernameContext, logInData } from "../@types/username";

export const UsernameContext = createContext<usernameContext>({UserName: null, LogUserName: () => {}});

const UsernameContextProvider: FC <any> = ({children}) => {
    const [ username, setUsername ] = useState < string | null > ( null );
    const changeUsername = (data: logInData | any): void => {
        Object.keys(data).length === 2 ?
        setUsername(data.username)
        :
        console.log("signup");
    }
    return (
        <UsernameContext.Provider value={{UserName: username, LogUserName: changeUsername}}>
            {children}
        </UsernameContext.Provider>
    );
}

export default UsernameContextProvider;