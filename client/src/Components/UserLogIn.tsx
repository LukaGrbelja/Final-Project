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
                "asd"
                :
                <>
                <button className="btn btn-outline-primary" type="button" data-bs-target="#exampleModal">Ulogiraj se</button>
                <div className="modal fade" id="exampleModal" tabIndex={1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div></>
            }
        </div>
    );
}