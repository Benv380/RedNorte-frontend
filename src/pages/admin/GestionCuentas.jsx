const GestionCuentas = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Gestión de Cuentas
      </h1>

      <p className="text-gray-600 text-sm">
        El administrador del hospital puede habilitar o deshabilitar cuentas de
        médicos, funcionarios y pacientes según requerimientos.
      </p>

      <p className="text-gray-500 text-xs">
        Aquí luego tendrás una tabla con usuarios, su rol, estado (activo /
        inactivo) y acciones para cambiarlo.
      </p>
    </div>
  );
};

export { GestionCuentas };