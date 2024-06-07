import logo from './logo.svg';
import './App.css';
import {Link, Routes, Route} from 'react-router-dom';
import Api_main from './components/Api_main';
import Pokedex from './components/Pokedex';


function App() {
  return (
    <div className="App">
      <div className="App-link"> 
     <Linking/>
     </div>
     <Routing/>
    </div>
  );
}

function Routing(){

  return(
    <Routes>
      
      <Route path="/:id" element={<Api_main/>}/>,
      <Route path="/pokedex" element={<Pokedex/>}/>

    </Routes>
  )
}

function Linking(){
  let test = 5;
  let url = "/"+test;
  return(
    <>
    <Link to="/0">acceuil</Link>
    <Link to="/pokedex">pokedex</Link>
    </>
  )
}

export default App;
