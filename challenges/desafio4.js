db.movies.aggregate([

  { $addFields: {
    title_split: { $split: [
      "$title", " ",
    ] },
  } },

  {
    $sort: {
      title: 1,
    },
  },

  {
    $match: {
      title_split: { $size: 1 },
    },
  },

  {
    $project: {
      title_split: 1,
      _id: 0,
    },
  },

]);
