export class Pagination {
  static paginate<T>(pageNumber: number, pageSize: number, entitties: T[]) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return {
      entities: entitties.slice(startIndex, endIndex),
      totalPages: Math.ceil(entitties.length / pageSize),
    };
  }
}
