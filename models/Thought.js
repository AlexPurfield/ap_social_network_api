const {Schema, model} = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtTest: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                return createdAt.toISOString();
            }
        },

        username: {
            type: String,
            required: true,
        },
        reactions: 
            [reactionSchema],
        
    });

    reactionSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });
    const Thought = model('Thought', thoughtSchema);
    module.exports= Thought;