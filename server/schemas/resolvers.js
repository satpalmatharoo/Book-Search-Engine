const { AuthenticationError} = require ("apollo-server-express");

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
    addUser: async (parent, args) =>{
      console.log("username reached here");
      console.log(email);
      console.log(password);
        const user = await User.create(args);

        const token = signToken(user);
    return { token, user };
    },

    login: async (parent, {email, password}) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Not Authorised");
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          throw new AuthenticationError("Password Incorrect")
        }
        const token = signToken(user);
        return{token, user}
        
    },

    saveBook: async (parent, {bookData}, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $push: { savedBooks: bookData } },
              { new: true }
            );
            return updatedUser;
          
            }
            throw new AuthenticationError("Not Authorised") 
        },

    removeBook: async(parent, {bookId}, context) => {
      console.log ("here")
      console.log ("bookId")
        if(context.user) {
          
            const updatedUser=await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: {savedBooks: {bookId}}},
                {new:true}
            );
            return updatedUser
            }
            throw new AuthenticationError("Not Authorised")
    },
  },
};
  module.exports = resolvers;