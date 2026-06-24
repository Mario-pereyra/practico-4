import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, Film, Calendar, Armchair, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

interface Seat {
  id: string;
  code: string;
  rowLabel: string;
  columnNumber: number;
  isReserved: boolean;
}

interface Showtime {
  id: string;
  startsAt: string;
  price: number;
  movie: {
    title: string;
  };
  room: {
    name: string;
  };
}

export const SeatSelection: React.FC = () => {
  const { showtimeId } = useParams<{ showtimeId: string }>();
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { token, user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/showtimes/${showtimeId}/seats` } });
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch seat map (includes showtime details)
        const seatsRes = await fetch(`${API_URL}/showtimes/${showtimeId}/seats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (seatsRes.ok) {
          const seatMapData = await seatsRes.json();
          setShowtime({
            id: seatMapData.showtimeId,
            startsAt: seatMapData.startsAt,
            price: seatMapData.price,
            movie: seatMapData.movie,
            room: seatMapData.room,
          });
          const mappedSeats = seatMapData.seats.map((s: any) => ({
            id: s.id,
            code: s.code,
            rowLabel: s.rowLabel,
            columnNumber: s.columnNumber,
            isReserved: s.status === 'RESERVED',
          }));
          setSeats(mappedSeats);
        } else {
          setShowtime(null);
          setSeats([]);
        }
      } catch (err) {
        console.error('Error fetching seat selection data', err);
        setShowtime(null);
        setSeats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showtimeId, user, token, navigate, API_URL]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isReserved) return;

    const isSelected = selectedSeats.some((s) => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirmReservation = async () => {
    if (selectedSeats.length === 0) return;
    setBooking(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          showtimeId,
          seatIds: selectedSeats.map((s) => s.id),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Error al procesar la reserva. Intenta de nuevo.');
      }

      setSuccess(true);
      // Wait 2 seconds then navigate to My Reservations
      setTimeout(() => {
        navigate('/my-reservations');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      // Refresh seat map to show updated reserved seats in case of conflict
      try {
        const seatsRes = await fetch(`${API_URL}/showtimes/${showtimeId}/seats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (seatsRes.ok) {
          const seatMapData = await seatsRes.json();
          const mappedSeats = seatMapData.seats.map((s: any) => ({
            id: s.id,
            code: s.code,
            rowLabel: s.rowLabel,
            columnNumber: s.columnNumber,
            isReserved: s.status === 'RESERVED',
          }));
          setSeats(mappedSeats);
          
          // Deselect seats that are now reserved
          const reservedIds = new Set(mappedSeats.filter((s: any) => s.isReserved).map((s: any) => s.id));
          setSelectedSeats(selectedSeats.filter(s => !reservedIds.has(s.id)));
        }
      } catch (refreshErr) {
        console.error('Error refreshing seats', refreshErr);
      }
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <div className="spinner" style={{ marginTop: '80px' }}></div>;
  }

  if (!showtime) {
    return (
      <div className="container empty-state" style={{ marginTop: '80px' }}>
        <Film size={48} />
        <p>No se pudo cargar la función seleccionada.</p>
        <Link to="/" className="btn btn-secondary mt-4">
          Volver a Cartelera
        </Link>
      </div>
    );
  }

  // Group seats by row
  const rowsMap: { [key: string]: Seat[] } = {};
  seats.forEach((seat) => {
    if (!rowsMap[seat.rowLabel]) {
      rowsMap[seat.rowLabel] = [];
    }
    rowsMap[seat.rowLabel].push(seat);
  });

  const sortedRowKeys = Object.keys(rowsMap).sort();
  const totalPrice = selectedSeats.length * Number(showtime.price);

  const startsAtDate = new Date(showtime.startsAt);
  const formattedDate = startsAtDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedTime = startsAtDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="flex-gap-sm mt-4" style={{ color: '#9ca3af', fontSize: '14px' }}>
        <Link to="/">Cartelera</Link>
        <ChevronRight size={14} />
        <span>Detalles</span>
        <ChevronRight size={14} />
        <span style={{ color: '#f3f4f6', fontWeight: 500 }}>Selección de Asientos</span>
      </div>

      {success && (
        <div className="alert alert-success mt-4">
          <CheckCircle size={20} />
          <span>¡Reserva realizada con éxito! Redireccionando a tu historial...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="seat-selection-wrapper">
        {/* Seat Map Column */}
        <div className="seat-map-container">
          <div className="cinema-screen-container">
            <div className="cinema-screen"></div>
            <div className="cinema-screen-label">PANTALLA</div>
          </div>

          <div className="seats-grid-scroll">
            <div className="seats-layout" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {sortedRowKeys.map((rowLabel) => (
                <div key={rowLabel} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '24px', fontWeight: 'bold', color: '#9ca3af', fontSize: '14px' }}>
                    {rowLabel}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {rowsMap[rowLabel]
                      .sort((a, b) => a.columnNumber - b.columnNumber)
                      .map((seat) => {
                        const isSelected = selectedSeats.some((s) => s.id === seat.id);
                        let seatClass = 'available';
                        if (seat.isReserved) seatClass = 'reserved';
                        else if (isSelected) seatClass = 'selected';

                        return (
                          <button
                            key={seat.id}
                            className={`seat ${seatClass}`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={seat.isReserved}
                            title={`Asiento ${seat.code}`}
                          >
                            {seat.columnNumber}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Disponible</span>
            </div>
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Seleccionado</span>
            </div>
            <div className="legend-item">
              <div className="legend-color reserved"></div>
              <span>Ocupado</span>
            </div>
          </div>
        </div>

        {/* Checkout Summary Column */}
        <div className="checkout-card">
          <h3>Resumen de Reserva</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div className="flex-gap-sm" style={{ color: '#fbbf24', fontWeight: 600 }}>
              <Film size={18} />
              <span>{showtime.movie.title}</span>
            </div>
            <div className="flex-gap-sm" style={{ color: '#9ca3af', fontSize: '14px' }}>
              <Calendar size={16} />
              <span>{formattedDate} — {formattedTime}</span>
            </div>
            <div className="flex-gap-sm" style={{ color: '#9ca3af', fontSize: '14px' }}>
              <Armchair size={16} />
              <span>{showtime.room.name}</span>
            </div>
          </div>

          <div className="details-divider"></div>

          <div className="checkout-row">
            <span className="checkout-label">Asientos seleccionados:</span>
            <span className="checkout-value">
              {selectedSeats.length > 0
                ? selectedSeats.map((s) => s.code).join(', ')
                : 'Ninguno'}
            </span>
          </div>

          <div className="checkout-row">
            <span className="checkout-label">Precio unitario:</span>
            <span className="checkout-value">{Number(showtime.price).toFixed(2)} BOB</span>
          </div>

          <div className="checkout-row">
            <span className="checkout-label">Cantidad de entradas:</span>
            <span className="checkout-value">{selectedSeats.length}</span>
          </div>

          <div className="details-divider"></div>

          <div className="checkout-row" style={{ alignItems: 'center' }}>
            <span className="checkout-label" style={{ fontSize: '16px', fontWeight: 'bold' }}>Total a pagar:</span>
            <span className="checkout-value price">{totalPrice.toFixed(2)} BOB</span>
          </div>

          <button
            onClick={handleConfirmReservation}
            className="btn btn-primary mt-4"
            disabled={selectedSeats.length === 0 || booking || success}
          >
            {booking ? (
              <span className="spinner" style={{ width: '20px', height: '20px', margin: 0 }}></span>
            ) : (
              <>
                <Ticket size={18} />
                Confirmar Reserva
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SeatSelection;
