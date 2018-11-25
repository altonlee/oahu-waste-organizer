import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Input } from '../../api/input/input';
import { Events } from '../../api/event/event';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: event items`);
  Input.insert(data);
}

/** Initialize the collection if empty. */
if (Input.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating sample event items.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes Events */
Meteor.publish('Input', function publish() {
  return Input.find();
});