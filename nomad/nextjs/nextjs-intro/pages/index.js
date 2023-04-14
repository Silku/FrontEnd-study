import SEO from "@/components/SEO";
import Head from "next/head";
import { useState } from "react";



export default function Home(){
	const [counter, setCounter]= useState(0);

	return(
		<>
			<SEO title="Home"/>
			<h1>Hello</h1>
			<div>카운터 : {counter}</div>
			<button type="button" onClick={()=>{setCounter((prev)=>prev+1)}}>+</button>
		</>
	)
}