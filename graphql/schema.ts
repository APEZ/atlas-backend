import { DocumentNode } from 'graphql'
import fs from "fs";
import {Controller} from "../class/Controller";
import { gql } from 'apollo-server-lambda'

const defaultSchema = gql`
    type Query {
        default: Boolean!
    }
    type Mutation {
        default(value: Boolean): Boolean
    }
`;

const getSchemas = () => {
    const listOfSchema: DocumentNode[] = [ defaultSchema ];
    for (const file of fs.readdirSync(__dirname + '/../controllers/')) {
        const controllers: Controller[] = require(__dirname + '/../controllers/' + file).controllers;

        for (const controller of controllers)
            if (controller.Schema) listOfSchema.push(controller.Schema);
    }
    return listOfSchema;
}

export const schemas: DocumentNode[] = getSchemas();