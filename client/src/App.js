import './App.css';
import { Outlet } from 'react-router-dom';
import Navigation from './Components/Navigation';

function App() {
  return (
    <div className="app">
      <Navigation/>
      <Outlet/>
    </div>
  );
}

export default App;
