import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="app">
      <Navigation/>
      <h1>Hello</h1>
      <Outlet/>
    </div>
  );
}

export default App;
