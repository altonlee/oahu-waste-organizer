import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '../../api/event/event.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.building} audit data`);
  Events.insert(data);
}

/** Initialize the collection if empty. */
if (Events.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating sample events.');
    Meteor.settings.defaultEvents.map(data => addData(data));
  }
}

/** This subscription publishes Events */
Meteor.publish('Events', function publish() {
  return Events.find({}, {sort: {date: -1, timeStart: 1 }});
});