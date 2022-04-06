const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaciton
} = require('../../controllers/thought-controller');

// /api/thoughts <GET> 
router.route('/').get(getAllThoughts);


// /api/thoughts/:id <GET, PUT, DELETE> 
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:userId/ <POST>
router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaciton);

module.exports = router; 