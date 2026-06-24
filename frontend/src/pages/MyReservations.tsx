import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, Armchair, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReservationSeat {
  id: string;
  unitPrice: number;
  seat: {
    id: string;
    code: string;
  };
}

interface Reservation {
  id: string;
  reservedAt: string;
  total: number;
  currency: string;
  showtime: {
    startsAt: string;
    movie: {
      title: string;
      posterUrl: string;
    };
    room: {
      name: string;
    };
  };
  details: ReservationSeat[];
}

export const MyReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchReservations = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/reservations/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : (data.items || []);
          setReservations(items);
        }
      } catch (err) {
        console.error('Error fetching reservations', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token, API_URL]);

  if (loading) {
    return <div className="spinner" style={{ marginTop: '80px' }}></div>;
  }

  return (
    <div className="container reservations-section">
      {/* Breadcrumb */}
      <div className="flex-gap-sm mt-4" style={{ color: '#9ca3af', fontSize: '14px' }}>
        <Link to="/">Cartelera</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#f3f4f6', fontWeight: 500 }}>Mis Reservas</span>
      </div>

      <h1 style={{ marginTop: '24px' }}>Mis Compras e Historial</h1>

      {reservations.length === 0 ? (
        <div className="empty-state" style={{ background: '#131a26', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Ticket size={48} />
          <p>Aún no has realizado ninguna reserva de cine.</p>
          <Link to="/" className="btn btn-primary mt-4" style={{ width: 'auto' }}>
            Explorar Cartelera
          </Link>
        </div>
      ) : (
        <div className="reservation-list">
          {reservations.map((res) => {
            const startsAtDate = new Date(res.showtime.startsAt);
            const formattedShowtimeDate = startsAtDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            });

            const reservedAtDate = new Date(res.reservedAt);
            const formattedReservedDate = reservedAtDate.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            const seatCodes = res.details.map((d) => d.seat.code).join(', ');
            const posterSrc = res.showtime.movie.posterUrl.startsWith('http')
              ? res.showtime.movie.posterUrl
              : `${API_URL}${res.showtime.movie.posterUrl}`;

            return (
              <div key={res.id} className="reservation-item">
                <div>
                  <img
                    src={posterSrc}
                    className="reservation-movie-poster"
                    alt={res.showtime.movie.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                    }}
                  />
                </div>

                <div className="reservation-details">
                  <h3 className="reservation-movie-title">{res.showtime.movie.title}</h3>
                  
                  <div className="reservation-info-row">
                    <span className="flex-gap-sm">
                      <Calendar size={14} />
                      {formattedShowtimeDate}
                    </span>
                    <span className="flex-gap-sm">
                      <Armchair size={14} />
                      {res.showtime.room.name}
                    </span>
                  </div>

                  <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span className="reservation-seats-badge" style={{ alignSelf: 'flex-start' }}>
                      Butacas: {seatCodes}
                    </span>
                    <Link to={`/my-reservations/${res.id}`} style={{ color: '#fbbf24', fontSize: '13px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      Ver Ticket Digital <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                <div className="reservation-cost">
                  <span className="reservation-total">
                    {Number(res.total).toFixed(2)} {res.currency}
                  </span>
                  <span className="reservation-date">
                    Compra: {formattedReservedDate}
                  </span>
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>
                    ID: {res.id.substring(0, 8)}...
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default MyReservations;
