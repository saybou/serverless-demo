import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const handler = async (
  event: APIGatewayProxyEvent & { pathParameters: { name: string } },
): Promise<APIGatewayProxyResult> => {
  const { name } = event.pathParameters;

  await new Promise(resolve => {
    resolve('');
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello World ${name} ! Your function executed successfully!`,
        input: event,
      },
      null,
      2,
    ),
  };
};

export const main = handler;
