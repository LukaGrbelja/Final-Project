import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./Components/View";
import Home from "./Components/Home";
import Main from "./Components/Main";
import Error from "./Components/Error";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<View />}>
						<Route index element={<Home />} />
						<Route path="main" element={<Main />} />
						<Route path="*" element={<Error />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;