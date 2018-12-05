import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Data = new Mongo.Collection('Data');

/** Create a schema to constrain the structure of documents associated with this collection. */
const BagSchema = new SimpleSchema({
  type: String,
  category: String,
  weight: Number,
  volume: Number,
  notes: String,
});

const DataSchema = new SimpleSchema({
  campus: String,
  building: String,
  date: String,
  timeStart: String,
  timeEnd: String,
  bagTare: {
    type: Number,
    optional: true,
  },
  notes: String,
  bags: [BagSchema],
  // removeEmptyStrings: false allows empty strings to count as values
}, { clean: { removeEmptyStrings: false }, tracker: Tracker });

/** Attach this schema to the collection. */
Data.attachSchema(DataSchema);

/** Make the collection and schema available to other code. */
export { Data, DataSchema };
