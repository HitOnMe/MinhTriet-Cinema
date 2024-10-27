
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
      <Route path='/admin' element={<Admin />} />
      <Route path='/' element={<HomeTemplate />} />
      <Route path='/ticket' element={<TicketRoom />} />
      <Route path="/Template/Ticket/ticket" element={<Ticket />} />
    </Routes>
  </BrowserRouter>

  );
}

export default App;
