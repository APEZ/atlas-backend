import { Router } from "express";
import fs from 'fs'
import {Controller} from "./class/Controller";

const addRoute = (router, route: string, methods) => {
    if (methods.GET) router.get(route, methods.GET);
    if (methods.POST) router.post(route, methods.POST);
    if (methods.PUT) router.put(route, methods.PUT);
    if (methods.DELETE) router.delete(route, methods.DELETE);
};

export const getRouter = () => {
    const router = Router();
    for (const file of fs.readdirSync(__dirname + '/controllers/')) {
        const controllers: Controller[] = require(__dirname + '/controllers/' + file).controllers;

        for (const controller of controllers)
            if (controller.Path && controller.Methods) addRoute(router, controller.Path, controller.Methods);
    }
    return router;
};

export const router: Router = getRouter();


