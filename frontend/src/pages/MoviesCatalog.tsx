import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Film, Clock, UserCheck } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  durationMinutes: number;
  rating: string;
  posterUrl: string;
}

export const MoviesCatalog: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Hardcoded list of genres for university practical filters
  const genres = ['ACTION', 'SCI-FI', 'DRAMA', 'TERROR', 'COMEDIA'];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (selectedGenre) queryParams.append('genre', selectedGenre);

        const res = await fetch(`${API_URL}/movies?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setMovies(data);
        }
      } catch (err) {
        console.error('Error fetching movies', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchMovies();
    }, 300); // Simple debounce for search typing

    return () => clearTimeout(delayDebounce);
  }, [search, selectedGenre, API_URL]);

  const handleGenreToggle = (genre: string) => {
    if (selectedGenre.toUpperCase() === genre.toUpperCase()) {
      setSelectedGenre('');
    } else {
      setSelectedGenre(genre);
    }
  };

  return (
    <div className="container catalog-section">
      {/* Hero Header */}
      <div className="hero-banner">
        <h1 className="hero-title">
          Tus Películas Favoritas, <span>En Un Solo Lugar</span>
        </h1>
        <p className="hero-subtitle">
          Explora la cartelera más completa, selecciona tus asientos favoritos en tiempo real y reserva de forma segura e inmediata.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título de película..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            size={18}
            style={{ position: 'absolute', right: '20px', top: '14px', color: '#6b7280' }}
          />
        </div>

        <div className="genre-filter-wrapper">
          <button
            onClick={() => setSelectedGenre('')}
            className={`genre-btn ${selectedGenre === '' ? 'active' : ''}`}
          >
            Todos
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`genre-btn ${selectedGenre.toUpperCase() === genre.toUpperCase() ? 'active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="spinner"></div>
      ) : movies.length === 0 ? (
        <div className="empty-state">
          <Film size={48} />
          <p>No se encontraron películas en la cartelera.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => {
            const posterSrc = movie.posterUrl.startsWith('http')
              ? movie.posterUrl
              : `${API_URL}${movie.posterUrl}`;

            return (
              <div key={movie.id} className="movie-card">
                <div className="movie-poster-wrapper">
                  <img
                    src={posterSrc}
                    className="movie-poster"
                    alt={movie.title}
                    onError={(e) => {
                      // Fallback image in case backend image fails
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                    }}
                  />
                  <div className="movie-rating-badge">{movie.rating}</div>
                </div>

                <div className="movie-info">
                  <span className="movie-genre">{movie.genre}</span>
                  <h3 className="movie-card-title">{movie.title}</h3>
                  
                  <div className="movie-meta">
                    <span className="flex-gap-sm" style={{ fontSize: '13px' }}>
                      <Clock size={14} />
                      {movie.durationMinutes} min
                    </span>
                    <span className="flex-gap-sm" style={{ fontSize: '13px' }}>
                      <UserCheck size={14} />
                      {movie.rating}
                    </span>
                  </div>

                  <p className="movie-card-synopsis">{movie.synopsis}</p>
                  
                  <Link to={`/movies/${movie.id}`} className="btn btn-primary mt-4">
                    Ver Funciones
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MoviesCatalog;
