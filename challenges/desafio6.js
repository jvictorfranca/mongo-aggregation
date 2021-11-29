db.movies.aggregate([
  {
    $match: {
      "imdb.rating": { $gte: 0 },
      awards: { $regex: /won.*oscar/, $options: "si" },

    },
  },
  { $group: {
    _id: null,
    count: { $sum: 1 },
    maior_rating: { $max: "$imdb.rating" },
    menor_rating: { $min: "$imdb.rating" },
    non_media_rating: { $avg: "$imdb.rating" },
    non_desvio_padrao: { $stdDevSamp: "$imdb.rating" },

  } },
  { $project: {
    _id: false,
    maior_rating: true,
    menor_rating: true,
    media_rating: { $round: ["$non_media_rating", 1] },
    desvio_padrao: { $round: ["$non_desvio_padrao", 1] },
  } },
]);
