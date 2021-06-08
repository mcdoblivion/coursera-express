const assert = require("assert");

exports.insertDocument = (db, document, collection, callback) => {
  coll = db.collection(collection);

  return coll.insert(document);
};

exports.findDocument = (db, collection, callback) => {
  coll = db.collection(collection);

  return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) => {
  coll = db.collection(collection);

  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
  coll = db.collection(collection);

  return coll.updateOne(document, { $set: update }, null);
};
