import { Id } from '@/convex/_generated/dataModel'

export type Post = {
  _id: Id<'posts'>
  _creationTime: number
  coverImageId?: string
  coverImageUrl?: string | null
  title: string
  slug: string
  excerpt: string
  content: string
  authorId: Id<'users'>
  likes: number
  author: {
    _id: Id<'users'>
    _creationTime: number
    firstName?: string | undefined
    lastName?: string | undefined
    imageUrl?: string | undefined
    posts?: Id<'posts'>[] | undefined
    email: string
    clerkUserId: string
  } | null
}

export interface Comment {
  _id: Id<'comments'>;
  text: string;
  authorId: Id<'users'>;
  postId: Id<'posts'>;
  createdAt: number;
  likes: number;
  author?: {
    name: string;
    image?: string;
  };
}

export interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
}
// interface Post {
//   _creationTime: number;
//   _id: string;
//   author: Author;
//   authorId: string;
//   content: string; // JSON string
//   excerpt: string;
//   likes: number;
//   slug: string;
//   title: string;
// }
