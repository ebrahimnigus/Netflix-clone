import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({title, category}) => {
  const [apiData, setApiData]= useState([]);
  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjBhOTE1MjQwMjA2YjFhYWZkMzIyMDg3YzlhZmZjNSIsIm5iZiI6MTczNDgwMzE5Ny41NjQ5OTk4LCJzdWIiOiI2NzY2ZmVmZDhmMTBjMjc0NmI5MTAyYmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.YPXWgyKVLjIhIO9gb37HkaLcO9vthTdCEBd4TKoRWuI'
    }
  };
  
  
const handlewheel =(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft +=event.deltaY
}
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category? category:'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel', handlewheel);
},[])
  return (
    <div className="titleCards">
    <h2>{title? title: "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`}className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=''/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards