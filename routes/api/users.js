const express = require('express');
const router = express.Router();
// библиотекка для создания хешей и соли к ним
const bcrypt = require('bcryptjs');
// для создания своих конфигов
const config = require('config');
// создание токенов
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route   POST api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
    const {name, email, password} = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json('Please enter all fields');
    }

    // Check for existing user, Проверка на существование email в БД
    User.findOne({email: email})
      .then(user => {
          // если пользователь с введенным email найден, то отправляем ошибку
          if (user) return res.status(400).json('User already exists');

          // иначе, создаем нового User
          const newUser = new User({
              name,
              email,
              password
          });

          // Create salt & hash
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save()
                    .then(user => {
                        jwt.sign(
                          {id: user.id},
                          config.get('jwtSecret'),
                          {expiresIn: 3600},
                          (err, token) => {
                              if (err) throw err;
                              res.json({
                                  access_token: token,
                                  user: {
                                      id: user.id,
                                      name: user.name,
                                      email: user.email
                                  }
                              });
                          }
                        )
                    });
              })
          })
      })
});

// @route   POST api/users/login
// @desc    Auth user
// @access  Public
router.post('/login', (req, res) => {
    const {login, password} = req.body;
    // Simple validation
    if (!login || !password) {
        return res.status(400).json('Please enter all fields');
    }

    // Check for existing user
    User.findOne({email: login})
      .then(user => {
          if (!user) return res.status(404).json('User Does not exist');

          // Validate password Сравнение переданного пароля с хешированной версией в БД
          bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (!isMatch) return res.status(403).json('Invalid credentials');
                // если совпадает
                jwt.sign(
                  {id: user.id},
                  config.get('jwtSecret'),
                  {expiresIn: 3600},
                  (err, token) => {
                      if (err) throw err;
                      res.json({
                          access_token: token,
                          user: {
                              id: user.id,
                              name: user.name,
                              email: user.email
                          }
                      });
                  }
                )
            })
      })
});
// @route   GET api/users/id
// @desc    Get user data
// @access  Private
router.get('/:id', auth, (req, res) => {
    User.findById(req.params.id)
      .select('-password')
      .then(user => {
          if (!user) return res.status(404).json('User Does not exist');
          res.json(user)
      });
});

module.exports = router;
