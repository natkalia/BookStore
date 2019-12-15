const express = require('express');
const router = express.Router();

router.get('/add', async (req, res) => {
    res.render('users');
  });

router.post('/add', async (req, res) => {
    const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        isEditor: req.body.isEditor
      });
      await user.save();
}); 

router.get('/:name', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.name));
    if(!user) res.status(404).send('The user with given name not found')// 404
    res.send(user);
 });

 module.exports = router;