import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ProductService } from "../services/product-service";
import { Product } from "../models/product";

const router = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const routeKey: string = `${event.requestContext.httpMethod} ${event.requestContext.resourcePath}`;
  switch (routeKey) {
    case "POST /products":
      return createProduct(event);
      break;
    case "GET /products":
      return retrieveProducts(event);
      break;
    case "GET /products/{id}":
      return retrieveProductById(event);
      break;
    case "PUT /products/{id}":
      return updateProductById(event);
      break;
    case "DELETE /products/{id}":
      return deleteProductById(event);
      break;
    default:
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Method/Path not found",
        }),
      };
  }
};

const createProduct = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("event:", JSON.stringify(event, undefined, 2));
  const newProduct: Product = JSON.parse(event.body as string);
  const product = await ProductService.createProduct(newProduct);
  return {
    statusCode: 201,
    body: JSON.stringify(product),
  };
};

const retrieveProducts = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const products = await ProductService.getProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};

const retrieveProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
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
    body: JSON.stringify(product),
  };
};

const updateProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is required",
      }),
    };
  }
  const updatedProduct: Product = JSON.parse(event.body as string);
  const product = await ProductService.updateProductById(id, updatedProduct);
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};

const deleteProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("event:", JSON.stringify(event, undefined, 2));
  const id = event.pathParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "id is required",
      }),
    };
  }
  await ProductService.deleteProductById(id);
  return {
    statusCode: 204,
    body: "Product deleted",
  };
};

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("event:", JSON.stringify(event, undefined, 2));
  try {
    return router(event);
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
