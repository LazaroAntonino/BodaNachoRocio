import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router";

export const Home = () => {
	useEffect(() => {
		console.log("Home component mounted");
	}, []);


	return (
		<div className="home-container">
			Hola esto funciona
			<p>esto funciona?</p>
		</div>
	);
};
