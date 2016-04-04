import { TopicModel } from './resource/TopicModel';
import { UpvoteModel } from './resource/UpvoteModel';
import mongoose from 'mongoose';

export default function upvote(req) {
  return new Promise((resolve, reject) => {
    let topic_id = req.body._id;
    let user = req.session.user || 'kmesta';

    // Check if user has already voted for the topic
    UpvoteModel.find({user: user, topicId: topic_id}).then(function(result){
      if(result.length===0) {
        // make async call to database
        TopicModel.update({_id: mongoose.Types.ObjectId(topic_id)}, {$inc: {upVotes: 1}}).then(function(result){
          UpvoteModel.create({user: user, topicId: topic_id}).then(function(result) {
            TopicModel.find({}).then(function(result) {
              resolve(result);
            }, function(err) {
              reject(err);
            })
          }, function(err) {
            reject(err);
          })
        }, function(err){
          reject(err);
        })
      }
    }, function(err){
      reject(err);
    });
  });
}
