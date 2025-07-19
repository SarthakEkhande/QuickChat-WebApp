const User = require("../models/user.js");
const router = require('express').Router();
const authMiddleware= require('./../middlewares/authMiddleware.js')
//get current details of current login user

router.get('/get-logged-user', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.send({
      message: 'User fetched successfully',
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});
router.get('/get-all-users', authMiddleware, async (req, res) => {
  try {
    const userId=req.user.id
    const allUsers = await User.find({_id : {$ne :userId}});

    res.send({
      message: 'All User fetched successfully',
      success: true,
      data: allUsers
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router