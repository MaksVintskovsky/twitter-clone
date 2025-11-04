// // Exercise 1: Display Tweets from JSON file
// // This is a SERVER COMPONENT (no "use client" needed)

// // TODO: Import the fs module from 'fs/promises'
// // import { } from 'fs/promises';

// // TODO: Import path module
// // import path from 'path';

// export default async function TweetsPage() {
//   // TODO: Define the file path to tweets.json
//   // https://vercel.com/guides/loading-static-file-nextjs-api-route
//   // Hint: Use path.join(process.cwd(), 'data', 'tweets.json')

//   // TODO: Read the file using fs.readFile
//   // Hint: await readFile(filePath, 'utf-8')

//   // TODO: Parse the JSON data
//   // Hint: JSON.parse(fileContents)
//   return (
//     <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
//       <h1>All Tweets</h1>

//       {/* TODO: Map over tweets and display them */}
//       {/* Show: author, content, likes */}

//       <div>
//         <p>No tweets yet. Complete the TODOs above!</p>
//       </div>
//     </div>
//   );
// }




// Exercise 2: Individual Tweet Page - Dynamic Route
// This is a SERVER COMPONENT
import { readFile } from 'fs/promises';
import path from 'path';

export default async function TweetDetailPage({ params }) {
  // Get the tweet ID from params
  const { id } = params;

  try {
    // Read and parse the tweets.json file
    const filePath = path.join(process.cwd(), 'data', 'tweets.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const tweets = JSON.parse(fileContents);

    // Find the tweet with matching id
    const tweet = tweets.find(tweet => tweet.id === parseInt(id));

    // Handle case when tweet is not found
    if (!tweet) {
      return (
        <div className="p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Tweet Not Found</h1>
          <p className="text-gray-600">The tweet you're looking for doesn't exist.</p>
        </div>
      );
    }

    // Format the timestamp
    const tweetDate = new Date(tweet.timestamp);
    const formattedDate = tweetDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Tweet Details</h1>
        
        <div className="border rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center mb-2">
            <div className="font-bold">{tweet.author}</div>
            <div className="text-gray-500 text-sm ml-2">@{tweet.author.toLowerCase()}</div>
          </div>
          
          <p className="text-lg mb-3">{tweet.content}</p>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span>{formattedDate}</span>
            <span className="mx-2">·</span>
            <span>{tweet.likes} likes</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading tweet:', error);
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-600">Failed to load tweet details.</p>
      </div>
    );
  }
}