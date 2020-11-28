import { ApolloServer } from 'apollo-server-lambda'
import { schemas as typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: "/v1/graphql"
    }
});

export const handler: any = server.createHandler();