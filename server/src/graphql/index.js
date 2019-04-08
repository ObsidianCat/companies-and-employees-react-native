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
    //Place for error logging
    console.log(error);

    //just basic example of removing potentially unsafe/revealing internal implementation message from production users
    if(process.env.prod){
      return 'Internal server error';
    }

    return error;
  },
});


