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
          {/* Account gặp vấn đề về render khi đổ dữ liệu */}
          {/* <Route path="/account" element={<AccountPage />}></Route> */}
          <Route
            path="/detail/:id"
            element={<HomeTemplate content={<DetailPage />} />}
          ></Route>
          <Route path="/ticket" element={<TicketRoom />} />
          <Route
            path="/MinhTriet-Cinema/Template/Ticket/ticket"
            element={<Ticket />}
          />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
