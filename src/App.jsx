import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';

function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 MovieApp</Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;