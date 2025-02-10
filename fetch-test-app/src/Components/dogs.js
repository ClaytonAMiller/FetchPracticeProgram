import React, { useState, useEffect } from "react";
import Dog from "./dog";

const Dogs = (props) => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedFilter, setBreedFilter] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 25; // Number of results per page

  function getDogBreeds() {
    const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          window.location.href = "/login";
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setBreeds(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function getAllDogs(page = 1, sortBy = "breed:asc") {
    const breedQuery = breedFilter.map((breed) => `breeds=${breed}`).join("&");
    const zipQuery = zipCode ? `zip=${zipCode}` : "";
    const sortQuery = `sort=${sortBy}`;
    const fromQuery = `from=${(page - 1) * size}`;
    const sizeQuery = `size=${size}`;
    const queryString = [breedQuery, zipQuery, sortQuery, fromQuery, sizeQuery].filter(Boolean).join("&");
    const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryString}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setDogs(data.resultIds);
        setTotalPages(Math.ceil(data.total / size)); // Assuming the API returns the total number of results
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function checkLoggedIn() {
    getDogBreeds();
    return true;
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    getAllDogs(currentPage);
  }, [breedFilter, zipCode, currentPage]);

  function addTobreedFilter(breed) {
    setBreedFilter((prev) => [...prev, breed]);
  }

  function removeFromBreedFilter(breed) {
    setBreedFilter((prev) => prev.filter((b) => b !== breed));
  }

  function handleBreedRemoval(breed) {
    console.log("removing breed: ", breed);
    removeFromBreedFilter(breed);
  }

  function handleBreedChange(event) {
    setSelectedBreed(event.target.value);
    console.log("Selected breed:", event.target.value);
    addTobreedFilter(event.target.value);
  }

  function handleZipCodeChange(event) {
    setZipCode(event.target.value);
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  const breedsList = breeds.map((breed) => (
    <option key={breed} value={breed}>
      {breed}
    </option>
  ));

  const dogList = dogs.map((dog) => (
    <Dog key={dog} id={dog} />
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Dogs</h1>
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
        </div>

        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <div className="tags"></div>
      </div>

      <div
        style={{
          display: "flex",
          maxWidth: "80vw",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        {dogList}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <p style={{ margin: "0 10px" }}>Page {currentPage} of {totalPages}</p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Dogs;