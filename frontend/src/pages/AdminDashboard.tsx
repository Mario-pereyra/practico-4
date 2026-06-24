import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, DoorOpen, Calendar, Plus, Trash2, Edit3, X, AlertCircle } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  genre: string;
  durationMinutes: number;
  rating: string;
  posterUrl: string;
}

interface Room {
  id: string;
  name: string;
  rows: number;
  columns: number;
  capacity: number;
}

interface Showtime {
  id: string;
  startsAt: string;
  endsAt: string;
  price: number;
  movieId: string;
  roomId: string;
  movie: { title: string };
  room: { name: string };
}

type TabType = 'movies' | 'rooms' | 'showtimes';

export const AdminDashboard: React.FC = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>('movies');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form Fields - Movie
  const [movieTitle, setMovieTitle] = useState('');
  const [movieSynopsis, setMovieSynopsis] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  const [movieDuration, setMovieDuration] = useState(120);
  const [movieRating, setMovieRating] = useState('PG-13');
  const [moviePosterFile, setMoviePosterFile] = useState<File | null>(null);

  // Form Fields - Room
  const [roomName, setRoomName] = useState('');
  const [roomRows, setRoomRows] = useState(5);
  const [roomCols, setRoomCols] = useState(8);

  // Form Fields - Showtime
  const [stMovieId, setStMovieId] = useState('');
  const [stRoomId, setStRoomId] = useState('');
  const [stStartsAt, setStStartsAt] = useState('');
  const [stPrice, setStPrice] = useState(40);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    loadTabData();
  }, [activeTab, user, navigate]);

  const loadTabData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (activeTab === 'movies') {
        const res = await fetch(`${API_URL}/movies`);
        if (res.ok) setMovies(await res.json());
      } else if (activeTab === 'rooms') {
        const res = await fetch(`${API_URL}/rooms`);
        if (res.ok) setRooms(await res.json());
      } else if (activeTab === 'showtimes') {
        const res = await fetch(`${API_URL}/showtimes`);
        if (res.ok) setShowtimes(await res.json());
        
        // Also fetch movies & rooms list for dropdowns if tab is showtimes
        const mRes = await fetch(`${API_URL}/movies`);
        const rRes = await fetch(`${API_URL}/rooms`);
        if (mRes.ok) setMovies(await mRes.json());
        if (rRes.ok) setRooms(await rRes.json());
      }
    } catch (err) {
      console.error('Error loading tab data', err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setErrorMsg(null);
    
    // Clear movie forms
    setMovieTitle('');
    setMovieSynopsis('');
    setMovieGenre('ACTION');
    setMovieDuration(120);
    setMovieRating('PG-13');
    setMoviePosterFile(null);

    // Clear room forms
    setRoomName('');
    setRoomRows(5);
    setRoomCols(8);

    // Clear showtimes forms
    setStMovieId(movies[0]?.id || '');
    setStRoomId(rooms[0]?.id || '');
    setStStartsAt('');
    setStPrice(40);

    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setErrorMsg(null);
    setEditingId(item.id);

    if (activeTab === 'movies') {
      setMovieTitle(item.title);
      setMovieSynopsis(item.synopsis);
      setMovieGenre(item.genre);
      setMovieDuration(item.durationMinutes);
      setMovieRating(item.rating);
      setMoviePosterFile(null);
    } else if (activeTab === 'rooms') {
      setRoomName(item.name);
      setRoomRows(item.rows);
      setRoomCols(item.columns);
    } else if (activeTab === 'showtimes') {
      setStMovieId(item.movieId);
      setStRoomId(item.roomId);
      // Format startsAt Date to string format compatible with datetime-local
      const date = new Date(item.startsAt);
      const formattedDateStr = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setStStartsAt(formattedDateStr);
      setStPrice(Number(item.price));
    }

    setIsModalOpen(true);
  };

  const handleMovieSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('title', movieTitle);
    formData.append('synopsis', movieSynopsis);
    formData.append('genre', movieGenre);
    formData.append('durationMinutes', String(movieDuration));
    formData.append('rating', movieRating);
    
    if (moviePosterFile) {
      formData.append('poster', moviePosterFile);
    } else if (!editingId) {
      setErrorMsg('El póster de la película es requerido para crear una nueva película.');
      return;
    }

    try {
      const url = editingId ? `${API_URL}/movies/${editingId}` : `${API_URL}/movies`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar la película.');
      }

      setIsModalOpen(false);
      loadTabData();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const url = editingId ? `${API_URL}/rooms/${editingId}` : `${API_URL}/rooms`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: roomName,
          rows: Number(roomRows),
          columns: Number(roomCols),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al guardar la sala.');
      }

      setIsModalOpen(false);
      loadTabData();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleShowtimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const url = editingId ? `${API_URL}/showtimes/${editingId}` : `${API_URL}/showtimes`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: stMovieId,
          roomId: stRoomId,
          startsAt: new Date(stStartsAt).toISOString(),
          price: Number(stPrice),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al programar la función.');
      }

      setIsModalOpen(false);
      loadTabData();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este registro?')) return;
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_URL}/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al eliminar el registro.');
      }

      loadTabData();
    } catch (err: any) {
      setErrorMsg(err.message);
      // Scroll to top of tab card to display error
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="container admin-wrapper">
      {/* Sidebar Navigation */}
      <div className="admin-sidebar">
        <button
          onClick={() => setActiveTab('movies')}
          className={`admin-sidebar-btn ${activeTab === 'movies' ? 'active' : ''}`}
        >
          <Film size={18} />
          Películas
        </button>
        <button
          onClick={() => setActiveTab('rooms')}
          className={`admin-sidebar-btn ${activeTab === 'rooms' ? 'active' : ''}`}
        >
          <DoorOpen size={18} />
          Salas
        </button>
        <button
          onClick={() => setActiveTab('showtimes')}
          className={`admin-sidebar-btn ${activeTab === 'showtimes' ? 'active' : ''}`}
        >
          <Calendar size={18} />
          Funciones
        </button>
      </div>

      {/* Main Admin Card */}
      <div className="admin-content-card">
        {errorMsg && (
          <div className="alert alert-danger" style={{ marginBottom: '24px' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="admin-header-row">
          <h2>
            Gestionar{' '}
            {activeTab === 'movies'
              ? 'Películas'
              : activeTab === 'rooms'
              ? 'Salas'
              : 'Funciones de Cine'}
          </h2>
          <button onClick={openCreateModal} className="btn btn-primary btn-sm">
            <Plus size={16} />
            Agregar Nuevo
          </button>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="table-responsive">
            {activeTab === 'movies' && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Póster</th>
                    <th>Título</th>
                    <th>Género</th>
                    <th>Duración</th>
                    <th>Clasificación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((m) => {
                    const posterSrc = m.posterUrl.startsWith('http')
                      ? m.posterUrl
                      : `${API_URL}${m.posterUrl}`;
                    return (
                      <tr key={m.id}>
                        <td>
                          <img
                            src={posterSrc}
                            alt={m.title}
                            style={{ width: '48px', height: '64px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                            }}
                          />
                        </td>
                        <td style={{ fontWeight: 'bold' }}>{m.title}</td>
                        <td>{m.genre}</td>
                        <td>{m.durationMinutes} min</td>
                        <td>{m.rating}</td>
                        <td>
                          <div className="actions-cell">
                            <button onClick={() => openEditModal(m)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                              <Edit3 size={15} />
                            </button>
                            <button onClick={() => handleDelete(m.id)} className="btn btn-danger btn-sm" style={{ padding: '6px', background: '#dc2626' }}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === 'rooms' && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Filas</th>
                    <th>Columnas</th>
                    <th>Capacidad de Asientos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 'bold' }}>{r.name}</td>
                      <td>{r.rows} (A-{String.fromCharCode(65 + r.rows - 1)})</td>
                      <td>{r.columns}</td>
                      <td>
                        <span className="reservation-seats-badge" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
                          {r.capacity} butacas
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button onClick={() => openEditModal(r)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                            <Edit3 size={15} />
                          </button>
                          <button onClick={() => handleDelete(r.id)} className="btn btn-danger btn-sm" style={{ padding: '6px', background: '#dc2626' }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'showtimes' && (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Película</th>
                    <th>Sala</th>
                    <th>Comienzo</th>
                    <th>Fin</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {showtimes.map((st) => {
                    const start = new Date(st.startsAt).toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    const end = new Date(st.endsAt).toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                    });
                    return (
                      <tr key={st.id}>
                        <td style={{ fontWeight: 'bold' }}>{st.movie?.title || 'Desconocida'}</td>
                        <td>{st.room?.name || 'Desconocida'}</td>
                        <td>{start}</td>
                        <td>{end}</td>
                        <td style={{ color: '#fbbf24', fontWeight: 'bold' }}>{Number(st.price).toFixed(2)} BOB</td>
                        <td>
                          <div className="actions-cell">
                            <button onClick={() => openEditModal(st)} className="btn btn-secondary btn-sm" style={{ padding: '6px' }}>
                              <Edit3 size={15} />
                            </button>
                            <button onClick={() => handleDelete(st.id)} className="btn btn-danger btn-sm" style={{ padding: '6px', background: '#dc2626' }}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* CRUD Overlay Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {editingId ? 'Editar' : 'Agregar'}{' '}
                {activeTab === 'movies'
                  ? 'Película'
                  : activeTab === 'rooms'
                  ? 'Sala'
                  : 'Función'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close">
                <X size={20} />
              </button>
            </div>

            {errorMsg && (
              <div className="alert alert-danger" style={{ marginBottom: '16px' }}>
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM — MOVIES */}
            {activeTab === 'movies' && (
              <form onSubmit={handleMovieSubmit}>
                <div className="form-group">
                  <label>Título de la Película</label>
                  <input
                    type="text"
                    className="form-control"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Sinopsis</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={movieSynopsis}
                    onChange={(e) => setMovieSynopsis(e.target.value)}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label>Género</label>
                    <select
                      className="form-control"
                      value={movieGenre}
                      onChange={(e) => setMovieGenre(e.target.value)}
                      required
                    >
                      <option value="ACTION">Acción</option>
                      <option value="SCI-FI">Ciencia Ficción</option>
                      <option value="DRAMA">Drama</option>
                      <option value="TERROR">Terror</option>
                      <option value="COMEDIA">Comedia</option>
                    </select>
                  </div>
                  <div>
                    <label>Clasificación</label>
                    <select
                      className="form-control"
                      value={movieRating}
                      onChange={(e) => setMovieRating(e.target.value)}
                      required
                    >
                      <option value="G">Apta Todo Público (G)</option>
                      <option value="PG">Sugerida Supervisión (PG)</option>
                      <option value="PG-13">Supervisión Fuerte (PG-13)</option>
                      <option value="R">Restringida Mayores (R)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Duración (en minutos)</label>
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    value={movieDuration}
                    onChange={(e) => setMovieDuration(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Póster de la Película (Imagen JPG/PNG)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setMoviePosterFile(e.target.files ? e.target.files[0] : null)}
                    required={!editingId}
                  />
                  {editingId && (
                    <span style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                      Dejar en blanco para mantener la imagen actual.
                    </span>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Guardar
                  </button>
                </div>
              </form>
            )}

            {/* FORM — ROOMS */}
            {activeTab === 'rooms' && (
              <form onSubmit={handleRoomSubmit}>
                <div className="form-group">
                  <label>Nombre de la Sala</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sala 3D Premium"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label>Filas (A-Z)</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={26}
                      value={roomRows}
                      onChange={(e) => setRoomRows(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <label>Columnas (1-50)</label>
                    <input
                      type="number"
                      className="form-control"
                      min={1}
                      max={50}
                      value={roomCols}
                      onChange={(e) => setRoomCols(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Guardar
                  </button>
                </div>
              </form>
            )}

            {/* FORM — SHOWTIMES */}
            {activeTab === 'showtimes' && (
              <form onSubmit={handleShowtimeSubmit}>
                <div className="form-group">
                  <label>Película</label>
                  <select
                    className="form-control"
                    value={stMovieId}
                    onChange={(e) => setStMovieId(e.target.value)}
                    required
                  >
                    {movies.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.title} ({m.durationMinutes} min)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Sala</label>
                  <select
                    className="form-control"
                    value={stRoomId}
                    onChange={(e) => setStRoomId(e.target.value)}
                    required
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.capacity} butacas)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Fecha y Hora de Inicio</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={stStartsAt}
                    onChange={(e) => setStStartsAt(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Precio de la Entrada (BOB)</label>
                  <input
                    type="number"
                    className="form-control"
                    min={0.01}
                    step={0.01}
                    value={stPrice}
                    onChange={(e) => setStPrice(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary btn-sm">
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Guardar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
