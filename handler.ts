import serverless from 'serverless-http'
import express, { Request, Response } from 'express'
import { router } from './router'

const app = express();
app.use(router)
app.use('*', (request: Request, response: Response) => response.status(404).send('Not found'));

export const handler: serverless.Handler = serverless(app);