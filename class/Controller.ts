import {Handler} from "express";
import {DocumentNode} from "graphql";
import { gql } from 'apollo-server-lambda'

export interface Methods {
    GET: Handler,
    POST: Handler,
    PUT: Handler,
    DELETE: Handler,
}

export class Controller {
    Name: string
    Path: string
    Methods: Methods
    Schema: DocumentNode
    Resolvers: Object

    constructor(defaults) {
        if (!defaults['name']) throw new Error(`Controller class needs a name!`);
        if (!defaults['path']) throw new Error(`Controller class needs a path!`);
        if (!defaults['methods']) throw new Error(`Controller class needs methods!`);
        if (!defaults['schema']) throw new Error(`Controller class needs a schema!`);
        if (!defaults['resolvers']) throw new Error(`Controller class needs resolvers!`);

        this.Name = defaults['name'];
        this.Path = defaults['path'];
        this.Methods = defaults['methods'];
        this.Schema = defaults['schema'];
        this.Resolvers = defaults['resolvers'];
    }
}