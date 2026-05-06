const GestionPermisos = () => {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Gestión de Permisos
      </h1>

      <p className="text-gray-600 text-sm">
        El administrador del software puede otorgar o revocar permisos a los
        administradores de hospital y configurar niveles de acceso.
      </p>

      <p className="text-gray-500 text-xs">
        Más adelante esta vista permitirá asociar roles y permisos específicos
        a cada cuenta administrativa, sin mostrar datos clínicos de pacientes.
      </p>
    </div>
  );
};

export { GestionPermisos };