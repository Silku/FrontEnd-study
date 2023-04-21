import SEO from "@/components/SEO";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";




export default function Home({ results }){
	const router = useRouter();
	const handleOnClick = (id, title) =>{
		//useRouter로 navigate하기
		router.push({
			pathname : `/movies/${id}`,
			query : {
				id,
				title
			}
		}, `/movies/${id}`)
	}
	 
	return(
		<>
			<SEO title="Home"/>
			<div className="container">
			{!results && (
			<>
				<BarLoader
				width={100}
				height={4}
				color="teal"
				loading={true}
				size={150}
				aria-label="Loading Spinner"/>
			</>)}
			{results?.map((movie) => (
				<div onClick={()=>handleOnClick(movie.id, movie.title)}className="movie" key={movie.id}>
					<h4>
						<Link 
						key={movie.id}
						href={`/movies/${movie.id}`} 
						legacyBehavior>
						<a>{movie.title}</a>
						</Link>
					</h4>
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
				.movie{
					cursor:pointer;
					
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

export async function getServerSideProps() {
	const { results } = await (
		await fetch(`http://localhost:3000/api/movies`)
	).json();
	
	return {
		props: {
			results,
		},
	};
}