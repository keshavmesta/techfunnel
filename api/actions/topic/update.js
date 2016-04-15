import load from './load';
import { TopicModel } from './resource/TopicModel';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    const topics = load(req);
    const topic = req.body;
    topic.datePosted = Date();
    topic.status = 1;
    TopicModel.create(topic).then(function (result) {
      resolve(result);
    }, function (err) {
      reject(err)
    });
  });
}
