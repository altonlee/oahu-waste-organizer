import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Bags = new Mongo.Collection('Bags');

/** Create a schema to constrain the structure of documents associated with this collection. */
const BagSchema = new SimpleSchema({
  eventID: String,
  category: String,
  name: String,
  weight: Number,
  volume: Number,
  notes: {
    type: String,
    optional: true,
  },
  createdAt: Date,
  // removeEmptyStrings: false allows empty strings to count as values
}, { clean: { removeEmptyStrings: false }, tracker: Tracker });

/** Attach this schema to the collection. */
Bags.attachSchema(BagSchema);

/** Make the collection and schema available to other code. */
export { Bags, BagSchema };
