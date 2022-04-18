import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchAPI from '../services/fecthAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [dataFilters, setDataFilters] = useState({});

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

  function filterByNumericValues(filters) {
    setDataFilters(filters);
  }

  useEffect(() => {
    const dataFiltered = () => {
      const newDataPlanets = data.filter((planet) => {
        const { column, comparison, value } = dataFilters;

        if (comparison === 'maior que') {
          return +(planet[column]) > value;
        }
        if (comparison === 'menor que') {
          return +(planet[column]) < value;
        }
        if (comparison === 'igual a') {
          return +(planet[column]) === +(value);
        }

        return true;
      });
      setPlanets(newDataPlanets);
    };
    dataFiltered();
  }, [dataFilters, data]);

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        dataFilterName,
        filterByNumericValues,
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
