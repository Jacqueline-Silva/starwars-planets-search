import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const data = useContext(PlanetsContext);

  function dataFilterKeys(dados) {
    return Object.keys(dados[0]).filter((chave) => chave !== 'residents');
  }

  function dataFilterValues(planet) {
    return Object.values(planet).filter((value) => value !== 'residents');
  }

  return (
    <>
      <h1>StarWars</h1>
      <div>
        <h2>Filters</h2>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            onChange={ () => {} }
          />
        </label>
      </div>

      { data.length === 0
        ? 'Loading'
        : (
          <table border="1px">
            <thead>
              <tr>
                {
                  dataFilterKeys(data).map((e) => (
                    <th key={ e }>{ e }</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                data.map((planet) => (
                  <tr key={ planet.name }>
                    {
                      dataFilterValues(planet).map((e) => (
                        <td key={ e }>{ e }</td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        )}
    </>
  );
}

export default Table;
