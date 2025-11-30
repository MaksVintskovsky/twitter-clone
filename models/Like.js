import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    tweetId: { type: String, required: true, index: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "likes" }
);

LikeSchema.index({ tweetId: 1, userId: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model("Like", LikeSchema);
