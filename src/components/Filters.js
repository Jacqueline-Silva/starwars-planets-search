import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import '../css/filters.css';

function Filters() {
  const {
    setOrderPlanets,
    dataFilterName,
    dataFilters,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [id, setId] = useState(0);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [applied, setApplied] = useState(false);
  const [arrayColumns, setArrayColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });
  const optionsMM = ['maior que', 'menor que', 'igual a'];
  const arrayColumns2 = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

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

  function sendFilters() {
    const filters = {
      id,
      column,
      comparison,
      value,
    };

    setId((prev) => prev + 1);
    filterByNumericValues(filters);
    setArrayColumns((prevState) => [...prevState.filter((e) => e !== column)]);
    setApplied(true);
  }

  function attFilters({ target }) {
    filterByNumericValues(target.id, 'remove');
  }

  function resetFilters() {
    filterByNumericValues([]);
  }

  function sorted({ target }) {
    if (target.id === 'ASC' || target.id === 'DESC') {
      return setOrder({ ...order, sort: target.id });
    }
    setOrder({ ...order, column: target.value });
  }

  function sendOrdered() {
    setOrderPlanets(order);
  }

  return (
    <nav className="filters">
      <h2>Filters</h2>
      <div className="filters__numValue-sort">
        <div className="filters__name">
          <label htmlFor="setNameFilter">
            Name
            <input
              type="text"
              id="setNameFilter"
              data-testid="name-filter"
              onChange={ handleNameFilter }
            />
          </label>
        </div>
        <div className="filters__numericValue">
          <label htmlFor="column-filter">
            Column
            <select
              name="column"
              id="column-filter"
              value={ column }
              data-testid="column-filter"
              onChange={ handleColumnFilter }
            >
              {
                arrayColumns.map((e) => <option key={ e }>{ e }</option>)
              }
            </select>
          </label>
          <label htmlFor="comparison-filter">
            Comparison
            <select
              name="comparison"
              value={ comparison }
              data-testid="comparison-filter"
              onChange={ handleComparisonFilter }
            >
              {
                optionsMM.map((e) => <option key={ e }>{ e }</option>)
              }
            </select>
          </label>
          <label htmlFor="value">
            Value
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
            onClick={ sendFilters }
          >
            FILTER
          </button>
        </div>
        <div className="filters__sort">
          <label htmlFor="column-filter">
            Column
            <select
              name="column"
              id="column-filter"
              data-testid="column-sort"
              onChange={ sorted }
            >
              {
                arrayColumns2.map((e) => <option key={ e }>{ e }</option>)
              }
            </select>
          </label>
          <label htmlFor="ASC" className="label-radio">
            Ascendente
            <input
              type="radio"
              name="sort"
              id="ASC"
              value="ASC"
              data-testid="column-sort-input-asc"
              className="radio"
              onChange={ sorted }
            />
          </label>
          <label htmlFor="DESC">
            Descendente
            <input
              type="radio"
              name="sort"
              id="DESC"
              value="DESC"
              data-testid="column-sort-input-desc"
              className="radio"
              onChange={ sorted }
            />
          </label>
          <button
            type="submit"
            data-testid="column-sort-button"
            onClick={ sendOrdered }
          >
            SORT
          </button>
        </div>
      </div>
      {
        applied
        && (
          <div className="filters-list">
            Applied filter:
            {
              dataFilters.map((e, i) => (
                <div key={ i } data-testid="filter" className="filters-list__filter">
                  {`${e.column} ${e.comparison} ${e.value}`}
                  <button
                    type="button"
                    id={ e.id }
                    onClick={ attFilters }
                    className="btn-removeFilter"
                  >
                    X
                  </button>
                </div>))
            }
            <div>
              <button
                type="button"
                data-testid="button-remove-filters"
                onClick={ resetFilters }
              >
                REMOVE FILTERS
              </button>
            </div>
          </div>
        )
      }

    </nav>
  );
}

export default Filters;
