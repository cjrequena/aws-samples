import { ProductRepository } from "../repository/product-repository";
import { Product } from "../models/product";

export class ProductService {
  static async createProduct(product: Product): Promise<Product> {
    try {
      return await ProductRepository.save(product);
    } catch (error) {
      throw new Error("Service error creating product: " + error);
    }
  }

  static async getProducts(): Promise<Product[]> {
    try {
      return await ProductRepository.findAll();
    } catch (error) {
      throw new Error("Service error getting products: " + error);
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      return await ProductRepository.findById(id);
    } catch (error) {
      throw new Error("Service error getting product by id: " + error);
    }
  }

  static async updateProductById(
    id: string,
    product: Product
  ): Promise<Product> {
    try {
      product.id = id;
      return await ProductRepository.update(product);
    } catch (error) {
      throw new Error("Service error updating product: " + error);
    }
  }

  static async deleteProductById(id: string): Promise<void> {
    try {
      await ProductRepository.deleteById(id);
    } catch (error) {
      throw new Error("Service error deleting product: " + error);
    }
  }
}
