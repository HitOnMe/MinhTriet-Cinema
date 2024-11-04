import React, {useState} from 'react';
import '../assets/scss/calendar.scss';
import moment from 'moment';

const DateSelector = ({date, select, reset}) => {
  let myDate = [];
  date.map(day => {
   
    const myDay = new Date(day);
          
    const formattedDate = moment(myDay).format('DD/MM/YY');
    if (!myDate.includes(formattedDate)){
      myDate = [...myDate, formattedDate]
    }
  });

 
  myDate.sort((a, b) => {
 
  const [dayA, monthA, yearA] = a.split("/").map(Number);
  const [dayB, monthB, yearB] = b.split("/").map(Number);

 
  const dateA = new Date(yearA, monthA - 1, dayA);
  const dateB = new Date(yearB, monthB - 1, dayB);

  return dateA - dateB;
});

  const scrollContainer = React.useRef(null);

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 150, behavior: 'smooth' });
  };
  
  return (
    <div>
     <div className="date-selector">
      <button className="nav-btn prev" onClick={scrollLeft}>‹</button>
      <div className="date-items" ref={scrollContainer}>
        {myDate.map((day, index) => (
  <div 
    className="date-item" 
    key={index} 
    onClick={() => select(day)} // Gọi hàm select với ngày đã định dạng
  >
    {day}
  </div>
))}
      </div>
      <button className="nav-btn next" onClick={scrollRight}>›</button>
    </div> 
  
    <div class="bg-yellow-500 p-4 rounded-lg flex items-center space-x-2">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="black" stroke-width="2" />
    <text x="12" y="16" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="black" text-anchor="middle">
      i
    </text>
  </svg>
  <span class="text-white font-semibold">Vui lòng chọn ngày và nhấn vào giờ chiếu để tiến hành đặt vé</span>
</div>

    </div>
  );
};

export default DateSelector;