import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    director: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    cast: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
      default: "0.00",
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
