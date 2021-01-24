const {Router} = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {ResponseStatus} = require('../const');

const router = Router();

router.post('/registration', async (request, response, next) => {
  const {email, password} = request.body;

  const existingUser = await User.findOne({email}).catch(next);
  if (existingUser) {
    response.status(ResponseStatus.BAD_REQUEST).json({message: 'User exists'});
    return;
  }

  const hashedPassword = await bcryptjs.hash(password, 4).catch(next);
  await new User({email, password: hashedPassword}).save().catch(next);
  response.status(ResponseStatus.CREATED).json({message: 'User created'});
});

router.post('/login', async (request, response, next) => {
  const {email, password} = request.body;

  const user = await User.findOne({email}).catch(next);
  if (!user) {
    response.status(ResponseStatus.BAD_REQUEST).json({message: 'User not found'});
    return;
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password).catch(next);
  if (!isPasswordCorrect) {
    response.status(ResponseStatus.BAD_REQUEST).json({message: 'Wrong password'});
    return;
  }

  const token = jwt.sign({userID: user.id}, config.get('jwtSecret'));
  response.json({token});
});

module.exports = router;
