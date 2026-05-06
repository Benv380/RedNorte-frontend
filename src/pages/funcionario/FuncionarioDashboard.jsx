const FuncionarioDashboard = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Panel de Funcionario
      </h1>

      <p className="text-gray-600 text-sm">
        Aquí el funcionario puede ver un resumen de agenda, horas reasignadas,
        cancelaciones y estado general de la lista de espera.
      </p>

      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        <li>Contactar al paciente.</li>
        <li>Agendar una nueva hora.</li>
        <li>Cancelar o reasignar una hora.</li>
        <li>Visualizar ficha del paciente en modo solo lectura.</li>
      </ul>
    </div>
  );
};

export { FuncionarioDashboard };