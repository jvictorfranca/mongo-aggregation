db.trips.aggregate([
  { $addFields: {
    day: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$day",
    count: { $sum: 1 },
  } },
  { $sort: { count: -1 } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    total: "$count",
    _id: false,
  } },
]);
