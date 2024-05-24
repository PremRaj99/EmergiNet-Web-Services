import Service from "../models/service.model";

export const updateServices = async (req, res, next) => {
  if (req.user.id !== req.params.userId && req.user.isServiceProvider) {
    return next(errorHandler(403, "You are not allowed to update this user."));
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
  if (!req.user.isAdmin && req.user.id !== req.params.userId && !req.user.isServiceProvider) {
    return next(errorHandler(403, "You are not allowed to delete this services."));
  }

  try {
    await Service.findOneAndDelete({userId: req.params.userId});
    res.status(200).json({ message: "Service has been deleted successfully." });
  } catch (error) {
    return next(error);
  }
};


export const getServices = async (req, res, next) => {};

export const getService = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to see this services."));
    }
    try {
      const service = await Service.findOne({ userId: req.params.userId });
      res.status(200).json(service);
    } catch (error) {
      return next(error);
    }
  
};
