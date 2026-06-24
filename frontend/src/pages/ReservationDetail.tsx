import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ticket, Calendar, Armchair, ChevronRight, ArrowLeft, CheckCircle, Info } from 'lucide-react';

interface ReservationSeat {
  seatId: string;
  rowLabel: string;
  columnNumber: number;
  code: string;
  unitPrice: number;
}

interface Reservation {
  id: string;
  reservedAt: string;
  total: number;
  currency: string;
  showtime: {
    id: string;
    movieId: string;
    movieTitle: string;
    roomId: string;
    roomName: string;
    startsAt: string;
    endsAt: string;
    price: number;
    currency: string;
  };
  seats: ReservationSeat[];
}

export const ReservationDetail: React.FC = () => {
  const { reservationId } = useParams<{ reservationId: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token, user } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/my-reservations/${reservationId}` } });
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/reservations/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setReservation(data);
        } else {
          if (res.status === 404) {
            setError('La reserva seleccionada no existe o no pertenece a tu cuenta.');
          } else {
            setError('Ocurrió un error al cargar el ticket. Intenta de nuevo.');
          }
        }
      } catch (err) {
        console.error('Error fetching reservation details', err);
        setError('Error de conexión. Intente de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [reservationId, token, user, navigate, API_URL]);

  if (loading) {
    return <div className="spinner" style={{ marginTop: '80px' }}></div>;
  }

  if (error || !reservation) {
    return (
      <div className="container empty-state" style={{ marginTop: '80px' }}>
        <Ticket size={48} style={{ color: '#ef4444' }} />
        <p style={{ marginTop: '16px' }}>{error || 'No se pudo cargar el detalle de la reserva.'}</p>
        <Link to="/my-reservations" className="btn btn-secondary mt-4" style={{ width: 'auto' }}>
          Volver a Mis Reservas
        </Link>
      </div>
    );
  }

  const startsAtDate = new Date(reservation.showtime.startsAt);
  const formattedShowtimeDate = startsAtDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const reservedAtDate = new Date(reservation.reservedAt);
  const formattedReservedDate = reservedAtDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const seatCodes = reservation.seats.map((s) => s.code).sort().join(', ');

  return (
    <div className="container">
      {/* Breadcrumb */}
      <div className="flex-gap-sm mt-4" style={{ color: '#9ca3af', fontSize: '14px' }}>
        <Link to="/">Cartelera</Link>
        <ChevronRight size={14} />
        <Link to="/my-reservations">Mis Reservas</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#f3f4f6', fontWeight: 500 }}>Ticket Digital</span>
      </div>

      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/my-reservations" style={{ color: '#9ca3af', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ margin: 0 }}>Tu Ticket de Entrada</h1>
      </div>

      {/* Ticket Design Container */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px', marginBottom: '48px' }}>
        <div className="ticket-card" style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Top colored strip */}
          <div style={{
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
            height: '8px'
          }}></div>

          <div style={{ padding: '24px' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 'bold', fontSize: '14px' }}>
                <CheckCircle size={16} />
                <span>RESERVA CONFIRMADA</span>
              </div>
              <span style={{ color: '#6b7280', fontSize: '12px' }}>ID: {reservation.id.substring(0, 8).toUpperCase()}</span>
            </div>

            {/* Movie Title */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px', color: '#f3f4f6' }}>
              {reservation.showtime.movieTitle}
            </h2>

            <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '16px 0' }}></div>

            {/* Info items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={18} style={{ color: '#9ca3af' }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>FECHA Y HORA</div>
                  <div style={{ fontSize: '14px', color: '#e5e7eb', fontWeight: 500, textTransform: 'capitalize' }}>
                    {formattedShowtimeDate}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Armchair size={18} style={{ color: '#9ca3af' }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>SALA DE CINE</div>
                  <div style={{ fontSize: '14px', color: '#e5e7eb', fontWeight: 500 }}>
                    {reservation.showtime.roomName}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Ticket size={18} style={{ color: '#9ca3af' }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>BUTACAS ASIGNADAS</div>
                  <div style={{ fontSize: '16px', color: '#fbbf24', fontWeight: 'bold' }}>
                    {seatCodes}
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Cutout Line */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '24px 0',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: '-32px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#0b0f19', // matches page body background
                borderRight: '1px solid rgba(255, 255, 255, 0.1)'
              }}></div>
              <div style={{
                width: '100%',
                borderTop: '2px dashed rgba(255, 255, 255, 0.1)'
              }}></div>
              <div style={{
                position: 'absolute',
                right: '-32px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#0b0f19',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}></div>
            </div>

            {/* Pricing details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>FECHA DE COMPRA: {formattedReservedDate}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                  {reservation.seats.length} x {Number(reservation.showtime.price).toFixed(2)} BOB
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>TOTAL PAGADO</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>
                  {Number(reservation.total).toFixed(2)} {reservation.currency}
                </div>
              </div>
            </div>

            {/* Instructions info box */}
            <div style={{
              marginTop: '24px',
              padding: '12px 16px',
              background: 'rgba(251, 191, 36, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(251, 191, 36, 0.15)',
              display: 'flex',
              gap: '10px',
              alignItems: 'flex-start'
            }}>
              <Info size={16} style={{ color: '#fbbf24', marginTop: '2px', flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db', lineHeight: '1.4' }}>
                Presenta este ticket en tu teléfono móvil al ingresar a la sala. Los asientos son numerados, por favor respeta las asignaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetail;
