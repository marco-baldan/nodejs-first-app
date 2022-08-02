import { Router } from 'express';
import peopleRouter from './peopleRouter';

const router = Router();

router.use(peopleRouter);
router.get('/api/test', (req, res) => {
  res.json(getHealth()).send();
});
const getHealth = () => ({
  ok: true,
  message: 'Get started now!',
});

export default router;