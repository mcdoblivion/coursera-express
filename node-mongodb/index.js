const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboperations = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "conFusion";

MongoClient.connect(url)
  .then((client) => {
    console.log("Connected correctly to server.");

    const db = client.db(dbname);

    dboperations
      .insertDocument(
        db,
        { name: "dish a", description: "Sample description" },
        "dishes"
      )
      .then((result) => {
        console.log("Insert document:\n", result.ops);

        return dboperations.findDocument(db, "dishes");
      })
      .then((docs) => {
        console.log("Found document:\n", docs);

        return dboperations.updateDocument(
          db,
          { name: "dish a" },
          { description: "Updated sample description" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated document:\n", result.result);

        return dboperations.findDocument(db, "dishes");
      })
      .then((docs) => {
        console.log("Found document:\n", docs);

        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped collection: ", result);

        return client.close();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
