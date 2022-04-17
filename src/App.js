import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import MyContext from './context/MyContext';
import fetchAPI from './services/fecthAPI';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const dataPlanets = await fetchAPI();
      setData(dataPlanets);
    };
    getPlanets();
  }, []);

  return (
    <MyContext.Provider value={ data }>
      <Table />
    </MyContext.Provider>
  );
}

export default App;
