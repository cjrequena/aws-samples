import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ProductService } from "../services/product-service";
import { Product } from "../models/product";
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("event:", JSON.stringify(event, undefined, 2));
  const newProduct: Product = JSON.parse(event.body as string);
  const product = await ProductService.createProduct(newProduct);
  return {
    statusCode: 201,
    body: JSON.stringify(product)
  };
};
