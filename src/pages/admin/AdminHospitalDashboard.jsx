const AdminHospitalDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Panel Administrador del Hospital
      </h1>

      <p className="text-gray-600 text-sm">
        Vista general del hospital: métricas de confirmación, cancelación y
        reasignación de horas, además del estado de la lista de espera.
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Métricas globales de agenda.</li>
        <li>Lista de espera por especialidad y prioridad.</li>
        <li>Acceso a gestión de cuentas de médicos, funcionarios y pacientes.</li>
      </ul>
    </div>
  );
};

export { AdminHospitalDashboard };