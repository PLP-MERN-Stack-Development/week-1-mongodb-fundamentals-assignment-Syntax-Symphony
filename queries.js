// --- Basic Queries ---
db.books.find({ genre: "Fiction" });

db.books.find({ published_year: { $gt: 2000 } });

db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 13.99 } }
);

// --- Advanced Queries ---
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

db.books.find().sort({ price: 1 });

db.books.find().skip(5).limit(5);

// --- Aggregation Pipelines ---
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// --- Indexes ---
db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: -1 });

db.books.find({ title: "1984" }).explain("executionStats");

  