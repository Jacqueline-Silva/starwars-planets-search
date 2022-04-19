import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchAPI from '../services/fecthAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  // const [allFilters, setAllFilters] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const dataPlanets = await fetchAPI();
      setData(dataPlanets);
      setPlanets(dataPlanets);
    };
    getPlanets();
  }, []);

  function dataFilterName(filterName) {
    const newDataPlanets = data.filter(({ name }) => (
      name.toLowerCase().includes(filterName)));
    setPlanets(newDataPlanets);
  }

  function filterByNumericValues(filters) {
    setDataFilters([...dataFilters, filters]);
  }

  useEffect(() => {
    const dataFiltered = () => {
      const filtered = (acc, { column, comparison, value }, index) => {
        const newDataPlanets = (planet) => {
          if (comparison === 'maior que') return +(planet[column]) > (value);
          if (comparison === 'menor que') return +(planet[column]) < (value);
          return +(planet[column]) === +(value);
        };

        if (index === 0) acc = data.filter(newDataPlanets);
        return acc.filter(newDataPlanets);
      };
      if (dataFilters.length !== 0) {
        setPlanets(dataFilters.reduce(filtered, []));
      }
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
