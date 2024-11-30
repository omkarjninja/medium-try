import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    posts: v.optional(v.array(v.id('posts')))
  }).index('byClerkUserId', ['clerkUserId']),
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImageId: v.optional(v.id('_storage')),
    authorId: v.id('users'),
    likes: v.number()
  }).index('bySlug', ['slug']),
  // Schema for comments (add to your Convex schema)
  comments: defineTable({
    text: v.string(),
    authorId: v.id('users'),
    postId: v.id('posts'),
    createdAt: v.number(),
    likes: v.number(),
  }),likes: defineTable({
    userId: v.string(),
    coverImageId: v.optional(v.id('_storage')), // reference to your image table
    // Add a timestamp if you want to track when the like was made
    createdAt: v.number(),
  }).index('by_user_and_image', ['userId', 'coverImageId'])
})
