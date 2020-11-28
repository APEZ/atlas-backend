import fs from "fs";
import {Controller} from "../class/Controller";

const defaultResolvers = {
    Query: {
        default: () => true
    },
    Mutation: {
        default: (_, { value }, { dataSources }) => value
    }
}

const getResolvers = () => {
    const listOfResolvers = defaultResolvers;
    for (const file of fs.readdirSync(__dirname + '/../controllers/')) {
        const controllers: Controller[] = require(__dirname + '/../controllers/' + file).controllers;

        for (const controller of controllers)
            if (controller.Resolvers) {
                for(const key of ['Query', 'Mutation']) {
                    if (listOfResolvers[key] && controller.Resolvers[key]) {
                        for (const resolver in controller.Resolvers[key])
                            listOfResolvers[key][resolver] = controller.Resolvers[key][resolver];

                        delete controller.Resolvers[key];
                    } else if (!listOfResolvers[key] && controller.Resolvers[key])
                        listOfResolvers[key] = controller.Resolvers[key];
                }

                for(const resolver in controller.Resolvers)
                    listOfResolvers[resolver] = controller.Resolvers[resolver];
            }
    }
    return listOfResolvers;
}

export const resolvers = getResolvers();