import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import ClubList from './componentes/ClubList';
import { setApiDefaults } from './config/defaults';


export default function App() {
  const [clubes, setClubes] = useState([]);

  const getClubes = async () => {
    const { data: clubes } = await axios.get('/api/clubes')
    setClubes(clubes)
  }

  useEffect(() => {
    setApiDefaults();
    getClubes();
  }, []);

  return (
      <>
        <header className="header">
          <div id="panel"></div>
        </header>
        <main className="main">
            <ClubList clubs={clubes}></ClubList>
        </main>
        <footer className="footer">
          <div id="bottom-content"></div>
        </footer>
      </>
  )
}
