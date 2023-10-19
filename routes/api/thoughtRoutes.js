const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReactionToThought,
    deleteReaction,
} = require('../../controllers/thoughtController');


// http://localhost:3001/api/thoughts
router.route('/').get(getThoughts).post(createThought);


// http://localhost:3001/api/thoughts/:thoughtId

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// http://localhost:3001/api/thoughts/:thoughtId/reaction

router.route('/:thoughtId/reaction').post(addReactionToThought);

//http://localhost:3001/api/thought/:thoughtId/reaction/reactionId
router.route('/:thoughtId/reaction/reactionId').delete(deleteReaction);

module.exports=router;