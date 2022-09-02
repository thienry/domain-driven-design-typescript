import { v4 as uuid } from 'uuid'

import { Product } from './product.entity'
import { ProductB } from './product-b.entity'
import { IProduct } from './product.interface'

class ProductFactory {
  static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case 'a':
        return new Product(uuid(), name, price)
      case 'b':
        return new ProductB(uuid(), name, price)
      default:
        throw new Error('Product type unsupported!')
    }
  }
}

export { ProductFactory }
