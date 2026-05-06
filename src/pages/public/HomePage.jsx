import { useNavigate } from 'react-router-dom';
import '../../styles/HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const secciones = [
    {
      titulo: 'Especialidades Médicas',
      subtitulo: 'Accede a una amplia red de especialistas en distintas áreas de la salud, desde cardiología hasta traumatología.',
      imagen: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
      inverso: false,
    },
    {
      titulo: 'Solicitudes En Línea',
      subtitulo: 'Ingresa tu solicitud de atención médica desde cualquier lugar y realiza un seguimiento de tu estado en tiempo real.',
      imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      inverso: true,
    },
    {
      titulo: 'Reasignación Automática',
      subtitulo: 'Cuando se cancela una cita, el sistema te notifica de inmediato y puedes tomar la hora disponible en segundos.',
      imagen: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80',
      inverso: false,
    },
    {
      titulo: 'Tu Información Siempre Disponible',
      subtitulo: 'Consulta tus citas, historial de solicitudes y datos personales desde el portal del paciente, disponible las 24 horas.',
      imagen: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
      inverso: true,
    },
  ];

  return (
    <div className='page'>

      <section className='hero'>
        <div className='heroBadge'>Servicio Público de Salud</div>
        <h1 className='heroTitle'>
          Gestión Inteligente de<br />
          <span className='heroTitleAccent'>Listas de Espera Hospitalarias</span>
        </h1>
        <p className='heroSub'>
          Plataforma digital de atención médica, diseñada para optimizar la atención al paciente
          y mantenerlo informado en todo momento.
        </p>
        <div className='heroBtns'>
          <button
            onClick={() => navigate('/Login')}
            className='btnPrimary'
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => navigate('/Register')}
            className='btnOutline'
          >
            Registrarse
          </button>
        </div>
      </section>

      {secciones.map((seccion, i) => (
        <section
          key={i}
          className={`seccion ${seccion.inverso ? 'seccionInverso' : ''}`}
        >
          <div className='seccionTexto'>
            <h2 className='seccionTitulo'>{seccion.titulo}</h2>
            <p className='seccionSub'>{seccion.subtitulo}</p>
          </div>
          <div className='seccionImagen'>
            <img
              src={seccion.imagen}
              alt={seccion.titulo}
              className='imagen'
            />
          </div>
        </section>
      ))}

      <footer className='footer'>
      </footer>
    </div>
  );
};