import mongoose from 'mongoose';

const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  speakerName: String,
  speakerId: Number,
  speakerEmail: String,
  datePosted: Date,
  dateScheduled: Date,
  comments: String,
  status: Number
});

export const TopicModel = mongoose.model('Topics', TopicSchema);
