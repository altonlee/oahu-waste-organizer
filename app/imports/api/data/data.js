import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Data = new Mongo.Collection('Data');

/** Create a schema to constrain the structure of documents associated with this collection. */
const Item = new SimpleSchema({
  name: String,
  weight: Number,
  volume: Number,
  bagNotes: String,
});

const Input = new SimpleSchema({
  bagTare: Number,
  category: String,
  bags: [Item],
}, { tracker: Tracker });

const DataSchema = new SimpleSchema({
  campus: String,
  building: String,
  date: String,
  timeStart: String,
  timeEnd: String,
  notes: String,
  input: [Input],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Data.attachSchema(DataSchema);

/** Make the collection and schema available to other code. */
export { Data, DataSchema };
