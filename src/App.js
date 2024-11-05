
import './App.css';
import { createBrowserHistory } from 'history';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TicketRoom from './Template/Cinema/Cinema';
import Admin from './Template/AdminTemplate/Admin';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import MoveSlider from './Template/Ticket/MoveSlider'
export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/admin' element={<Admin />} />
      <Route path='/' element={<HomeTemplate />} />
      <Route path='/cinema' element={<TicketRoom />} />
      <Route path="/ticket" element={<MoveSlider />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
