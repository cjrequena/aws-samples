import DynamoDB from 'aws-sdk/clients/dynamodb';
export const dynamoClient = new DynamoDB.DocumentClient();
