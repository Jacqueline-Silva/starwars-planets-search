import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { dataFilterName, filterByNumericValues } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  function handleNameFilter({ target }) {
    dataFilterName(target.value);
  }

  function handleColumnFilter({ target }) {
    setColumn(target.value);
  }

  function handleComparisonFilter({ target }) {
    setComparison(target.value);
  }
  function handleValueFilter({ target }) {
    setValue(target.value);
  }

  function dataFilters() {
    const filters = {
      column,
      comparison,
      value,
    };
    filterByNumericValues(filters);
  }

  return (
    <div>
      <h2>Filters</h2>
      <div>
        <label htmlFor="setNameFilter">
          Name:
          <input
            type="text"
            id="setNameFilter"
            data-testid="name-filter"
            onChange={ handleNameFilter }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column-filter">
          <select
            name="column"
            value={ column }
            data-testid="column-filter"
            onChange={ handleColumnFilter }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            name="comparison"
            value={ comparison }
            data-testid="comparison-filter"
            onChange={ handleComparisonFilter }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-filter"
            onChange={ handleValueFilter }
          />
        </label>
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ dataFilters }
        >
          FILTRAR
        </button>
      </div>
    </div>
  );
}

export default Filters;
