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
export const history = createBrowserHistory();

function App() {
  return (
    <div>
      <Spinner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/MinhTriet-Cinema/"
            element={<HomeTemplate content={<HomePage />} />}
          />
          <Route path="/MinhTriet-Cinema/login" element={<LoginPage />}></Route>
          <Route
            path="/MinhTriet-Cinema/register"
            element={<RegisterPage />}
          ></Route>
          <Route path="/MinhTriet-Cinema/ticket" element={<TicketRoom />} />
          <Route
            path="/MinhTriet-Cinema/Template/Ticket/ticket"
            element={<Ticket />}
          />
          <Route path="*" element={<Navigate to="/MinhTriet-Cinema" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
