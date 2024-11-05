import { HashRouter, Routes, Route } from 'react-router-dom';
import TicketRoom from './Template/Cinema/Cinema';
import Admin from './Template/AdminTemplate/Admin';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import MoveSlider from './Template/Ticket/MoveSlider';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<HomeTemplate />} />
        <Route path='/cinema' element={<TicketRoom />} />
        <Route path='/ticket' element={<MoveSlider />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
