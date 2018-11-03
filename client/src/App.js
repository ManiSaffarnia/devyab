import React from 'react';
import AppRouter from './routers/AppRouters';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/style.scss';



const App = () => (
  <div className="App">
    <AppRouter />
  </div>

);

export default App;