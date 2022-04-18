import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchAPI from '../services/fecthAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const dataPlanets = await fetchAPI();
      setData(dataPlanets);
      setPlanets(dataPlanets);
    };
    getPlanets();
  }, []);

  function dataFilterName(name) {
    const newDataPlanets = data.filter((planet) => planet.name.includes((name)));
    setPlanets(newDataPlanets);
  }

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        dataFilterName,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.any,
}).isRequered;

export default PlanetsProvider;
