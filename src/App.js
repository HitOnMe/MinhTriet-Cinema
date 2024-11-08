import "./App.css";
import { createBrowserHistory } from "history";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TicketRoom from "./Template/Cinema/Cinema";
import HomeTemplate from "./Template/HomeTemplate/HomeTemplate";
import Ticket from "./Template/Ticket/ticket";
import Spinner from "./components/Spinner/Spinner";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import Admin from "./Template/AdminTemplate/Admin";
import TicketBookingLayout from "./Template/Ticket/ticket";

export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeTemplate content={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          {/* <Route path="/account" element={<AccountPage />}></Route> */}
          <Route
            path="/detail/:id"
            element={<HomeTemplate content={<DetailPage />} />}
          ></Route>
          <Route path="/ticket" element={<TicketRoom />} />
          <Route path="/MinhTriet-Cinema/Template/Ticket/ticket" element={<Ticket />} />
          
          {/* Các route của nhánh Minh */}
          <Route path='/admin' element={<Admin />} />
          <Route path='/cinema' element={<TicketRoom />} />
          <Route path="/ticket" element={<TicketBookingLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
