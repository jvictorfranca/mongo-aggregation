db.air_routes.aggregate([
  { $match: {
    airplane: { $in: ["747", "380"] },
  } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "airlineData",
  } },
  {
    $unwind: "$airlineData",
  },
  { $group: {
    _id: "$airlineData.name",
    totalRotas: { $sum: 1 },
  } },
  { $match: {
    _id: { $not: { $eq: [] } },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
