import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, Film, ChevronRight, Calendar, Info, AlertTriangle } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  durationMinutes: number;
  rating: string;
  posterUrl: string;
}

interface Showtime {
  id: string;
  startsAt: string;
  endsAt: string;
  price: number;
  room: {
    id: string;
    name: string;
  };
}

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      setLoading(true);
      try {
        // Fetch Movie Details (includes showtimes)
        const movieRes = await fetch(`${API_URL}/movies/${movieId}`);
        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setMovie(movieData);
          setShowtimes(movieData.showtimes || []);
        } else {
          setMovie(null);
          setShowtimes([]);
        }
      } catch (err) {
        console.error('Error fetching details', err);
        setMovie(null);
        setShowtimes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndShowtimes();
  }, [movieId, API_URL]);

  const handleShowtimeClick = (showtimeId: string) => {
    if (!user) {
      // Redirect to login if guest
      navigate('/login', { state: { from: `/showtimes/${showtimeId}/seats` } });
    } else {
      navigate(`/showtimes/${showtimeId}/seats`);
    }
  };

  if (loading) {
    return <div className="spinner" style={{ marginTop: '80px' }}></div>;
  }

  if (!movie) {
    return (
      <div className="container empty-state" style={{ marginTop: '80px' }}>
        <Film size={48} />
        <p>No se pudo encontrar la película seleccionada.</p>
        <Link to="/" className="btn btn-secondary mt-4" style={{ width: 'auto' }}>
          Volver a Cartelera
        </Link>
      </div>
    );
  }

  const posterSrc = movie.posterUrl.startsWith('http')
    ? movie.posterUrl
    : `${API_URL}${movie.posterUrl}`;

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="flex-gap-sm mt-4" style={{ color: '#9ca3af', fontSize: '14px' }}>
        <Link to="/" style={{ color: '#9ca3af' }}>Cartelera</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#f3f4f6', fontWeight: 500 }}>{movie.title}</span>
      </div>

      <div className="details-container">
        {/* Poster Column */}
        <div className="details-poster-card">
          <img
            src={posterSrc}
            className="details-poster"
            alt={movie.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
            }}
          />
        </div>

        {/* Content Column */}
        <div className="details-content">
          <h1>{movie.title}</h1>
          
          <div className="details-metadata">
            <span className="details-badge genre">{movie.genre}</span>
            <span className="details-badge flex-gap-sm">
              <Clock size={14} />
              {movie.durationMinutes} minutos
            </span>
            <span className="details-badge">Clasificación: {movie.rating}</span>
          </div>

          <div className="details-divider"></div>

          <h2>Sinopsis</h2>
          <p className="details-synopsis">{movie.synopsis}</p>

          <div className="details-divider"></div>

          {/* Showtimes Box */}
          <div className="showtimes-box">
            <h3>
              <Calendar size={20} style={{ color: '#fbbf24' }} />
              Funciones Disponibles
            </h3>
            
            {showtimes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#9ca3af' }}>
                <Info size={28} style={{ marginBottom: '8px', color: '#6b7280' }} />
                <p>No hay funciones programadas para esta película actualmente.</p>
              </div>
            ) : (
              <div className="showtimes-grid">
                {showtimes.map((st) => {
                  const startDate = new Date(st.startsAt);
                  const formattedDate = startDate.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                  });
                  const formattedTime = startDate.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={st.id}
                      onClick={() => handleShowtimeClick(st.id)}
                      className="showtime-card"
                    >
                      <span className="showtime-time">{formattedTime}</span>
                      <span className="showtime-date">{formattedDate}</span>
                      <span className="showtime-room">{st.room.name}</span>
                      <span className="showtime-price">{Number(st.price).toFixed(2)} BOB</span>
                    </div>
                  );
                })}
              </div>
            )}

            {!user && showtimes.length > 0 && (
              <div className="flex-gap-sm mt-4" style={{ fontSize: '13px', color: '#fbbf24', background: 'rgba(251,191,36,0.05)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(251,191,36,0.1)' }}>
                <AlertTriangle size={16} />
                <span>Debes iniciar sesión para seleccionar tus asientos y reservar.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
