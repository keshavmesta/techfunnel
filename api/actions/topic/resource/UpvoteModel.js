import mongoose from 'mongoose';

const UpvoteSchema = new mongoose.Schema({
  user: String,
  topicId: String,
});

export const UpvoteModel = mongoose.model('Upvotes', UpvoteSchema);
