import { useState, useEffect, useCallback } from "react";


export function useMovies(query, KEY, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
       
          const controller = new AbortController();
          async function fetchMovies() {
            try {
              setIsLoading(true);
              setError("");
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              if (!res.ok)
                throw new Error("Something went wrong with fetching movies");
              const data = await res.json();
    
              if (data.Response === "False") throw new Error("Movie not found");
              setMovies(data.Search);
              // setIsLoading(false);
              setError("");
            } catch (error) {
              // console.log(error.message);
    
              if (error.name !== "AbortError") {
                setError(error.message);
              }
            } finally {
              setIsLoading(false);
            }
          }
    
          if (!query.length) {
            setMovies([]);
            setError("");
            return;
          }
    
        //   handleCloseMovie();
          fetchMovies();
    
          // in each re-render the controller will abort the fetching request:
          return function () {
            controller.abort();
          };
        },
        [query, KEY]
      );

      return {movies, isLoading, error}
}