import { Router } from 'express';
import authRoute from './auth.route.js';

const router = Router();
const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
];

routes.forEach(({ path, route }) => router.use(path, route));
router.use('*', (req, res) => res.send('404 Not Found!'));

export default router;
