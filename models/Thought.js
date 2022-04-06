const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String, 
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, 
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal)
        },
         username: {
             type: String,
             required: true,
             ref: 'User'
         },
         reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export Thought model
module.exports = Thought;