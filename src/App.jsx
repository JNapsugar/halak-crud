import { HalakList } from './HalakList';
import { HalSingle } from './HalSingle';
import { HalCreate } from './HalCreate';
import { HalMod } from './HalMod';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Halak
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-Hal">
                Új hal
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/halak/:halId" element={<HalSingle />} />
        <Route path="/" element={<HalakList />} />
        <Route path="/create-hal" element={<HalCreate />} />
        <Route path="/mod-hal/:id" element={<HalMod/>} />
      </Routes>
    </Router>
  );
};