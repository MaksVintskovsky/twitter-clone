
import Header from "../components/Header";
import TweetsFromDB from "../components/TweetsFromDB";

export default function Home() {
  
  return (
    <div className="font-sans  w-full min-h-screen flex flex-col items-center gap-8  ">
      <Header />
      <TweetsFromDB />
    </div>
  );
}