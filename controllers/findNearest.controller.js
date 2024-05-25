import { clients } from "../index.js";
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
          maxDistance: 1000 * 1609,
          distanceField: "dist.calculated",
          spherical: true,
        },
      },
    ]).sort({ "dist.calculated": 1 });

    for (let i = 0; i < result.length; i++) {
      const client = clients.get(result.userId);

      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "data", data: data }));
        res
          .status(200)
          .json({ success: true, message: "Data sent to the user" });
      }
    }
    res.status(404).json({ success: false, message: "User not connected" });
    // console.log(result[0].userId);

    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
