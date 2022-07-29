import './App.css'
import { useState, useEffect } from 'react';
import ClubList from './componentes/ClubList';
import { api, notification } from './config/defaults';


export default function App() {
  const [clubes, setClubes] = useState([]);

  const getClubes = async () => {
    const { data: clubes } = await api.get('/clubes')
    setClubes(clubes)
  }

  useEffect(() => {
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
