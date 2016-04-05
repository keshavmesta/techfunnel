import { TopicModel } from './TopicModel';

export default function seed() {
  TopicModel.find({}).remove(function(){
    TopicModel.create([
      {title: 'Javascript Memory Management', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Keshav Mesta', speakerId: '106236', speakerEmail: 'kmesta@sapient.com', event: 'Tech Friday', location: 'Bangalore', datePosted: Date(), dateScheduled: '2016-02-05', comments: 'Random', status: 1, upVotes: 746},
      {title: 'Webpack Bundling', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Vidhya Vijai Anand', speakerId: '106236', speakerEmail: 'vanand7@sapient.com', event: 'Tech Friday', location: 'Bangalore', datePosted: Date(), dateScheduled: '2016-03-04', comments: 'Random', status: 1, upVotes: 76},
      {title: 'SASS 3.3', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Onkar Bulbule', speakerId: '106236', speakerEmail: 'obulbul@sapient.com', event: 'XT Summit', location: 'Bangalore', datePosted: Date(), dateScheduled: '2016-02-08', comments: 'Random', status: 1, upVotes: 332},
      {title: 'jQuery Architecture', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Subhasree Murugan', speakerId: '106236', speakerEmail: 'smurugan@sapient.com', event: 'Tech Friday', location: 'Bangalore', datePosted: Date(), dateScheduled: '2016-02-03', comments: 'Random', status: 1, upVotes: 344},
      {title: 'React Dev Tools', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Rahul Ram', speakerId: '76897', speakerEmail: 'rram@sapient.com', event: 'XT Summit', location: 'Bangalore', datePosted: Date(), dateScheduled: '2016-02-19', comments: 'Random', status: 1, upVotes: 444},
      {title: 'Introduction to Backbone', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Shahrukh Khan', speakerId: '90987', speakerEmail: 'skhan@sapient.com', event: 'XT Summit', location: 'Gurgaon', datePosted: Date(), dateScheduled: '2016-05-09', comments: 'Random', status: 1, upVotes: 888},
      {title: 'React + Redux', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Akshay Kumar', speakerId: '123456', speakerEmail: 'akumar@sapient.com', event: 'XT Summit', location: 'Gurgaon', datePosted: Date(), dateScheduled: '2016-06-27', comments: 'Random', status: 1, upVotes: 342},
      {title: 'Progressive Web Apps', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'John Abraham', speakerId: '126236', speakerEmail: 'jabrah@sapient.com', event: 'Tech Friday', location: 'Gurgaon', datePosted: Date(), dateScheduled: '2016-03-24', comments: 'Random', status: 1, upVotes: 121},
      {title: 'Web components', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Aishwarya Rai', speakerId: '106777', speakerEmail: 'arai@sapient.com', event: 'XT Summit', location: 'Gurgaon', datePosted: Date(), dateScheduled: '2016-04-19', comments: 'Random', status: 1, upVotes: 761},
      {title: 'Security in nodeJS', description: 'Most of memory management issues come at this phase. The hardest task here is to find when the allocated memory is not needed any longer. It often requires for the developer to determine where in the program such piece of memory is not needed anymore and free it.', speakerName: 'Sonam Kapoor', speakerId: '104526', speakerEmail: 'skapoor@sapient.com', event: 'Tech Friday', location: 'Gurgaon', datePosted: Date(), dateScheduled: '2016-02-12', comments: 'Random', status: 1, upVotes: 333}
    ]);
  });
}
