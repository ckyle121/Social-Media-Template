const { User } = require('../models');

const userController = {
    // create a new user
    createUser({body}, res){
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res){
        User.find({})
            // populate user thoughts
            .populate({ path: 'thought', select: '-__v '})
            // populate user friends
            .populate({ path: 'friends', select: '-__v '})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    
    // get single user by ID 
    getUserById({ params }, res){
        User.findOne({ _id: params.id})
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no user found, send 404
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update a user by id
    updateUser({ params }, res){
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbUserData => {
                // if no user found, send 404
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // delete a user
    deleteUser({ params }, res){
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData){
                    res.status(404).json({ message: 'No user found with this id'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    
    // add a friend 
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$push: { friends: params.friendId}}, 
            {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a current friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: { friends: params.friendId}}, 
            {new: true})
            .populate({path: 'friends', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this particular ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController;