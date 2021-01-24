const {Router} = require('express');
const Event = require('../models/Event');
const config = require('config');
const jwt = require('jsonwebtoken');
const {ResponseStatus} = require('../const');

const authMiddleware = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    request.user = jwt.verify(token, config.get('jwtSecret'));
    next();
  } catch {
    response.status(ResponseStatus.UNAUTHORIZED).json({message: 'Auth error'});
  }
};

const router = Router();

router.get('/', authMiddleware, async (request, response, next) => {
  const {userID} = request.user;

  const events = await Event.find({userID}).catch(next);
  response.json(events);
});

router.post('/', authMiddleware, async (request, response, next) => {
  const {userID} = request.user;
  const {type, city, date, options} = request.body;

  await new Event({type, city, date, options, userID}).save().catch(next);

  const events = await Event.find({userID}).catch(next);
  response.json(events);
});

router.put('/:id', authMiddleware, async (request, response, next) => {
  const {id} = request.params;
  const {userID} = request.user;
  const {type, city, date, options} = request.body;

  await Event.findByIdAndUpdate(id, {type, city, date, options, userID}).catch(next);

  const events = await Event.find({userID}).catch(next);
  response.json(events);
});

router.delete('/:id', authMiddleware, async (request, response, next) => {
  const {id} = request.params;
  const {userID} = request.user;

  await Event.findByIdAndDelete(id).catch(next);

  const events = await Event.find({userID}).catch(next);
  response.json(events);
});

module.exports = router;
