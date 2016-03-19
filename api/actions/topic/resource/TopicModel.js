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
  status: Number
});

export const TopicModel = mongoose.model('Topics', TopicSchema);
