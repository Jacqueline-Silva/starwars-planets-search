import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const { dataFilterName, filterByNumericValues } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [applied, setApplied] = useState(false);
  const [allFilters, setAllFilters] = useState([]);

  function handleNameFilter({ target }) {
    dataFilterName((target.value).toLowerCase());
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
    setAllFilters([...allFilters, filters]);
    // setArrayColumns((prevState) => [...prevState.filter((e) => e !== column)]);
    setApplied(true);
  }

  function attFilters() {
    const filters = {
      column,
      comparison,
      value,
    };
    console.log(filters, 'apagando');
  }

  function resetFilters() {
    filterByNumericValues({});
    setAllFilters([]);
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
            id="column-filter"
            value={ column }
            data-testid="column-filter"
            onChange={ handleColumnFilter }
          >
            {/* {
              arrayColumns.map((e) => <option key={ e }>{ e }</option>)
            } */}
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
      {
        applied
        && (
          <div>
            Applied filter:
            {
              allFilters.map((e, i) => (
                <div key={ i } data-testid="filter">
                  {`${e.column} ${e.comparison} ${e.value}`}
                  <button
                    type="button"
                    onClick={ attFilters }
                  >
                    x
                  </button>
                </div>))
            }
            <div>
              <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ resetFilters }
              >
                Remover filtragens
              </button>
            </div>
          </div>
        )
      }

    </div>
  );
}

export default Filters;
