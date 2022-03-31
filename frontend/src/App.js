import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Chatpage from "./Pages/Chatpage";
import HomePage from "./Pages/HomePage";

function App() {
	return (
		<div className="App">
			<Route exact path="/" component={HomePage} />
			<Route path="/chats" component={Chatpage} />
		</div>
	);
}

export default App;
