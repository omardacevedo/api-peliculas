export function buildQueryOptions(query) {
  const page = Math.max(parseInt(query.page)||1,1);
  const limit = Math.min(Math.max(parseInt(query.limit)||10,1),100);
  return { skip: (page-1)*limit, limit, page, sort: query.sort || '-createdAt' };
}
