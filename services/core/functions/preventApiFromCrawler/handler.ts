import { applyHttpMiddlewares } from '../../libs/helpers';

const handler = () => {
  const defaultPayload = {
    statusCode: 200,
    body: 'User-agent: *\nDisallow: /',
    headers: {
      'Content-Type': 'text/plain',
    },
  };

  // Robots will be disallowed since they are probably crawling through the API domain
  return Promise.resolve(defaultPayload);
};

export const main = applyHttpMiddlewares(handler);
