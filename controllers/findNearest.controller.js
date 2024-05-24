import Service from "../models/service.model.js";

export const search = async (req, res, next) => {
  const { longitude, latitude } = req.body;
  try {
    const result = await Service.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: parseFloat(1000) * 1609,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]).sort({ dist: { calculated: -1 } });

    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
