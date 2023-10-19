const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
} = require('../../controllers/userController');


// http://localhost:3001/api/users
router.route('/').get(getUsers).post(createUser);

// http://localhost:3001/api/users/userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// http://localhost:3001/users/userId/friends
router.route('/:userId/friends').post(createFriend);

//http://localhost:3001/users/userId/friends/:friendsId
router.route('/:userId/friends/:friendId').delete(deleteFriend);


module.exports = router;