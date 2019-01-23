import { Meteor } from 'meteor/meteor';
import { Bags } from '../../api/bags/bags.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.eventID}: ${data.name} trash`);
  Bags.insert(data);
}

/** Initialize the collection if empty. */
if (Bags.find().count() === 0) {
  if (Meteor.settings.defaultBags) {
    console.log('Creating sample bag data.');
    Meteor.settings.defaultBags.map(data => addData(data));
  }
}

/** This subscription publishes Bags */
Meteor.publish('Bags', function publish() {
  return Bags.find();
});
