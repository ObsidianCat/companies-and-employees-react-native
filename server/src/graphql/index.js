import { ApolloServer } from 'apollo-server-koa';

import schema from './schema';

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    return {
      ctx
    };
  },
  formatError: error => {
    //Can send it to some error tracking system (for example Sentry) here
    console.log(error);

    //just basic example of removing potentially unsafe/revealing internal implementation message from production
    if(process.env.prod){
      return 'Internal server error';
    }

    return error;
  },
});


