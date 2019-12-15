const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('users');
  });

router.post('/', (req, res) => {

    if(!req.body.name || req.body.name.length < 3) {
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
      });
}); 

router.get('/:name', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.name));
    if(!user) res.status(404).send('The user with given name not found')// 404
    res.send(user);
 });

 module.exports = router;