const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const authenticated = require('../../middlewares/authenticated');
const roles = require('../../config/allowedRoles');
const checkRoles = require('../../middlewares/checkRoles')


router.route('/')
        .get(userController.getAllUsers)
        .post(authenticated, checkRoles(roles.level3), userController.createUser);

router.get('/:searchKey', userController.searchUsers);

router.route('/:username')
        .get(userController.getUser)
        .post(userController.softDeleteUser)
        .delete(authenticated, checkRoles(roles.level3), userController.deleteUser);

router.route('/:user')
        .get(userController.getUserFriends)
        .put(authenticated, userController.updateUser);

router.post('/:id/:friendId', authenticated, userController.addRemoveFriend);


module.exports = router;