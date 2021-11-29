db.movies.aggregate([
  { $match: { languages: "English" } },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    non_media_rating: { $avg: "$imdb.rating" },
  } },
  { $sort: { numeroFilmes: -1, _id: -1 } },
  { $project: {
    _id: true,
    numeroFilmes: true,
    mediaIMDB: { $round: ["$non_media_rating", 1] },
  } },
]);
