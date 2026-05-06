const AdminSoftDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Panel Administrador del Software
      </h1>

      <p className="text-gray-600 text-sm">
        Este rol supervisa el flujo de agendamiento y la configuración del
        sistema, sin acceso a datos clínicos sensibles de pacientes.
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Ver métricas de uso del sistema.</li>
        <li>Revisar logs de agendamiento (sin datos personales).</li>
        <li>Acceder a configuración avanzada y permisos de administradores.</li>
      </ul>
    </div>
  );
};

export { AdminSoftDashboard };