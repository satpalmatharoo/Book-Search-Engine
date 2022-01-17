const {AuthenicationError, AuthenticationError} = require ("apollo-server-express");

const {User} = require ('../models');
const {signToken} =require ('../utils/auth');

const resolvers = {
    Query: {
    me: async (parent, args, {user}) => {
      if (user) {
        return User.findOne({_id:user._id});
      }
    throw new AuthenticationError("Please Log In");
    },

},

Mutation: {
    signUp: async (parent, {email, username, password}) =>{
        const user = await User.create({email, username, password});

    if (!user) {
      return null;
    }
    const token = signToken(user);
    return { token, user };
    },

    login: async (parent, {email, password}) => {
        const user = await User.findOne({ email });

        if (!user) {
          return null;
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          return null;
        }
        const token = signToken(user);
        
    },

    saveBook: async (parent, {bookData}, {user}) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $push: { savedBooks: bodyData } },
              { new: true }
            );
            return res.json(updatedUser);
          } catch (err) {
            return null
            }
        }
    },

    deleteBook: async(parent, {bookId}, {user}) => {
        try{
            return await User.findOneAndUpdate(
                {_id: user._id},
                {$pull: {savedBooks: {bookId}}},
                {new:true}
            );

        } catch (error){
            return null

        }
    },
  };
  module.exports = resolvers;