import React, { useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Import CSS cho Splide
import TicketBookingLayout from'./ticket';
const MovieSlider = () => {
    useEffect(() => {
      const splide = new Splide('.splide', {
        type: 'loop',
        perPage: 1,
        autoplay: false,
        pagination: false,
        arrows: true,
      });
  
      splide.mount();
  
      return () => {
        splide.destroy(); // Hủy khi component bị unmount
      };
    }, []);
  
    return (
      <div className="splide">
        <div className="splide__track">
          <ul className="splide__list">
            <li className="splide__slide">
              <TicketBookingLayout/>
            </li>
            <li className="splide__slide">Slide 2: Hình ảnh phim 2</li>
            <li className="splide__slide">Slide 3: Hình ảnh phim 3</li>
            {/* Thay thế các slide bằng hình ảnh thực tế */}
          </ul>
        </div>
      </div>
    );
  };
  
export default MovieSlider;
