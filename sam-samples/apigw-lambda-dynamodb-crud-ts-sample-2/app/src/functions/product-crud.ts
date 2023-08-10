import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { AwsRequestContext, AwsFunctionRouter } from 'aws-rest-api-router';
const { v4: uuidv4 } = require('uuid');

import { ProductService } from "../services/product-service";
import { Product } from "../models/product";

const productService = new ProductService();

export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {

  console.log("***********************************************\n");
  console.log('Received event:', JSON.stringify(event, null, 2));
  return {
    statusCode: 201,
    body: JSON.stringify("Hello")
  };
};
