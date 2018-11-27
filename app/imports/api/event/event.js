import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Events = new Mongo.Collection('Events');

/** Create a schema to constrain the structure of documents associated with this collection. */
const EventSchema = new SimpleSchema({
  campus: String,
  building: String,
  date: String,
  timeStart: String,
  timeEnd: String,
  notes: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Events.attachSchema(EventSchema);

/** Make the collection and schema available to other code. */
export { Events, EventSchema };
