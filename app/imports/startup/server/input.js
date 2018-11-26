import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Input } from '../../api/input/input.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.eventID} data.`);
  Input.insert(data);
}

/** Initialize the collection if empty. */
if (Input.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating sample waste data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes Events */
Meteor.publish('Input', function publish() {
  console.log(Input.find());
  return Input.find();
});