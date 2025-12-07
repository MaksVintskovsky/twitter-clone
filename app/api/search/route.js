import connectDB from "@/lib/mongoDB";
import Tweet from "@/models/Tweet";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  await connectDB();

  // если нет строки поиска — вернём просто последние твиты (по желанию)
  const filter = q
    ? {
        content: { $regex: q, $options: "i" }, // ищем по content
      }
    : {};

  const tweets = await Tweet.find(filter)
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  // Явно формируем JSON, чтобы точно были строки и нужные поля
  const result = tweets.map((t) => ({
    _id: t._id.toString(),
    content: t.content,
    image: t.image,
    likes: t.likes,
  }));

  return Response.json(result);
}
