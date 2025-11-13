import { connectDB } from "@/lib/mongoDB";

export async function GET() {
  await connectDB();
  return Response.json({ message: "MongoDB connected successfully!" });
}
