import { TopicModel } from './resource/TopicModel';
import { UpvoteModel } from './resource/UpvoteModel';

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    TopicModel.find({}).then(function(result){
      let topics = result;
      let upvotedTopics = [];

      if(req.session.user) {
        UpvoteModel.find({user: req.session.user.name}, {topicId: 1}).then(function(result) {
          if(result && result.length) {
            result.map((topic) => upvotedTopics.push(topic.topicId));
            resolve({topics: topics, upvotedTopics: upvotedTopics});
          } else {
            resolve({topics: topics});
          }
        })
      } else {
        resolve({topics: topics});
      }
    }, function(err){
      reject(err);
    });
  });
}
