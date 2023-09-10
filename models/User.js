import mongoose from 'mongoose';  // Importing mongoose for MongoDB interactions

const UserSchema = new mongoose.Schema(  // Defining the User schema
  {
    username: {
      type: String,  // Username is a string
      require: true,  // Username is required
      min: 3,  // Minimum length of username is 3
      max: 20,  // Maximum length of username is 20
      unique: true,  // Username must be unique
    },
    email: {
      type: String,  // Email is a string
      required: true,  // Email is required
      max: 50,  // Maximum length of email is 50
      unique: true,  // Email must be unique
    },
    password: {
      type: String,  // Password is a string
      required: true,  // Password is required
      min: 6,  // Minimum length of password is 6
    },
    profilePicture: {
      type: String,  // Profile picture is a string (URL)
      default: "",  // Default value for profile picture is an empty string
    },
    coverPicture: {
      type: String,  // Cover picture is a string (URL)
      default: "",  // Default value for cover picture is an empty string
    },
    followers: {
      type: Array,  // Followers is an array
      default: [],  // Default value for followers is an empty array
    },
    followings: {
      type: Array,  // Followings is an array
      default: [],  // Default value for followings is an empty array
    },
    isAdmin: {
      type: Boolean,  // IsAdmin is a boolean
      default: false,  // Default value for isAdmin is false
    },
    desc: {
      type: String,  // Description is a string
      max: 50,  // Maximum length of description is 50
    },
    city: {
      type: String,  // City is a string
      max: 50,  // Maximum length of city is 50
    },
    from: {
      type: String,  // From is a string
      max: 50,  // Maximum length of from is 50
    },
    relationship: {
      type: Number,  // Relationship is a number
      enum: [1, 2, 3],  // Relationship can be 1, 2, or 3
    },
  },
  { timestamps: true }  // Enable timestamps for users
);

export default mongoose.model("User", UserSchema);  // Exporting the User model

