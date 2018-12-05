import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Data } from '../../api/data/data.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.building} audit data`);
  console.log(data);
  Data.insert(data);
}

/** Initialize the collection if empty. */
if (Data.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating sample data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** This subscription publishes Events */
Meteor.publish('Data', function publish() {
  return Data.find();
});
