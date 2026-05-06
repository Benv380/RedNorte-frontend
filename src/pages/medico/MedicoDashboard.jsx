const MedicoDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Panel del Médico
      </h1>

      <p className="text-gray-600 text-sm">
        Aquí el médico ve sus citas asignadas, pacientes en lista de espera y
        accesos rápidos a historia clínica, diagnósticos y exámenes.
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Visualizar citas del día.</li>
        <li>Acceder a ficha clínica del paciente.</li>
        <li>Revisar prioridades en lista de espera.</li>
      </ul>
    </div>
  );
};

export { MedicoDashboard };