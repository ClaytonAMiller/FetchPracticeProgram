import React, { useState, useEffect, useCallback } from "react";
import Filters from "./filters.js";
import Pagination from "./pagination.js";
import DogList from "./doglist.js";
import MatchedDog from "./matchedDog.js";
import "../Styles/styles.css";

function Dogs() {
  const [breeds, setBreeds] = useState([]); // List of dog breeds
  const [dogs, setDogs] = useState([]); // List of dog IDs
  const [selectedBreed, setSelectedBreed] = useState(""); // breed being added to filter list
  const [breedFilter, setBreedFilter] = useState([]); // List of selected breeds
  // *******Removed zip code filter for now due to API issues**********
  // const [zipCode, setZipCode] = useState(""); 
  // const [zipCodeFilter, setZipCodeFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page being viewed
  const [totalPages, setTotalPages] = useState(1); // Total number of pages of results based on query
  const [favorites, setFavorites] = useState([]); // List of favorite dog IDs
  const [matchedDogDisplay, setMatchedDogDisplay] = useState("none"); // Display state for matched dog modal
  const [matchedDog, setMatchedDog] = useState(null); // Matched dog data
  const [sortBy, setSortBy] = useState("breed:asc"); // Add state for sortBy
  const size = 12; // Number of results per page

  // Function to fetch dog breeds from the API
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

  // Function to build query string from parameters
  const buildQueryString = (params) => {
    return Object.keys(params)
      .filter((key) => params[key]) // Only include parameters that have values
      .map((key) => { // make sure new paramerters are added as a new key value pair
        if (Array.isArray(params[key])) {
          return params[key]
            .map((value) => `${key}=${encodeURIComponent(value)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(params[key])}`;
      })
      .join("&");
  };

  // Function to fetch all dogs based on filters and pagination
  const getAllDogs = useCallback((page = 1) => {
    // set the base parameters of the query
    const params = {
      sort: sortBy,
      from: (page - 1) * size,
      size: size,
    };

    if (breedFilter.length > 0) {
      params.breeds = breedFilter;
    }

    const queryString = buildQueryString(params);
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
        // console.log("dog Ids: ", data.resultIds); // debugging to see if the dog ids are being returned
        setDogs(data.resultIds);
        setTotalPages(Math.ceil(data.total / size)); // Assuming the API returns the total number of results
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [breedFilter, sortBy]);

  // Function to match with a dog based on favorites
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

  // Function to handle matching with a dog
  const handleMatchWithDog = useCallback(() => {
    if (favorites.length <= 0) { // make sure the user has seleceted at least on favorite dog
      alert("Please select some favorites first.");
      return;
    }
    matchWithDog();
    setMatchedDogDisplay("flex");
    document.body.style.overflow = "hidden";
  }, [matchWithDog]);

  // Function to check if user is logged in
  const checkLoggedIn = useCallback(() => {
    // run the get dog breeds function to check if the user 
    // is logged because if there is no cookie present the user will be bounced to the login page
    getDogBreeds();
    return true;
  }, [getDogBreeds]);

  // check if the user is logged in on Component mount and when the getDogBreeds
  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  // Fetch dog breeds on component mount and when breedFilter or the current page changes
  useEffect(() => {
    getAllDogs(currentPage);
  }, [breedFilter, currentPage, getAllDogs]);

  // Check if current page exceeds total pages and go to last possible page if it does
  useEffect(() => {
    if (currentPage > totalPages) {
      goToLastPage();
    }
  }, [currentPage, totalPages]);

  // Function to add a breed to the breed filter
  const addTobreedFilter = useCallback((breed) => {
    setBreedFilter((prev) => [...prev, breed]);
  }, []);

  // Function to remove a breed from the breed filter
  const removeFromBreedFilter = useCallback((breed) => {
    setBreedFilter((prev) => prev.filter((b) => b !== breed));
  }, []);

  // calls the breed removal function
  const handleBreedRemoval = useCallback((breed) => {
    console.log("removing breed: ", breed);
    removeFromBreedFilter(breed);
  }, [removeFromBreedFilter]);

  // calls the breed addition function when ever a new option is selected in the select tag
  const handleBreedChange = useCallback((event) => {
    setSelectedBreed(event.target.value);
    console.log("Selected breed:", event.target.value);
    addTobreedFilter(event.target.value);
  }, [addTobreedFilter]);

  // *******Removed zip code filter for now due to API issues**********
  // const handleZipCodeChange = useCallback((event) => {
  //   setZipCode(event.target.value);
  // }, []);

  // const handleZipCodeKeyDown = useCallback((event) => {
  //   if (event.key === "Enter") {
  //     setZipCodeFilter((prev) => [...prev, zipCode]);
  //     setZipCode("");
  //   }
  // }, [zipCode]);


  // const handleZipCodeRemoval = useCallback((zip) => {
  //   setZipCodeFilter((prev) => prev.filter((z) => z !== zip));
  // }, []);

  // Function to handle pagination to the next page
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  // Function to handle pagination to the previous page
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Function to go to the last page
  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  // Function to add a dog to favorites
  const handleFavoriteClick = useCallback((dogId) => {
    console.log("favoriting dog added: ", dogId);
    setFavorites((prev) => [...prev, dogId]);
    console.log("favorites: ", favorites);
  }, [favorites]);

  // Function to sort dogs by descending order
  const handleSortByDesc = useCallback(() => {
    setSortBy("breed:desc");
  }, []);

  // Function to sort dogs by ascending order
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
      <h1 className="title">Find Your Next Best Friend Here!</h1>
      <Filters
        breeds={breeds}
        breedFilter={breedFilter}
        // zipCode={zipCode}
        // zipCodeFilter={zipCodeFilter}
        handleBreedChange={handleBreedChange}
        handleBreedRemoval={handleBreedRemoval}
        // handleZipCodeChange={handleZipCodeChange}
        // handleZipCodeKeyDown={handleZipCodeKeyDown}
        // handleZipCodeRemoval={handleZipCodeRemoval}
        handleMatchWithDog={handleMatchWithDog}
        handleSortByDesc={handleSortByDesc}
        handleSortByAsc={handleSortByAsc}
      />
      <DogList dogIds={dogs} handleFavoriteClick={handleFavoriteClick} favorites={favorites} />
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