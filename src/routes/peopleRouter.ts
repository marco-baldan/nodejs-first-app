import { NextFunction, Request, Response, Router } from 'express';
import database from '../database';

const peopleRouter = Router();
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  if (token !== 'NotSecureAtAll') {
    res.status(401).send('Not Authorised');
    return;
  }
  next();
};

peopleRouter.get('/users', authMiddleware, (req, res) => {
  res.send(database.users);
});
peopleRouter.get('/uploads', (req, res) => {
  res.send(database.uploads);
});

peopleRouter.post('/users', (req, res) => {
  const playerId = database.users[database.users.length - 1].playerId + 1;
  const { name, team } = req.body;
  console.dir(req, { depth: null });
  database.users.push({
    name,
    playerId,
    team,
  });
  const newUser = database.users[database.users.length - 1];
  res.send(newUser);
});

peopleRouter.put('/users/:playerId/', (req, res) => {
  const { playerId } = req.params;
  const parsedplayerId = parseInt(playerId);


  const userIndex = database.users.findIndex(
    (element) => element.playerId === parsedplayerId
  );


  const name = req.body.name ? req.body.name : database.users[userIndex].name;


  const team = req.body.team
    ? req.body.team
    : database.users[userIndex].team;


  database.users[userIndex] = {
    name,
    playerId: parsedplayerId,
    team,
  };

  res.send(database.users[userIndex]);
  console.log(database.users[userIndex]);
});

export default peopleRouter;