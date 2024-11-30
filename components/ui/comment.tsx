import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Define proper types
interface Comment {
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

interface CommentProps {
  comment: Comment;
}

interface CommentSectionProps {
  postId: Id<'posts'>;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [newComment, setNewComment] = useState<string>('');
  // Explicitly type the useQuery return value
  const comments = useQuery(api.posts.getComments, { postId }) as Comment[] | undefined;
  const createComment = useMutation(api.posts.createComment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      await createComment({
        postId,
        text: newComment,
      });
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
              setNewComment(e.target.value)
            }
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <Button 
            type="submit"
            className="self-end"
          >
            Post Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {/* Add null check and proper typing */}
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <CommentComponent key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{comment.author?.name ?? 'Anonymous'}</span>
            <span className="text-gray-500 text-sm">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{comment.text}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          {comment.likes} likes
        </span>
      </div>
    </Card>
  );
};

export default CommentSection;