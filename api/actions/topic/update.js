import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject('Oh no! Topic save fails 20% of the time. Try again.');
      } else {
        const topics = load(req);
        const topic = req.body;
        if (topic.color === 'Green') {
          reject({
            color: 'We do not accept green topics' // example server-side validation error
          });
        }
        if (topic.id) {
          topics[topic.id - 1] = topic;  // id is 1-based. please don't code like this in production! :-)
        }
        resolve(topic);
      }
    }, 1500); // simulate async db write
  });
}
