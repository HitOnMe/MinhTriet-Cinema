import React, {useState} from 'react';
import { createBrowserHistory } from 'history';
import Detail from '../../components/filmDetail';
import FilmTheatre from '../../components/Theatre';
import FilmDetail from '../../components/Detail';
export const history = createBrowserHistory();

const TicketRoom = () => {
  const [movie, setMovie] = useState(null);
  const [reset, resetMovie] = useState(null)
  const [film, setfilm] = useState(null)
  const handleReset = (reset) => {
    resetMovie(reset)
  }
  const handleFilm = (film) => {
    setfilm(film)
  }
  const handleRender = (data) => {
      setMovie(data);}
    return (
      <>
      
       <Detail film = {film}/>
       <div className='grid grid-cols-8 pt-6 container mx-auto px-4m-2 sm:m-4 md:m-6 lg:m-8'>
        <FilmTheatre getData = {handleRender} resetMovie = {handleReset}/>
        <FilmDetail sendData = {movie} reset = {reset} resetMovie = {handleReset} getFilm = {handleFilm}/>
         
       </div>
     </>
       );
  }
export default TicketRoom

