db.trips.aggregate([
  { $match: {
    $and: [
      { startTime: { $gte: ISODate("2016-03-10") } },
      { startTime: { $lt: ISODate("2016-03-11") } },
    ],
  } },
  { $addFields: {
    duracaoMs: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $addFields: {
    duracaoMin: { $divide: ["$duracaoMs", 60000] },
  } },
  { $group: {
    _id: null,
    duracao: { $avg: "$duracaoMin" },
  } },
  { $project: {
    _id: false,
    duracaoMediaEmMinutos: { $ceil: "$duracao" },
  } },
]);
