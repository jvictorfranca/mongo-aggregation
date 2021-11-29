db.trips.aggregate([
  { $match: {
    birthYear: { $gte: 0 },
  } },
  { $group: {
    _id: null,
    maiorAnoNascimento: { $max: "$birthYear" },
    menorAnoNascimento: { $min: "$birthYear" },
  } },

  { $project: {
    _id: false,
  } },
]);
