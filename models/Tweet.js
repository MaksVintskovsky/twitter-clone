import mongoose from "mongoose";

const TweetSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 280, // как у настоящего Твиттера
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } // автоматически создаёт createdAt и updatedAt
);

// Проверяем, чтобы модель не создавалась заново при каждом hot-reload
export default mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);
