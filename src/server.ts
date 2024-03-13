import express from 'express'
import { NewWeaponStore } from './models/new_weapons';
import { new_weapons_routes } from './handlers/new_weapons';
import { users_routes } from './handlers/users';
import bodyParser from 'body-parser';
const app: express.Application = express();

app.use(bodyParser.json())
app.get('/', async (req, res) => {
    const store = new NewWeaponStore();
    const result = await store.index();
    return res.send(result);
})

new_weapons_routes(app);
users_routes(app);

app.listen(3000, () => {
    console.log('starting app on http://localhost:3000')
})

export default app;