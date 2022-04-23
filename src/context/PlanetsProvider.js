import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchAPI from '../services/fecthAPI';

function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const [orderPlanets, setOrderPlanets] = useState({});

  const sortName = (a, b) => {
    const numberMagic = -1;
    return a.name > b.name ? 1 : numberMagic;
  };

  useEffect(() => {
    const getPlanets = async () => {
      const dataPlanets = await fetchAPI();
      setData(dataPlanets);
      setPlanets(dataPlanets.sort(sortName));
    };
    getPlanets();
  }, []);

  function dataFilterName(filterName) {
    const newDataPlanets = data.filter(({ name }) => (
      name.toLowerCase().includes(filterName)));
    setPlanets(newDataPlanets);
  }

  function filterByNumericValues(filters, removeFilter) {
    if (filters && removeFilter) {
      return setDataFilters((prev) => prev.filter((e) => +e.id !== +filters));
    }
    if (!removeFilter) setDataFilters([...dataFilters, filters]);
    if (filters.length === 0) return setDataFilters([]);
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
      } else {
        setPlanets(data);
      }
    };
    dataFiltered();
  }, [dataFilters, data]);

  useEffect(() => {
    const orderedPlanets = () => {
      const { column, sort } = orderPlanets;
      const copyData = [...data];
      const sortASC = copyData.sort((a, b) => a[column] - b[column]);
      setPlanets(sortASC);

      if (sort === 'DESC') {
        const sortDESC = copyData.sort((a, b) => b[column] - a[column]);
        setPlanets(sortDESC);
      }
    };
    orderedPlanets();
  }, [orderPlanets, data]);

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        setOrderPlanets,
        dataFilters,
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
