import {Controller} from '../class/Controller'
import {Request, Response} from 'express'
import {gql} from 'apollo-server-lambda'

export const controllers = [
    new Controller({
        name: 'Examples',
        path: '/examples',
        methods: {
            GET: (request: Request, response: Response) => {
                response.send('GET');
            },
            POST: (request: Request, response: Response) => {
                response.send('POST');
            },
            PUT: (request: Request, response: Response) => {
                response.send('PUT');
            },
            DELETE: (request: Request, response: Response) => {
                response.send('DELETE');
            },
        },
        schema: gql`
            extend type Query {
                Examples: [Example]
            }
            type Example {
                id: Int!
            }
        `,
        resolvers: {
            Query: {
                Examples: (parent, args, context, info) => [{id: 1}, {id: 2}]
            }
        }
    }),
    new Controller({
        name: 'Example',
        path: '/example/:id',
        methods: {
            GET: (request: Request, response: Response) => {
                response.send('GET: ' + request.params.id);
            }
        },
        schema: gql`
            extend type Query {
                Example(id: Int!): Example
            }
        `,
        resolvers: {
            Query: {
                Example: (parent, args, context, info) => ({id: args.id})
            }
        }
    })
];