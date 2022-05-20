
import logo from './logo.svg';
import './App.css';
import Axious from './Component.js/Axious';
import Homepage from './Component.js/Homepage';
import { Route, Routes } from 'react-router-dom';
import Scoresheet from './Component.js/Scoresheet';

function App() {
  return (
    <div >
   
   

    <Routes>
     <Route path='/' element={<Homepage/>} />
     <Route path='/quiz-mode' element={<Axious/>} />
     <Route path='/scorepage' element={<Scoresheet />}/>
    </Routes>
    </div>
  );
}

export default App;
