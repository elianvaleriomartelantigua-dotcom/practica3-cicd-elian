// Función pura para compartir la regla y probarla por separado.
function validarTitulo(valor) {
  if (typeof valor !== 'string' || !valor.trim()) return 'El título es obligatorio';
  if (valor.trim().length > 120) return 'El título admite hasta 120 caracteres';
  return null;
}
module.exports = { validarTitulo };
