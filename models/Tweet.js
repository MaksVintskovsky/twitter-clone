import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 280,
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
