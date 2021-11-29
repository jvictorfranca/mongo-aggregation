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

// use('aggregations')
// db.air_routes.aggregate([
//   {$match: {
//     airplane: {$in:["747", "380"]}
//   }},
//   {$lookup: {
//     from: "air_alliances",
//     let: {airline_name: "$airline.name"},
//     pipeline: [
//       {$unwind: "$airlines"},
//       {
//         $match:{
//           $expr: {
//         $eq: ["$airlines", "$$airline_name"]
//       }}}

//     ],
//     as: "airlineData"
//   }},
//   {$group: {_id:"$airlineData.name", count: {$sum:1}}}
// ])
