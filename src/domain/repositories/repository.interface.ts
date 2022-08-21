interface IRepository<T> {
  create(item: T): Promise<void>
  findAll(): Promise<T[]>
  findById(id: string): Promise<T>
  update(item: T): Promise<void>
  delete(id: string): Promise<void>
}

export { IRepository }
