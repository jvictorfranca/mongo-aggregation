db.trips.aggregate([
  { $addFields: {
    tempo: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $addFields: {
    tempoHoras: {
      $divide: ["$tempo", 3600000],
    },
  } },
  { $group: {
    _id: "$usertype",
    avgDuration: { $avg: "$tempoHoras" },
  } },
  {
    $sort: { duracaoMedia: 1 },
  },
  { $project: {
    _id: false,
    tipo: "$_id",
    duracaoMedia: { $round: ["$avgDuration", 2] },
  } },
]);
