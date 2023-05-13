import { useContext, useState } from "react";
import axios from "axios";
import { UsernameContext } from "../Context/UsernameContext";
import { usernameContext, logInData, signUpData, submitProcess } from "../@types/username";

export default function UserLogIn(): JSX.Element {
    const user: usernameContext = useContext(UsernameContext);
    const [state, setState] = useState<"login" | "signup">("login");
    const [submit, setSubmit] = useState<submitProcess>({processStatus: "await", response: ""});
    const [logInForm, logIn] = useState<logInData>({
        username: "" as string,
        password: "" as string
    });
    const [signUpForm, signUp] = useState<signUpData>({
        username: "" as string,
        password: "" as string,
        confirmation: "" as string,
        email: "" as string
    });
    const handleData = (): void => {
        let proceed: boolean = true;
        setSubmit({processStatus: "await", response: ""});
        if (state === "login") {
            Object.values(logInForm).forEach(value => {
                if (value === "") {
                    proceed = false;
                }
            });
            if (proceed) {
                axios.get(`http://localhost:3001/checkUser/${logInForm.username}/${logInForm.password}`)
                .then(response => {
                    if (response.data) {
                        setSubmit({processStatus: true, response: `Dobrodosli, ${logInForm.username}`});
                        user.LogUserName(logInForm);
                    }
                    else {
                        setSubmit({processStatus: false, response: "Krivo korisnicko ime ili lozinka"});
                    }
                });
            }
            else {
                setSubmit({processStatus: false, response: "Ispunite sva polja"});
            }
        }
        else {
            Object.values(signUpForm).forEach(value => {
                if (value === "") {
                    proceed = false;
                }
            });
            if (proceed) {
                if (signUpForm.password === signUpForm.confirmation) {
                    if (signUpForm.password.length >= 8) {
                        if (signUpForm.email.indexOf("@") !== -1) {
                            axios.post("http://localhost:3001/createUser", signUpForm)
                            .then(response => {
                                if (response.data) {
                                    setSubmit({processStatus: true, response: "Dobrodosli" + signUpForm.username});
                                    user.LogUserName(signUpForm);
                                }
                                else {
                                    setSubmit({processStatus: false, response: "Korisnicko ime zauzeto"});
                                }
                            });
                        }
                        else {
                            setSubmit({processStatus: false, response: "Upisite postojecu email adresu"});
                        }
                    }
                    else {
                        setSubmit({processStatus: false, response: "Lozinka prekratka, minimalno 8 znakova"});
                    }
                }
                else {
                    setSubmit({processStatus: false, response: "Lozinke se ne podudaraju"});
                }
            }
            else {
                setSubmit({processStatus: false, response: "Ispunite sva polja"});
            }
        }
    }
    return (
        <div>
            {
                typeof user.UserName === "string" ? 
                <div className="dropdown">
                    <button type="button" className="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.UserName}
                    </button>
                    <ul className="dropdown-menu">
                        <li className="dropdown-item">
                            <img src=""alt="Nema slike" />
                        </li>
                        <li className="dropdown-item border border-info" onClick={() => {user.LogUserName(null)}}>Izlogiraj se</li>
                    </ul>
                </div>
                :
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ulogiraj se
                    </button>
                    <div className="modal fade" id="exampleModal" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <label htmlFor="usernameInput1" className="form-label">Korisničko ime</label>
                                    <input type="text" className="form-control" id="usernameInput1" onChange={(e) => {logIn({ ...logInForm, username: e.target.value })}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordInput1" className="form-label">Lozinka</label>
                                    <input type="password" className="form-control" id="passwordInput1" onChange={(e) => {logIn({ ...logInForm, password: e.target.value })}} />
                                </div>
                                </>
                                :
                                <>
                                <div className="mb-3">
                                    <label htmlFor="usernameInput2" className="form-label">Korisničko ime</label>
                                    <input type="text" className="form-control" id="usernameInput2" onChange={(e) => {signUp({ ...signUpForm, username: e.target.value })}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordInput2" className="form-label">Lozinka</label>
                                    <input type="password" className="form-control" id="passwordInput2" onChange={(e) => {signUp({ ...signUpForm, password: e.target.value })}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordInput3" className="form-label">Potvrdi lozinku</label>
                                    <input type="password" className="form-control" id="passwordInput3" onChange={(e) => {signUp({ ...signUpForm, confirmation: e.target.value })}} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input required type="email" className="form-control" id="emailInput3" onChange={(e) => {signUp({ ...signUpForm, email: e.target.value })}} />
                                </div>
                                </>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={handleData}>Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            }
            <div className="modal fade" id="exampleModalToggle2" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">Modal 2</h1>
                    </div>
                    <div className="modal-body">
                        {
                            submit.processStatus === "await" ?
                            <p>Animacija</p> : false
                        }
                        {
                            submit.processStatus === true ?
                            <p>istina</p> : false
                        }
                        {
                            submit.processStatus === false ?
                            submit.response : false
                        }
                    </div>
                        {
                            submit.processStatus === true ?
                            <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-dismiss="modal">Zatvori</button>
                            </div> : false
                        }
                        {
                            submit.processStatus === false ?
                            <div className="modal-footer">
                            <button className="btn btn-primary" data-bs-target="#exampleModal" data-bs-toggle="modal">Back to first</button>
                            </div> : false
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}