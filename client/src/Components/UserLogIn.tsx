import { useContext } from "react";
import { UsernameContext } from "../Context/UsernameContext";
import { usernameContext, logInData } from "../@types/username";
import { useState } from "react";

export default function UserLogIn() {
    const user: usernameContext = useContext(UsernameContext);
    const [state, setState] = useState<"login" | "signup">("login");
    const [logInForm, logIn] = useState<logInData>({
        username: "" as string,
        password: "" as string
    });
    const handleData = () => {
        if (state === "login") {
            let proced: boolean = true;
            Object.values(logInForm).forEach(value => {
                if (value === "") {
                    proced = false;
                }
            });
            if (proced) {
                user.LogUserName(logInForm);
            }
        }
    }
    return (
        <div>
            {
                typeof user.UserName === "string" ? 
                <>
                <span>{user.UserName}</span>
                </>
                :
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ulogiraj se
                    </button>
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content text-dark">
                        <div className="modal-header">
                            <button type="button" className="btn btn-primary me-3" onClick={() => {setState("login")}}>Log In</button>
                            <button type="button" className="btn btn-primary" onClick={() => {setState("signup")}}>Sign Up</button>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                state === "login" ?
                                <>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Korisničko ime</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => {logIn({ ...logInForm, username: e.target.value })}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail2" className="form-label">Lozinka</label>
                                    <input type="password" className="form-control" id="exampleInputEmail2" onChange={(e) => {logIn({ ...logInForm, password: e.target.value })}} />
                                </div>
                                </>
                                :
                                <>bbb</>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleData}>Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            }
        </div>
    );
}