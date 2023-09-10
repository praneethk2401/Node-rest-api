import mongoose from 'mongoose';  // Importing mongoose for MongoDB interactions

const PostSchema = new mongoose.Schema(  // Defining the Post schema
  {
    userId: {
      type: String,  // User ID is a string
      required: true,  // User ID is required
    },
    desc: {
      type: String,  // Description is a string
      max: 500,  // Maximum length of description is 500 characters
    },
    img: {
      type: String,  // Image is a string (URL)
    },
    likes: {
      type: Array,  // Likes is an array
      default: [],  // Default value for likes is an empty array
    },
  },
  { timestamps: true }  // Enable timestamps for posts
);

export default mongoose.model("Post", PostSchema);  // Exporting the Post model

