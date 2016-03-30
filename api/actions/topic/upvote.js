import { TopicModel } from './resource/TopicModel';
import mongoose from 'mongoose';

export default function upvote(req) {
  return new Promise((resolve, reject) => {
    let topic_id = req.body._id;

    // make async call to database
    TopicModel.update({_id: mongoose.Types.ObjectId(topic_id)}, {$inc: {upVotes: 1}}).then(function(result){
      TopicModel.find({}).then(function(result){
        resolve(result);
      }, function(err){
        reject(err);
      })
    }, function(err){
      reject(err);
    });
  });
}
