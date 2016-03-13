import { TopicModel } from './resource/TopicModel';

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    TopicModel.find({}).then(function(result){
      resolve(result);
    }, function(err){
      reject(err);
    });
  });
}
