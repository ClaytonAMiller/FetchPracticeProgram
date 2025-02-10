import React, { useState, useEffect, useCallback } from "react";
import Filters from "./filters.js";
import Pagination from "./pagination.js";
import DogList from "./doglist.js";
import MatchedDog from "./matchedDog.js";

const Dogs = (props) => {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedFilter, setBreedFilter] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeFilter, setZipCodeFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [matchedDogDisplay, setMatchedDogDisplay] = useState("none");
  const [matchedDog, setMatchedDog] = useState(null);
  const [sortBy, setSortBy] = useState("breed:asc"); // Add state for sortBy
  const size = 12; // Number of results per page

  const getDogBreeds = useCallback(() => {
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
  }, []);

  const getAllDogs = useCallback((page = 1) => {
    const breedQuery = breedFilter.map((breed) => `breeds=${breed}`).join("&");
    const zipQuery = zipCodeFilter.map((zip) => `zipCodes=${zip}`).join("&");
    const sortQuery = `sort=${sortBy}`;
    const fromQuery = `from=${(page - 1) * size}`;
    const sizeQuery = `size=${size}`;
    const queryString = [breedQuery, zipQuery, sortQuery, fromQuery, sizeQuery]
      .filter(Boolean)
      .join("&");
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
        console.log("dog Ids: ", data.resultIds);
        setDogs(data.resultIds);
        setTotalPages(Math.ceil(data.total / size)); // Assuming the API returns the total number of results
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [breedFilter, zipCodeFilter, sortBy]);

  const matchWithDog = useCallback(() => {
    const url = `https://frontend-take-home-service.fetch.com/dogs/match`;
    const data = favorites;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
        setMatchedDog(data); // Assuming the API returns an array with the matched dog data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [favorites]);

  const handleMatchWithDog = useCallback(() => {
    matchWithDog();
    setMatchedDogDisplay("flex");
    document.body.style.overflow = "hidden";
  }, [matchWithDog]);

  const checkLoggedIn = useCallback(() => {
    getDogBreeds();
    return true;
  }, [getDogBreeds]);

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  useEffect(() => {
    getAllDogs(currentPage);
  }, [breedFilter, zipCodeFilter, currentPage, getAllDogs]);

  useEffect(() => {
    if (currentPage > totalPages) {
      goToLastPage();
    }
  }, [currentPage, totalPages]);

  const addTobreedFilter = useCallback((breed) => {
    setBreedFilter((prev) => [...prev, breed]);
  }, []);

  const removeFromBreedFilter = useCallback((breed) => {
    setBreedFilter((prev) => prev.filter((b) => b !== breed));
  }, []);

  const handleBreedRemoval = useCallback((breed) => {
    console.log("removing breed: ", breed);
    removeFromBreedFilter(breed);
  }, [removeFromBreedFilter]);

  const handleBreedChange = useCallback((event) => {
    setSelectedBreed(event.target.value);
    console.log("Selected breed:", event.target.value);
    addTobreedFilter(event.target.value);
  }, [addTobreedFilter]);

  const handleZipCodeChange = useCallback((event) => {
    setZipCode(event.target.value);
  }, []);

  const handleZipCodeKeyDown = useCallback((event) => {
    if (event.key === "Enter") {
      setZipCodeFilter((prev) => [...prev, zipCode]);
      setZipCode("");
    }
  }, [zipCode]);

  const handleZipCodeRemoval = useCallback((zip) => {
    setZipCodeFilter((prev) => prev.filter((z) => z !== zip));
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const handleFavoriteClick = useCallback((dogId) => {
    console.log("favoriting dog added: ", dogId);
    setFavorites((prev) => [...prev, dogId]);
    console.log("favorites: ", favorites);
  }, [favorites]);

  const handleSortByDesc = useCallback(() => {
    setSortBy("breed:desc");
  }, []);

  const handleSortByAsc = useCallback(() => {
    setSortBy("breed:asc");
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MatchedDog
        id={matchedDog}
        view={matchedDogDisplay}
        setView={setMatchedDogDisplay}
      />
      <h1>Dogs</h1>
      <Filters
        breeds={breeds}
        breedFilter={breedFilter}
        zipCode={zipCode}
        zipCodeFilter={zipCodeFilter}
        handleBreedChange={handleBreedChange}
        handleBreedRemoval={handleBreedRemoval}
        handleZipCodeChange={handleZipCodeChange}
        handleZipCodeKeyDown={handleZipCodeKeyDown}
        handleZipCodeRemoval={handleZipCodeRemoval}
        handleMatchWithDog={handleMatchWithDog}
      />
      <button onClick={handleSortByDesc}>Sort by Breed Desc</button>
      <button onClick={handleSortByAsc}>Sort by Breed Asc</button>
      <DogList dogIds={dogs} handleFavoriteClick={handleFavoriteClick} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        goToLastPage={goToLastPage}
      />
    </div>
  );
};

export default Dogs;