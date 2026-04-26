// src/components/pacientes/PacienteDetail.jsx
export const PacienteDetail = ({ paciente, onCerrar }) => {
  if (!paciente) return null;

  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
      <div className='flex justify-between items-start mb-6'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center'>
            <span className='text-2xl font-bold text-blue-600'>
              {paciente.nombre?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>
              {paciente.nombre} {paciente.apellido}
            </h2>
            <p className='text-sm text-gray-500'>{paciente.rut}</p>
          </div>
        </div>
        {onCerrar && (
          <button
            onClick={onCerrar}
            className='text-gray-400 hover:text-gray-600 text-xl font-bold'
          >
            ✕
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-500 mb-1'>
            Email
          </label>
          <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
            {paciente.email}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-500 mb-1'>
            Teléfono
          </label>
          <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
            {paciente.telefono}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-500 mb-1'>
            RUT
          </label>
          <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
            {paciente.rut}
          </p>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-500 mb-1'>
            Fecha de Nacimiento
          </label>
          <p className='text-gray-800 bg-gray-50 px-4 py-2 rounded-lg'>
            {paciente.fechaNacimiento || 'No registrado'}
          </p>
        </div>
      </div>
    </div>
  );
};