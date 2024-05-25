import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
      unique: true,
    },
    serviceName: {
      type: String,
      require: true,
    },
    servicePicture: {
      type: String,
      default:
        "https://i.pinimg.com/originals/57/8a/64/578a64085e5425bc7c653d09013a1520.png",
    },
    address: {
      type: String,
      require: true,
    },
    pin: {
      type: String,
      require: true,
    },
    location: {
      type: { type: String, require: true },
      coordinates: [],
    },
  },
  { timestamps: true }
);

serviceSchema.index({ location: "2dsphere" });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
