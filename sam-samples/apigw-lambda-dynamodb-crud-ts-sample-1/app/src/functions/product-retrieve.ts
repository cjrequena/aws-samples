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

  const routeKey: string = `${event.requestContext.httpMethod} ${event.requestContext.resourcePath}`;
  console.log("event:", JSON.stringify(event, undefined, 2));
  console.log(`routeKey: ${routeKey}`);

  try {
    switch (routeKey) {
      case "GET /products/{id}":
        const id = event.pathParameters?.id;
        if (!id) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              message: "id is required",
            }),
          };
        }
        const product = await ProductService.getProductById(id);
        return {
          statusCode: 200,
          body: JSON.stringify(product)
        };
      case "GET /products":
        const products = await ProductService.getProducts();
        return {
          statusCode: 200,
          body: JSON.stringify(products)
        };
        break;
      default:
        throw new Error(`Unsupported route: "${routeKey}"`);
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};
