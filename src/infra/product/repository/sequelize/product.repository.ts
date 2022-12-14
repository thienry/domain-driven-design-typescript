import { Product } from '../../../../domain/product/product.entity'
import { ProductModel } from '../../../product/repository/sequelize/product.model'
import { IProductRepository } from '../../../../domain/product/product.repository.interface'

class ProductRepository implements IProductRepository {
  /**
   * @description Find all products
   * @returns Promise<Product[]>
   */
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map((product) => product.toJSON())
  }

  /**
   * @description Find product by id
   * @param item Product
   * @returns Promise<Product>
   */
  async update(item: Product): Promise<void> {
    await ProductModel.update({ name: item.name, price: item.price }, { where: { id: item.id } })
  }

  /**
   * @description Delete product by id
   * @param id Product id
   * @returns Promise<void>
   */
  async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } })
  }

  /**
   * @description Create product
   * @param product Product
   * @returns Promise<void>
   */
  async create(product: Product): Promise<void> {
    await ProductModel.create({ id: product.id, name: product.name, price: product.price })
  }

  /**
   * @description Find product by id
   * @param id Product id
   * @returns Promise<Product>
   */
  async findById(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })
    if (!productModel) return undefined
    const product = new Product(id, productModel.name, productModel.price)
    return product
  }
}

export { ProductRepository }
