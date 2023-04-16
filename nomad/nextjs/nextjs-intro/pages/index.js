import SEO from "@/components/SEO";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";




export default function Home(){

	const [movies, setMovies] = useState();

	useEffect(()=>{
		(async ()=>{
			const { results } = await (
				await fetch(`/api/movies`)
				).json();
			setMovies(results);
			console.log(results);
		})()
	},[])
	return(
		<>
			<SEO title="Home"/>
			<div className="container">
			{!movies && (
			<>
				<BarLoader
				width={100}
				height={4}
				color="teal"
				loading={true}
				size={150}
				aria-label="Loading Spinner"/>
			</>)}
			{movies?.map((movie) => (
				<div className="movie" key={movie.id}>
					<h4>{movie.title}</h4>
					<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
				</div>
			))}
				<style jsx>{`
				.container {
				display: grid;
				grid-template-columns: 1fr 1fr;
				padding: 20px;
				gap: 20px;
				}
				.movie img {
				max-width: 100%;
				border-radius: 12px;
				transition: transform 0.2s ease-in-out;
				box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
				}
				.movie:hover img {
				transform: scale(1.05) translateY(-10px);
				}
				.movie h4 {
				font-size: 18px;
				text-align: center;
				}
			`}</style>
			</div>
		</>
	)
}