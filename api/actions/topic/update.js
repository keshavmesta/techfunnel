import { TopicModel } from './resource/TopicModel';

export default function update(req) {
  let user = req.session.user;
  return new Promise((resolve, reject) => {
    if(user) {
      // write to database
      const topic = req.body;
      topic.speakerName = user.name;
      topic.speakerId = user.oracleId;
      topic.speakerEmail = user.email;
      topic.datePosted = Date();
      topic.status = 1;
      TopicModel.create(topic).then(function (result) {
        resolve(result);
      }, function (err) {
        reject(err)
      });
    } else {
      reject('You need to be logged in to post topics');
    }
  });
}
