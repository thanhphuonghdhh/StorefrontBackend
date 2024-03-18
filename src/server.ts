import express from 'express'
import { users_routes } from './handlers/users';
import bodyParser from 'body-parser';
const app: express.Application = express();

app.use(bodyParser.json())

app.get('/', async (_req, res) => {
    return res.send("Welcome to Storefront API");
})

users_routes(app);

app.listen(3000, () => {
    console.log('starting app on http://localhost:3000')
})

export default app;