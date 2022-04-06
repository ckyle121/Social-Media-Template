const { Thought, User } = require('../models');

const thoughtController = {
    // create thought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {  _id: params.userId }, 
                { $push: { thoughts: _id } }, 
                { new: true }
                );
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err)); 
    },

    // get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
            // populate user reactions
            .populate({ path: 'reactions', select: '-__v '})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get single thought by ID 
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                // if no user found, send 404
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update a thought by id
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                // if no user found, send 404
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a thought
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No thought found with this id'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    
    // add a reaction 
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $push: { reactions: body } }, 
            { new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({message: 'No thought with this particular ID!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    // delete a reaction 
    deleteReaciton({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            { $pull: { reactions: { reactionId: params.reactionId } } }, 
            { new: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with this particular ID!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;