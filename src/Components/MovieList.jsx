import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movieListRequest } from '../Redux/actions';

const MovieList = () => {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector(state => state.movies);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(movieListRequest());
  }, [dispatch]);

  useEffect(() => {
    if (movies) {
      setFilteredMovies(movies);
    }
  }, [movies]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter movies..." 
        value={filter}
        onChange={handleFilterChange}
        className="mb-4 p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{movie.release_date}</p>
            <p className="text-sm">{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

