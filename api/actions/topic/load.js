const initialTopics = [
  {id: 1, datePosted: '24 January 2016', title: 'Memory Management', speaker: 'John', description: 'This is a talk', status : true, talkDate : 'February', remarks : 'Random', speakerId : '67463', speakerEmail : 'djohn@sapient.com'},
  {id: 2, datePosted: '27 January 2016', title: 'Better Memory Management', speaker: 'Keshav Mesta', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', status : true, talkDate : '5 Feb 2016', remarks : 'I want mic speaker and snacks', speakerId : '34564', speakerEmail : 'kmesta@sapient.com'},
  {id: 3, datePosted: '11 January 2016', title: 'SASS 3.3', speaker: 'Onkar Nayan Bulbule', description: 'This is a talk about latest usage of SASS and how you will benefit in writing better CSS by using power of SASS', status : true, talkDate : '5 Feb 2016', remarks : 'Keep it simple silly', speakerId : '113856', speakerEmail : 'obulbule@sapient.com'},
  {id: 4, datePosted: '24 December 2015', title: 'Design Patterns', speaker: 'Shafeeq', description: 'This is a talk yet to be approved. Lets see', status : false, talkDate : 'TBD', remarks : 'Please select me', speakerId : '109806', speakerEmail : 'srahman2@sapient.com'}
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
      if (0) {
        reject('Topic load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getTopics(req));
      }
    }, 1000); // simulate async load
  });
}
