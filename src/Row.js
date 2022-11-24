import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from "movie-trailer"

const BaseUrl = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl,isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl]=useState("")

    useEffect(() => { //can use async function in useeffect but wuth diff way directly cant be used
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            // console.log(request)
            return request
        }
        fetchData()

    }, [fetchUrl])
    // console.table(movies)
    const opts={
        height:"390",
        width:"100%",
        playVars:{
            autplay:1
        },
        
    }

    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('')  // if we clicked on the movie and then again clicked , close the trailer
        }else{
            movieTrailer(movie?.title|| movie?.name || movie?.original_name ||"")
            .then(url=>{
                const urlParams = new URLSearchParams(new URL(url).search) // to grab youtube video id from url 
                setTrailerUrl(urlParams.get("v"))  //get everything after v
            })
            .catch((error)=>console.log(error))        //movieTrailer is a npm module it finds a trailer for given movie
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map(movie => (
                    // everything is gonna get a row poster class but if it is a largerow then it gonna get additional class rowposterlarge
                    <img className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                    key={movie.id} 
                    onClick={()=>handleClick(movie)}
                    src={`${BaseUrl}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                    alt={movie.name} />
                    //  to make everything other than netflix originals change (horizontal) while keeping netflix same as before   
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row