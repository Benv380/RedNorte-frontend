// src/components/pacientes/PacienteCard.jsx
export const PacienteCard = ({ paciente, onEliminar }) => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow'>
      <div className='flex items-center gap-4 mb-4'>
        <div className='w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center'>
          <span className='text-lg font-bold text-blue-600'>
            {paciente.nombre?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className='font-semibold text-gray-800'>
            {paciente.nombre} {paciente.apellido}
          </h3>
          <p className='text-sm text-gray-500'>{paciente.rut}</p>
        </div>
      </div>
      <div className='space-y-2 text-sm text-gray-600'>
        <p>📧 {paciente.email}</p>
        <p>📞 {paciente.telefono}</p>
      </div>
      {onEliminar && (
        <button
          onClick={() => onEliminar(paciente.id)}
          className='mt-4 text-red-500 hover:text-red-700 text-sm font-medium'
        >
          Eliminar
        </button>
      )}
    </div>
  );
};