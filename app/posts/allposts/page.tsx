"use client"
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'

// export default function AllPosts() {
//   const posts = useQuery(api.posts.getPosts);
//  const c=JSON.stringify(posts)
// //  const b= c[0].author.firstName
//   const author = useQuery(api.users.current);
//   console.log( c+ "this is here")
//   return (
//     <section className='mt-[65px]'>
//       <div className='container'>
//         <div className='flex flex-col gap-x-16 gap-y-6 xl:flex-row xl:items-start'>
//           <main className='flex-1 pt-20 xl:py-20'>
//             <h1>all</h1>
//           </main>

         
//         </div>
//       </div>
//     </section>
//   )
// }

import React from 'react';

interface Author {
  _creationTime: number;
  _id: string;
  clerkUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface PostContent {
  type: string;
  content: Array<{
    type: string;
    content: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

interface Post {
  _creationTime: number;
  _id: string;
  author: Author;
  authorId: string;
  content: string; // JSON string
  excerpt: string;
  likes: number;
  slug: string;
  title: string;
}

const PostList = ({ posts }: { posts: Post[] }) => {
  // Function to parse the nested JSON content
  const parseContent = (contentString: string) => {
    try {
      const parsedContent  = useQuery(api.posts.getPosts);
      // Extract the text from the nested structure
      console.log(JSON.stringify(parsedContent))
    } catch (error) {
      console.error('Error parsing content:', error);
      return 'Unable to parse content';
    }
  };

  return (
    <div className="post-list">
     <h1>all</h1>
    </div>
  );
};

// Example usage in a parent component
const App = () => {
  // Assuming you've fetched this data from an API
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // Replace this with your actual data fetching method
    const fetchPosts = async () => {
      try {
        // This is just an example - replace with your actual data fetching logic
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return <PostList posts={posts} />;
};

export default App;