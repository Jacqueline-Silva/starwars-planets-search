import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { dataFilterName } = useContext(PlanetsContext);

  function handleNameFilter({ target }) {
    dataFilterName(target.value);
  }

  return (
    <div>
      <h2>Filters</h2>
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
  );
}

export default Filters;
