import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["land", "building"],
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["sale", "rent"],
    required: true, // Now required for all types
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  floors: {
    type: Number,
  },
  parking: {
    type: Number,
  },
  landCategory: {
    type: String,
    enum: ["Agricultural", "Residential", "Commercial"],
    required: function () {
      return this.type === "land";
    },
  },
  bedrooms: {
    type: String,
  },
  bathrooms: {
    type: String,
  },
  propertyAge: {
    type: String,
    enum: ["New", "<5 Years", "5-10 Years", ">10 Years"],
  },
  furnishing: {
    type: String,
    enum: ["Unfurnished", "Semi-furnished", "Fully-furnished"],
  },
  facing: {
    type: String,
    enum: [
      "Not Specified",
      "North",
      "South",
      "East",
      "West",
      "North-East",
      "North-West",
      "South-East",
      "South-West",
    ],
  },
  otherDetails: {
    type: String,
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false,
  },
  area: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  images: {
    type: [String],
    default: [],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Property =
  mongoose.models.Property || mongoose.model("Property", PropertySchema);
export default Property;