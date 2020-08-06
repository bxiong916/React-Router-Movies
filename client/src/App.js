import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'
import SavedList from './Movies/SavedList.js';
import MovieList from './Movies/MovieList.js'
import Movie from './Movies/Movie.js'

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);
  const addToSavedList = id => {
    console.log(id)
    console.log(id.id)
    console.log(saved)
      setSaved([...saved, id])
    // This is stretch. Prevent the same movie from being "saved" more than once
  };
  return (
    <div>
      <SavedList list={saved} />
      <Route path='/movies/:id'>
        <Movie/>
      </Route>
        <Route exact path='/'>
          <MovieList movies={movieList}/>
        </Route>
    </div>
  );
};

export default App;
