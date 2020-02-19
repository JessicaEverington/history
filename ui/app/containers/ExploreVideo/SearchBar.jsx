/* global URL, window */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const defaults = {
  geocode: '13.7524000,100.5021833',
  instruction: 'Keyword or GeoCode',
  searchOrder: 'relevance',
};

const getQS = () => ((typeof URL === 'undefined') ? '' : new URL(window.location.href).search);

// output sample '49.25,-123.1' or ''
function getGeoCode(qs) {
  const matches = /(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/.exec(qs);
  return (matches) ? matches[0] : '';
}

export default function SearchBar({
  onSearchChange: changeSearch,
}) {
  const [searchOrder, setSearchOrder] = useState(defaults.searchOrder);
  const [searchValue, setSearchValue] = useState(getGeoCode(getQS()) || defaults.geocode);
  const [showingCats, catButtonPressed] = useState(false); // ALLOWS US TO CHANGE THE  VALUE OF THE CAT STATE BUTTON

  // this is an "on-load" event
  useEffect(() => {
    changeSearch(searchValue, { searchOrder });
    // showCats(true); // execute once
  }, []);

  const handleSearchChange = (keyword) => {
    setSearchValue(keyword);

    changeSearch(keyword, { searchOrder });
  };

  const onOrderChange = (order) => {
    setSearchOrder(order);

    changeSearch(searchValue, { searchOrder: order });
  };

  const CatButton = styled.button`
    display: inline-block;
    border-radius: 3px;
    padding: .5rem 0;
    margin: .5rem 1rem;
    width: 11rem;
    background: ${showingCats ? '#333' : 'black'};
    color: ${showingCats ? 'mediumpurple' : 'hotpink'};
  `;

  return (
    <section
      id="search-bar"
      className="row my-4"
    >
      <input
        onChange={event => handleSearchChange(event.target.value)}
        placeholder={defaults.instruction}
        title={defaults.instruction}
        value={searchValue}
        tabIndex="1"
        className="form-control col-6 mx-2"
      />
      <select
        defaultValue="relevance"
        onChange={event => onOrderChange(event.target.value)}
        tabIndex="2"
        className="form-control col-4 col-md-2 mx-2"
      >
        <option value="date">
          Date of creation
        </option>
        <option value="relevance">
          Relevance
        </option>
      </select>

      {/* ADDING A  BUTTON */}
      <button
        type="button"
        onClick={() => changeSearch('russian blue')}
        className="btn btn-info"
      >
        PUSH FOR CATS
      </button>

      {/* CREATING A PAGE-SPECIFIC BUTTON COMPONENT */}
      <CatButton
        type="button"
        onClick={() => {
          changeSearch('russian blue');
          catButtonPressed(true);
        }}
      >
        PUSH FOR CATS
      </CatButton>
    </section>
  );
}
