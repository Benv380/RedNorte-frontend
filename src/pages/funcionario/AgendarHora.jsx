const AgendarHora = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Agendar / Reasignar Hora
      </h1>

      <p className="text-gray-600 text-sm">
        Pantalla donde el funcionario puede registrar una nueva hora o
        reasignar una cita existente para un paciente.
      </p>

      <p className="text-gray-500 text-xs">
        Más adelante aquí conectarás el formulario con el backend para crear o
        actualizar citas.
      </p>
    </div>
  );
};

export { AgendarHora };