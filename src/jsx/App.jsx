import React, { useState, useEffect } from 'react';
import '../styles/styles.less';

import { v4 as uuidv4 } from 'uuid';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import slideToggle from './helpers/slideToggle.js';
// import formatNr from './helpers/FormatNr.js';
// import roundNr from './helpers/RoundNr.js';

// const appID = '#app-root-2022-sahkokatkot';

function App() {
  // Data states.
  const [dataContent, setContentData] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(false);

  useEffect(() => {
  }, [dataContent]);

  useEffect(() => {
    const data_file = (window.location.href.includes('github')) ? './assets/data/data.csv' : './assets/data/data.csv';
    try {
      fetch(data_file)
        .then(response => response.text())
        .then(body => setContentData(CSVtoJSON(body)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const changeSelection = (event, i) => {
    setSelectedContainer(i);
    if (selectedContainer !== false) {
      document.querySelectorAll('.content_container').forEach(el => el.classList.remove('active'));
    }
    for (let idx = 0; idx <= 2; idx++) {
      if (idx === i) {
        document.querySelector(`.content_container_${i}`).classList.add('center');
        document.querySelector(`.content_container_${i}`).classList.remove('left');
        document.querySelector(`.content_container_${i}`).classList.remove('right');
      } else if (idx < i) {
        document.querySelector(`.content_container_${idx}`).classList.add('left');
        document.querySelector(`.content_container_${idx}`).classList.remove('center');
        document.querySelector(`.content_container_${idx}`).classList.remove('right');
      } else if (idx > i) {
        document.querySelector(`.content_container_${idx}`).classList.add('right');
        document.querySelector(`.content_container_${idx}`).classList.remove('center');
        document.querySelector(`.content_container_${idx}`).classList.remove('left');
      }
    }
    document.querySelectorAll('.content_container').forEach(el => el.classList.add('visible'));
    if (selectedContainer === false) {
      slideToggle(document.querySelectorAll('.content_container')[i]);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h3>Valitse, ketä haluat seurata</h3>
        <div className="selection_containers">
          {dataContent && dataContent[0].map((column, i) => (
            <div key={column} className={`selection_container selection_container_${i} ${(selectedContainer !== i && selectedContainer !== false) ? 'not_selected' : ''}`}>
              <button type="button" onClick={(event) => changeSelection(event, i)}>
                {column}
              </button>
            </div>
          ))}
        </div>
        <div className="content_containers">
          {dataContent && dataContent[0].map((column, i) => (
            <div key={column} className={`content_container content_container_${i}`}>
              {dataContent && [...dataContent].slice(1).map((row) => (
                <div key={row} className="content_wrapper">
                  <div className="time_content">
                    <span className="time">{row[0]}</span>
                    <span className="line" />
                  </div>
                  <div className="text_content">
                    {
                      row[i + 1].split('\n\n').map((paragraph) => {
                        paragraph = paragraph.replace(/Sairaaloissa normaalitoiminnot ajetaan varavoiman avulla hallitusti alas. Potilasturvallisuus ei vaarannu. Kiireellistä hoitoa voidaan antaa pitkäänkin./, '<strong>Sairaaloissa</strong> normaalitoiminnot ajetaan varavoiman avulla hallitusti alas. Potilasturvallisuus ei vaarannu. Kiireellistä hoitoa voidaan antaa pitkäänkin.');
                        paragraph = paragraph.replace(/Kaikki sähköllä kulkeva joukkoliikenne pysähtyy. Kulkuneuvoista poistumisessa ohjeistetaan./, 'Kaikki sähköllä kulkeva <strong>joukkoliikenne</strong> pysähtyy. Kulkuneuvoista poistumisessa ohjeistetaan.');
                        paragraph = paragraph.replace(/Pankkiautomaatit ja pankkien konttorit menevät kiinni. Maksukortit lakkaavat toimimasta./, '<strong>Pankki</strong>automaatit ja pankkien konttorit menevät kiinni. Maksukortit lakkaavat toimimasta.');
                        paragraph = paragraph.replace(/Katuvalot ja liikennevalot sammuvat, lähes kaikki huoltoasemat menevät kiinni./, '<strong>Katuvalot ja liikennevalot</strong> sammuvat, lähes kaikki <strong>huoltoasemat</strong> menevät kiinni.');
                        paragraph = paragraph.replace(/Katuvalot ja liikennevalot sammuvat, lähes kaikki huoltoasemat menevät kiinni./, '<strong>Katuvalot ja liikennevalot</strong> sammuvat, lähes kaikki <strong>huoltoasemat</strong> menevät kiinni.');
                        paragraph = paragraph.replace(/Emma yllättyy, kun lähellä oleva huoltoasema on auki. Se on yksi Suomen muutamasta kymmenestä huoltoasemasta, joilla on varavoimaa käytössään. Emma saa tankin täyteen./, 'Emma yllättyy, kun lähellä oleva huoltoasema on auki. Se on yksi Suomen <a href="https://yle.fi/uutiset/3-12535915" target="_blank">muutamasta kymmenestä huoltoasemasta</a>, joilla on varavoimaa käytössään. Emma saa tankin täyteen.');
                        // eslint-disable-next-line
                        return (<p key={uuidv4()} dangerouslySetInnerHTML={{ __html: paragraph }} />);
                      })
                    }
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
