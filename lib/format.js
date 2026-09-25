// Las fechas del back vienen en UTC (ej. "2019-07-26T00:00:00.000Z"),
// así que se formatean en UTC para no correrse un día.
export function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('es-CO', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
