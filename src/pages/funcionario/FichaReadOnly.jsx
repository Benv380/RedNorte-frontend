const FichaReadOnly = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Ficha del Paciente (solo lectura)
      </h1>

      <p className="text-gray-600 text-sm">
        El funcionario puede ver datos de identificación y contacto del
        paciente, pero no puede ver diagnósticos ni información clínica
        sensible.
      </p>

      <p className="text-gray-500 text-xs">
        Aquí luego mostrarás datos como nombre, RUT, teléfono, dirección, sin
        diagnósticos ni resultados de exámenes.
      </p>
    </div>
  );
};

export { FichaReadOnly };