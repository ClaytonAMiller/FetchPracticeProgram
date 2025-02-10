import React from "react";

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
}) => {
  const breedsList = breeds.map((breed) => (
    <option key={breed} value={breed}>
      {breed}
    </option>
  ));

  return (
    <div className="filters">
      <select onChange={handleBreedChange}>
        <option value="">Select a breed</option>
        {breedsList}
      </select>
      <div className="breedTags">
        {breedFilter.map((breed) => (
          <div
            key={breed}
            className="tag"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              backgroundColor: "lightgray",
              width: "fit-content",
            }}
          >
            <p style={{ fontSize: "15px", margin: "2px 8px" }}>{breed}</p>
            <div
              onClick={() => handleBreedRemoval(breed)}
              style={{ margin: "0 8px 0 0", cursor: "pointer" }}
            >
              x
            </div>
          </div>
        ))}
        <button
          onClick={handleMatchWithDog}
          style={{ alignSelf: "center", marginTop: "20px" }}
        >
          Match with Dog
        </button>
      </div>

      <input
        type="text"
        placeholder="Zip Code"
        value={zipCode}
        onChange={handleZipCodeChange}
        onKeyDown={handleZipCodeKeyDown}
      />
      <div className="zipTags">
        {zipCodeFilter.map((zip) => (
          <div
            key={zip}
            className="tag"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              backgroundColor: "lightgray",
              width: "fit-content",
            }}
          >
            <p style={{ fontSize: "15px", margin: "2px 8px" }}>{zip}</p>
            <div
              onClick={() => handleZipCodeRemoval(zip)}
              style={{ margin: "0 8px 0 0", cursor: "pointer" }}
            >
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;