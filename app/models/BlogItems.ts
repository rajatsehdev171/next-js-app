// models/BlogPost.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface BlogPostDocument extends Document {
  author: string;
  title: string;
  date_published: Date;
  content: string;
}

const BlogItemSchema: Schema<BlogPostDocument> = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  date_published: { type: Date, required: true },
  content: { type: String, required: true },
});

const BlogItems: Model<BlogPostDocument> = mongoose.models.BlogItems || mongoose.model('BlogItems', BlogItemSchema);

export default BlogItems;
