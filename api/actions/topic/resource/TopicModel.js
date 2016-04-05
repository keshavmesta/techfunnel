import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  speakerName: String,
  speakerId: Number,
  speakerEmail: String,
  event: String,
  location: String,
  datePosted: Date,
  dateScheduled: String,
  comments: String,
  status: Number,
  upVotes: Number,
  domain: String
});

export const TopicModel = mongoose.model('Topics', TopicSchema);
