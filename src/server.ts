import express from 'express'
import { NewWeaponStore } from './models/new_weapons';
const app: express.Application = express();

app.get('/', async (req, res) => {
    const store = new NewWeaponStore();
    const result = await store.index();
    return res.send(result);
})

app.listen(3000, () => {
    console.log('starting app on http://localhost:3000')
})

export default app;