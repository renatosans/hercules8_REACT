import './App.css'
import ClubList from './componentes/ClubList'


export default function App() {

  return (
      <>
        <header className="header">
          <div id="panel"></div>
        </header>
        <main className="main">
            <ClubList></ClubList>
        </main>
        <footer className="footer">
          <div id="bottom-content"></div>
        </footer>
      </>
  )
}
