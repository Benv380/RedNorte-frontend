const ListaEsperaGlobal = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Lista de Espera Global
      </h1>

      <p className="text-gray-600 text-sm">
        Visualización general de la lista de espera segmentada por especialidad
        y prioridad (ej. Oncología prioridad 1, Traumatología prioridad 4).
      </p>

      <p className="text-gray-500 text-xs">
        Más adelante aquí se consumirá el servicio de lista de espera para
        mostrar estadísticas y filas por categoría.
      </p>
    </div>
  );
};

export { ListaEsperaGlobal };