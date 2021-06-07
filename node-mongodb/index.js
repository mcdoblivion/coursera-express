const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboperations = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.strictEqual(err, null);

  console.log("Connected correctly to server.");

  const db = client.db(dbname);

  dboperations.insertDocument(
    db,
    { name: "dish a", description: "Sample description" },
    "dishes",
    (result) => {
      console.log("Insert document:\n", result.ops);

      dboperations.findDocument(db, "dishes", (docs) => {
        console.log("Found document:\n", docs);

        dboperations.updateDocument(
          db,
          { name: "dish a" },
          { description: "Updated sample description" },
          "dishes",
          (result) => {
            console.log("Updated document:\n", result.result);

            dboperations.findDocument(db, "dishes", (docs) => {
              console.log("Found document:\n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped collection: ", result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
