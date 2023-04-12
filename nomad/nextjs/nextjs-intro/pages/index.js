import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home(){
	const [counter, setCounter]= useState(0);

	return(
		<>
			<Navbar/>
			<h1>Hello</h1>
			<div>카운터 : {counter}</div>
			<button type="button" onClick={()=>{setCounter((prev)=>prev+1)}}>+</button>
		</>
	)
}