
import './App.css';
import {Router} from 'react-router'
import { createBrowserHistory } from 'history';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TicketRoom from './Template/Cinema/Cinema';
import Admin from './Template/AdminTemplate/Admin';
import HomeTemplate from './Template/HomeTemplate/HomeTemplate';
import Ticket from './Template/Ticket/ticket'
export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/MinhTriet-Cinema/admin' element={<Admin />} />
      <Route path='/MinhTriet-Cinema/' element={<HomeTemplate />} />
      <Route path='/MinhTriet-Cinema/cinema' element={<TicketRoom />} />
      <Route path="/MinhTriet-Cinema/ticket" element={<Ticket />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
