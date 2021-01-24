const {Router} = require('express');
const {ResponseStatus} = require('../const');
const EventType = require('../models/EventType');

const router = Router();

router.get('/', async (_, response, next) => {
  const eventTypes = await EventType.find().catch(next);
  response.json(eventTypes);
});

module.exports = router;
