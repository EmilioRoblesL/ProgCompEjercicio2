// src/App.js
import React from 'react';
import './App.css';
import Formulario from './components/Formulario'; 

function App() {
  return (
    <div className="App">
      <h1>Formulario de Registro</h1>
      <Formulario /> {/* Usa el componente Formulario */}
    </div>
  );
}

export default App;
