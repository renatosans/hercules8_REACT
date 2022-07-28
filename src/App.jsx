import './App.css'
import { useState, useEffect } from 'react';
import ClubList from './componentes/ClubList';


export default function App() {
  const [clubes, setClubes] = useState([]);

  const getClubes = async () => {
    const response = await fetch('./mock_data/clubes.json')
    .then((response) => response.json());

    setClubes(response);
  }

  useEffect(() => {
    getClubes();
  }, []);

  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

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
