

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  const res = await fetch("https://dummyjson.com/posts");
  const data = await res.json();
  const posts = data.posts;

  const filtered = posts.filter(
    (t) =>
      t.body.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q)
    );

  return Response.json(filtered);
}
