/* global URL, window */
import React, { useEffect, useState } from 'react';

const defaults = {
  keyword: 'cake',
  instruction: 'Please enter a keyword or lat,long coordinates',
  searchOrder: 'relevance',
};

const getQS = () => ((typeof URL === 'undefined') ? '' : new URL(window.location.href).search);

function getGeoCode(qs) {
  const matches = /(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)/.exec(qs);
  return (matches) ? matches[0] : '';
}

export default function FlickrSearchBar({
  onSearchChange: changeSearch,
}) {
  const [searchOrder, setSearchOrder] = useState(defaults.searchOrder);
  const [searchValue, setSearchValue] = useState(getGeoCode(getQS()) || defaults.keyword);

  // this is an "on-load" event
  useEffect(() => {
    changeSearch(searchValue, { searchOrder });
  }, []);

  const handleSearchChange = (keyword) => {
    setSearchValue(keyword);

    changeSearch(keyword, { searchOrder });
  };

  const onOrderChange = (order) => {
    setSearchOrder(order);

    changeSearch(searchValue, { searchOrder: order });
  };

  return (
    <section
      id="search-bar"
      className="mx-2"
    >
      <div className="row my-4">
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
            Date posted
          </option>
          <option value="relevance">
            Relevance
          </option>
        </select>

        {/* ADDING A  BUTTON */}
        <button
          type="button"
          onClick={() => changeSearch('russian blue')}
          className="btn btn-dark text-uppercase"
        >
          Push for cats
        </button>
      </div>
    </section>
  );
}
