import { dynamoClient } from "../db/dynamodb-client";
import { Product } from "../models/product";
import { generate } from "short-uuid";

export class ProductRepository {

  static async save(product: Product): Promise<Product> {
    try {
      const tableName = process.env.TABLE_NAME ?? "";
      product.id = generate();
      await dynamoClient
        .put({
          TableName: tableName,
          Item: product,
        })
        .promise();
      return product;
    } catch (error) {
      throw new Error("Repository error creating product: " + error);
    }
  }

  static async findAll(): Promise<Product[]> {
    try {
      const tableName = process.env.TABLE_NAME ?? "";
      const response = await dynamoClient
        .scan({
          TableName: tableName,
        })
        .promise();

      return response.Items as Product[];
    } catch (error) {
      throw new Error("Repository error getting products: " + error);
    }
  }

  static async findById(id: string): Promise<Product> {
    try {
      const tableName = process.env.TABLE_NAME ?? "";
      const response = await dynamoClient
        .get({
          TableName: tableName,
          Key: {
            id,
          },
        })
        .promise();
      return response.Item as Product;
    } catch (error) {
      throw new Error("Repository error getting product by id: " + error);
    }
  }

  static async update(product: Product): Promise<Product> {
    try {
      const tableName = process.env.TABLE_NAME ?? "";
      await dynamoClient
        .update({
          TableName: tableName,
          Key: {
            id: product.id,
          },
          UpdateExpression:
            "set #name = :name, #price = :price, #description = :description",
          ExpressionAttributeNames: {
            "#name": "name",
            "#price": "price",
            "#description": "description",
          },
          ExpressionAttributeValues: {
            ":name": product.name,
            ":price": product.price,
            ":description": product.description,
          },
        })
        .promise();
      return product;
    } catch (error) {
      throw new Error("Repository error updating product: " + error);
    }
  }

  static async deleteById(id: string): Promise<void> {
    try {
      const tableName = process.env.TABLE_NAME ?? "";
      await dynamoClient
        .delete({
          TableName: tableName,
          Key: {
            id,
          },
        })
        .promise();
    } catch (error) {
      throw new Error("Repository error deleting product: " + error);
    }
  }
}
