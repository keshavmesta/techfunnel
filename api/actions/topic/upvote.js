import { TopicModel } from './resource/TopicModel';
import { UpvoteModel } from './resource/UpvoteModel';
import mongoose from 'mongoose';

export default function upvote(req) {

  return new Promise((resolve, reject) => {
    if(req.session.user === undefined) {
      reject('You need to be logged in to upvote topics');
    } else {
      let topic_id = req.body._id;
      let user = req.session.user.name;

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
        } else {
          reject('You have already upvoted this particular topic');
        }
      }, function(err){
        reject(err);
      });
    }
  });
}
