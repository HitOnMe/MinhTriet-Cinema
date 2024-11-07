import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js'; 
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import '../assets/scss/filmDetail.scss';
import styled from 'styled-components';

const Hero = styled.div`
  height: 400px;
  margin: 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(${props => props.backgroundImage}) no-repeat;
    background-size: cover;
    z-index: -1;
    transform: skewY(-2.2deg);
    transform-origin: 0 0;
    backface-visibility: hidden;
  }
`;

const Countdown = () => {
  return (
    <div className="countdown-container">
      <CountdownCircleTimer
        isPlaying
        duration={10} 
        colors={[['black', 0.33], ['#F7B801', 0.33], ['#A30000', 0.33]]}
        onComplete={() => [true, 1000]} 
      >
        {({ remainingTime }) => (
          <div style={{ fontSize: '48px', color: '#fff' }}>{remainingTime}</div>
        )}
      </CountdownCircleTimer>
    </div>
  );
};


const Detail = React.memo(({ film }) => {
  const typedRef = useRef(null); 
 
  useEffect(() => {
    if (film && film.moTa) {
      const options = {
        strings: [film.moTa || 'Quý khách vui lòng xem trên youtube.com để biết thêm chi tiết. Xin cám ơn!'],
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
      };

      const typed = new Typed(typedRef.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, [film]);

  if (!film) {
    return (
      <div className='movie-card flex justify-content-center align-items-center'>
        <Countdown />
      </div>
    );
  }

  return (
    <div>
      <div className="movie-card">
        <div className="container grid grid-cols-2">

          <Hero backgroundImage={film.hinhAnh} className='flex' >
           
          </Hero>
          <div className="description">
          <div className="details">
              <div className="title1">{film.tenPhim} <span>{film.rated}</span></div>
              <div className="title2">{film.biDanh}</div>
              <fieldset class="rating">
    <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" checked /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
  </fieldset>
              <span className="likes">{film.likes} likes</span>
            </div> 
            <div className="column2">
              <p ref={typedRef} />
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Detail;
