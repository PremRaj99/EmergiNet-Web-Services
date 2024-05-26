import Service from "../models/service.model.js";
import { sendRequest } from "../index.js";
import User from "../models/user.model.js";

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

    const userData = await User.findById(req.params.userId);
    console.log(userData)

    // const [password, ...rest] = userData._doc;


    sendRequest(req, result, userData) &&   res.status(200).json(sendRequest(req, result, userData));

    res.status(404).json({ success: false, message: "User not connected" });
    // console.log(result[0].userId);

    // res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};
