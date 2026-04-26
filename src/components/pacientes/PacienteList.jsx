// src/components/pacientes/PacienteList.jsx
import { PacienteCard } from './PacienteCard';

export const PacienteList = ({ pacientes, onEliminar }) => {
  if (!pacientes || pacientes.length === 0) {
    return (
      <div className='bg-white rounded-xl shadow-sm p-8 text-center text-gray-500'>
        No hay pacientes registrados
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {pacientes.map((paciente) => (
        <PacienteCard
          key={paciente.id}
          paciente={paciente}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
};