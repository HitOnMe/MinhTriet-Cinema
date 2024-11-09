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

import TicketBookingLayout from "./Template/Ticket/ticket";

export const history = createBrowserHistory();

function App() {
  return (

    <div>
      <Spinner />
      <BrowserRouter basename="/MinhTriet-Cinema">
        <Routes>
          <Route path="/" element={<HomeTemplate content={<HomePage />} />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          {/* Account gặp vấn đề về render khi đổ dữ liệu */}
          {/* <Route path="/account" element={<AccountPage />}></Route> */}
          <Route
            path="/detail/:id"
            element={<HomeTemplate content={<DetailPage />} />}
          ></Route>
          <Route path='/cinema' element={<TicketRoom />} />
          <Route path="/ticket" element={<TicketBookingLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
