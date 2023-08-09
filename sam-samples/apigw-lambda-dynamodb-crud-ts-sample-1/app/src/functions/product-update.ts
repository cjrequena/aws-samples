import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

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
      case "POST /products":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "CALLED CREATE",
          }),
        };
        break;
      case "GET /products/{id}":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "CALLED RETRIEVE BY ID",
          }),
        };
        break;
      case "GET /products":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "CALLED RETRIEVE ALL",
          }),
        };
        break;
      case "DELETE /products/{id}":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "CALLED DELETE",
          }),
        };
        break;

      case "PUT /products/{id}":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "CALLED UPDATE",
          }),
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
