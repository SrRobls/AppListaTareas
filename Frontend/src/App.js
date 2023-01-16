import './App.css';
import Header from './components/Header';
import Tareas from './components/Tareas';
import { HashRouter as Router, Route } from "react-router-dom";
import TareaPagina from './components/TareaPagina';
import LoginAndRegisterPage from './components/LoginAndRegisterPage'
import Registro from './components/Registro';


function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Route path='/' exact component = {LoginAndRegisterPage} ></Route>
        <Route path='/registrarse' component = {Registro} />
        <Route path='/tareas' exact component = {Tareas} ></Route>
        <Route path='/tarea/:id' component = {TareaPagina} />
      </div>
    </Router>
  );
}

export default App;
