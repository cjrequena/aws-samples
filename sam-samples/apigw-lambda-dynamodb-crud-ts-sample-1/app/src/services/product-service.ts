import { ProductRepository } from "../repository/product-repository";
import { Product } from "../models/product";

export class ProductService {
  static async createProduct(product: Product): Promise<Product> {
    try {
      return await ProductRepository.createProduct(product);
    } catch (error) {
      throw new Error("Service error creating product: " + error);
    }
  }

  static async getProducts(): Promise<Product[]> {
    try {
      return await ProductRepository.getProducts();
    } catch (error) {
      throw new Error("Service error getting products: " + error);
    }
  }

  static async getProductById(id: string): Promise<Product> {
    try {
      return await ProductRepository.getProductById(id);
    } catch (error) {
      throw new Error("Error getting product by id: " + error);
    }
  }

  static async updateProductById(
    id: string,
    product: Product
  ): Promise<Product> {
    try {
      product.id = id;
      return await ProductRepository.updateProductById(product);
    } catch (error) {
      throw new Error("Error updating product: " + error);
    }
  }

  static async deleteProductById(id: string): Promise<void> {
    try {
      await ProductRepository.deleteProductById(id);
    } catch (error) {
      throw new Error("Error deleting product: " + error);
    }
  }
}
