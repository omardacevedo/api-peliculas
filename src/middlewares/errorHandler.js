export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 11000) return res.status(409).json({ message: 'Duplicado', detail: err.keyValue});
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Error servidor' });
}
