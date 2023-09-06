import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';
import './App.css';
import './styles/styles.css';
import { useEffect } from 'react';

function App() {

  return (
    <div className="app app-[bingo]">
      <BrowserRouter basename="/bingo-card">
        <Routes>
          { routes && routes.map((route, index) => <Route key={ index } path={ route.path } element={ route.element } /> ) }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
