import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Table() {
  const data = useContext(MyContext);

  // const keys = Object.keys(data)[0].map((e) => e).filter((item) => item !== 'residents');
  // const keysFilter = Object.keys(data[0]);
  return (
    data.length === 0
      ? 'Loading'
      : (
        <table>
          <thead>
            <tr>
              {
                Object.keys(data[0])
                  .filter((chave) => chave !== 'residents')
                  .map((e) => (
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
                    Object.values(planet)
                      .filter((chave) => chave !== 'residents')
                      .map((e) => (
                        <td key={ e }>{ e }</td>
                      ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      )
  );
}

export default Table;
