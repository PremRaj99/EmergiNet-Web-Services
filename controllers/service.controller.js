import Service from "../models/service.model.js";
import User from "../models/user.model.js";

export const registerServices = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to register this service.")
    );
  }
  try {
    const service = await Service.findOne({ userId: req.params.userId });
    if (service) {
      return next(errorHandler(403, "You have already registered a service."));
    }
    if (!req.body.longitude && !req.body.latitude) {
      return next(errorHandler(400, "Please provide longitude and latitude."));
    }
    const registerService = new Service({
      userId: req.params.userId,
      serviceName: req.body.serviceName,
      servicePicture: req.body.servicePicture,
      address: req.body.address,
      pin: req.body.pin,
      location: {
        type: "Path",
        cordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
    });

    await registerService.save();
    const upgradeUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: { isServiceProvider: true },
      },
      { new: true }
    );
    res.status(200).json(registerService);
  } catch (error) {
    return next(error);
  }
};

export const updateServices = async (req, res, next) => {
  if (req.user.id !== req.params.userId && req.user.isServiceProvider) {
    return next(
      errorHandler(403, "You are not allowed to update this service.")
    );
  }
  try {
    const updateService = await Service.findOneAndUpdate(
      { userId: req.params.userId },
      {
        $set: {
          serviceName: req.body.serviceName,
          servicePicture: req.body.servicePicture,
          address: req.body.address,
          pin: req.body.pin,
          location: req.body.location,
        },
      },
      { new: true }
    );
    res.status(200).json(updateService);
  } catch (error) {
    return next(error);
  }
};

export const deleteServices = async (req, res, next) => {
  if (
    !req.user.isAdmin &&
    req.user.id !== req.params.userId &&
    !req.user.isServiceProvider
  ) {
    return next(
      errorHandler(403, "You are not allowed to delete this services.")
    );
  }

  try {
    await Service.findOneAndDelete({ userId: req.params.userId });
    const degradeUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: { isServiceProvider: false },
      },
      { new: true }
    );
    res
      .status(200)
      .json({
        message:
          "Service has been deleted successfully. You are no longer service provider.",
      });
  } catch (error) {
    return next(error);
  }
};

export const getServices = async (req, res, next) => {};

export const getService = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to see this services."));
  }
  try {
    const service = await Service.findOne({ userId: req.params.userId });
    res.status(200).json(service);
  } catch (error) {
    return next(error);
  }
};
