import React, {useState} from 'react';
import { createBrowserHistory } from 'history';
import FilmDetail from '../../components/Detail';
import FilmTheatre from '../../components/Theatre';
import MovieList from '../../components/MovieList';
import Calendar from '../../components/Calendar'
export const history = createBrowserHistory();

const TicketRoom = () => {
  const [movie, setMovie] = useState(null);
  const [reset, resetMovie] = useState(null)
  const handleReset = (reset) => {
    resetMovie(reset)
  }
  const handleRender = (data) => {
      setMovie(data);}
    return (
      <div>
      
       
       <div className='grid grid-cols-8 pt-6 container mx-auto px-4m-2 sm:m-4 md:m-6 lg:m-8'>
        <FilmTheatre getData = {handleRender} resetMovie = {handleReset}/>
        <FilmDetail sendData = {movie} reset = {reset} resetMovie = {handleReset}/>
         
       </div>
     </div>
       );
  }
export default TicketRoom

