class OrderItem {
  constructor(private id: string, private name: string, private price: number) {}

  toString() {
    return `${this.name} (${this.price})`
  }
}

export { OrderItem }
