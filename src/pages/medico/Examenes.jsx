const Examenes = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Órdenes y Resultados de Exámenes
      </h1>

      <p className="text-gray-600 text-sm">
        Aquí el médico puede solicitar nuevos exámenes, revisar el estado de
        los ya solicitados y ver resultados.
      </p>

      <p className="text-gray-500 text-xs">
        Luego conectarás esta vista con el backend para listar exámenes por
        cita y actualizar su estado.
      </p>
    </div>
  );
};

export { Examenes };