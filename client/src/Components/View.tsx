import { Outlet, Link } from "react-router-dom";

export default function View() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Naslovna</Link>
                    </li>
                    <li>
                        <Link to="/main">Filmovi i serije</Link>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </>
    )
};