import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body: {"message": string} = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: `${body.message}`
    }
}