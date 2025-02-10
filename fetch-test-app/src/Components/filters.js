import React from "react";
import "../Styles/styles.css";

const Filters = ({
  breeds,
  breedFilter,
  zipCode,
  zipCodeFilter,
  handleBreedChange,
  handleBreedRemoval,
  handleZipCodeChange,
  handleZipCodeKeyDown,
  handleZipCodeRemoval,
  handleMatchWithDog,
  handleSortByDesc,
  handleSortByAsc,
}) => {
  const breedsList = breeds.map((breed) => (
    <option key={breed} value={breed}>
      {breed}
    </option>
  ));

  return (
    <div className="filters">
      <select className="filters-select" onChange={handleBreedChange}>
        <option value="">Select a breed</option>
        {breedsList}
      </select>
      <div className="breedTags">
        {breedFilter.map((breed) => (
          <div key={breed} className="tag">
            <p style={{ fontSize: "15px", margin: "2px 8px" }}>{breed}</p>
            <div
              onClick={() => handleBreedRemoval(breed)}
              style={{ margin: "0 8px 0 0", cursor: "pointer" }}
            >
              x
            </div>
          </div>
        ))}
      </div>

      {/* Commented out zip code input and tags for now noticed an issue with the api 
      where once a bad combination of zip Code and breed occurs all API requests fail.  */}
      {/* <input
        type="text"
        placeholder="Zip Code"
        value={zipCode}
        onChange={handleZipCodeChange}
        onKeyDown={handleZipCodeKeyDown}
        className="filters-input"
      />
      <div className="zipTags">
        {zipCodeFilter.map((zip) => (
          <div key={zip} className="tag">
            <p style={{ fontSize: "15px", margin: "2px 8px" }}>{zip}</p>
            <div onClick={() => handleZipCodeRemoval(zip)} style={{ margin: "0 8px 0 0", cursor: "pointer" }}>
              x
            </div>
          </div>
        ))}
      </div> */}
      <div className="filters-button-container">
        <div className="filter-buttons">
          <button className="filter-button" onClick={handleSortByDesc}>
            Breeds A-Z
          </button>
          <button className="filter-button" onClick={handleSortByAsc}>
           Breeds Z-A
          </button>
        </div>
        <button className="match-button" onClick={handleMatchWithDog}>
          Match With A Dog!
        </button>
      </div>
    </div>
  );
};

export default Filters;
