// Пример фейковых данных — потом заменишь на базу
const tweets = [
  { id: 1, user: "elon", content: "Going to Mars soon!" },
  { id: 2, user: "muskfan", content: "I love Tesla!" },
  { id: 3, user: "john", content: "Just chilling on Twitter clone 😎" },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

    const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  const posts = data.posts;
  const filtered = posts.filter(
    (t) =>
      t.content.toLowerCase().includes(q) ||
      t.user.toLowerCase().includes(q)
  );

  return Response.json(filtered);
}
