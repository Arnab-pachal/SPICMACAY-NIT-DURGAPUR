import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Layout/Footer.jsx';
import Header from './Layout/Header.jsx';

import Events from './Pages/Events.jsx';
import PresentTeam from './Pages/PresentTeam.jsx';
import Home from './components/Landing.jsx';
import Contact from './Pages/Contact.jsx';

import Login from './Pages/login.jsx';
import Mediagallery from './Pages/Mediagallery.jsx';

import { useEffect, useState } from 'react';
import Pixels from './Pages/Pixels.jsx';
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const dark = theme === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`max-w-[1600px] items-center justify-between mx-auto ${dark ? 'light' : 'dark'}`}>
      <BrowserRouter>
        <Header dark={dark} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Mediagallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<PresentTeam />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        
          <Route path="/pixels" element ={<Pixels/>}/>
          <Route path="*" element={<div>404: Page Not Found</div>} />
        </Routes>
        <Footer dark={dark} />
      </BrowserRouter>
    </div>
  );
}

export default App;
