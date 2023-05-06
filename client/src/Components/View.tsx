import { Outlet, Link } from "react-router-dom";
import UsernameContextProvider from "../Context/UsernameContext";
import UserLogIn from "./UserLogIn";

export default function View() {
    return (
        <UsernameContextProvider>
        <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-md">
                <div className="container-fluid">
                    <Link to="/">
                        <div className="navbar-brand">
                            Naslovna
                        </div>
                    </Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item mt-2 p-2">
                                <Link to="/main">Filmovi i serije</Link>
                            </li>
                            <li className="nav-item p-2">
                                <UserLogIn></UserLogIn>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
            <div className="container">
                <Outlet />
            </div>
        </>
        </UsernameContextProvider>
    )
};