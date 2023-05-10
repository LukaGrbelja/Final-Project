import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./Components/View";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Content from "./Components/Content";
import Error from "./Components/Error";

function App() {
	return (
		<div className="container-fluid" style={{backgroundColor: "black", height: "100%", color: "white"}}>
			<Router>
				<Routes>
					<Route path="/" element={<View />}>
						<Route index element={<Home />} />
						<Route path="main" element={<Main />} />
						<Route path="content/:type/:id" element={<Content />}/>
						<Route path="*" element={<Error />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;