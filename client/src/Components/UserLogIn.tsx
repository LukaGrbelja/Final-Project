import { useContext } from "react";
import { UsernameContext } from "../Context/UsernameContext";
import { usernameContext } from "../@types/username";

export default function UserLogIn() {
    const user: usernameContext = useContext(UsernameContext);
    console.log(user);
    return (
        <div>
            {
                typeof user.UserName == "string" ? 
                "asd" : <button>aaa</button>
            }
        </div>
    );
}