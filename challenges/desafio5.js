db.movies.aggregate(
  [
    {
      $match: {
        cast: { $exists: true },
        // title: "The Heat"
      },

    },

    { $addFields: {
      favs: ["Sandra Bullock", "Tom Hanks", "Julia Roberts", "Kevin Spacey", "George Clooney"],
    } },
    {
      $addFields: {
        intersection: { $setIntersection: ["$cast", "$favs"] },
      },
    },
    {
      $addFields: {
        intersectionSize: { $size: "$intersection" },
      },
    },

    {
      $sort: {
        intersectionSize: -1,
        "tomatoes.viewer.rating": -1,
        title: -1,
      },
    },

    {
      $project: {
        title: 1,
        intersection: 1,
        cast: 1,
        intersectionSize: 1,
        "tomatoes.viewer.rating": 1,

      },
    },

    {
      $skip: 26,
    },

    { $limit: 1 },

    { $project: {
      title: 1,
      _id: 0,
    } },

  ],
);
