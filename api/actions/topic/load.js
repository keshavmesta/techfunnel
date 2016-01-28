const initialTopics = [
  {id: 1, color: 'Red', sprocketCount: 7, owner: 'John'},
  {id: 2, color: 'Taupe', sprocketCount: 1, owner: 'George'},
  {id: 3, color: 'Green', sprocketCount: 8, owner: 'Ringo'},
  {id: 4, color: 'Blue', sprocketCount: 2, owner: 'Paul'}
];

export function getTopics(req) {
  let topics = req.session.topics;
  if (!topics) {
    topics = initialTopics;
    req.session.topics = topics;
  }
  return topics;
}

export default function load(req) {
  return new Promise((resolve, reject) => {
    // make async call to database
    setTimeout(() => {
      if (Math.random() < 0.33) {
        reject('Topic load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getTopics(req));
      }
    }, 1000); // simulate async load
  });
}
