import asyncHandler from "../middlewares/asyncHandler.js";
import Movie from "../models/movieModel.js";

// @desc    create a movie
// @route   POST /api/movies
// @access   Private Admin
const createMovie = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    director,
    writer,
    cast,
    year,
    media,
    genre,
    rating,
    value,
    duration,
    description,
    location,
  } = req.body;

  const movieExists = await Movie.findOne({ title });

  if (movieExists) {
    res.status(400);
    throw new Error("Movie already exists");
  }

  const movie = await Movie.create({
    title,
    image,
    director,
    writer,
    cast,
    year,
    duration,
    media,
    genre,
    rating,
    value,
    description,
    location,
  });

  if (movie) {
    res.status(201).json({
      _id: movie._id,
      title: movie.title,
      image: movie.image,
      director: movie.director,
      writer: movie.writer,
      cast: movie.cast,
      year: movie.year,
      duration: movie.duration,
      media: movie.media,
      genre: movie.genre,
      rating: movie.rating,
      value: movie.value,
      duration: movie.duration,
      description: movie.description,
      location: movie.location,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add movie");
  }
});

// @desc    fetch all movies
// @route   GET /api/movies
// @access   Public
const getMovies = asyncHandler(async (req, res) => {
  // const pageSize = 6;
  // const page = Number(req.query.pageNumber) || 1;
  // const count = await Movie.countDocuments();

  const movie = await Movie.find({}).sort({ title: 1 });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  // res.json({ movie, page, pages: Math.ceil(count / pageSize) });
  res.json(movie);
});

// @desc    fetch a movie
// @route   GET /api/movies/:id
// @access   Public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    return res.json(movie);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  const {
    title,
    image,
    director,
    writer,
    cast,
    year,
    duration,
    media,
    genre,
    rating,
    value,
    description,
    location,
  } = req.body;

  const movie = await Movie.findById(req.params.id);

  if (movie) {
    movie.title = title || movie.title;
    movie.image = image || movie.image;
    movie.director = director || movie.director;
    movie.writer = writer || movie.writer;
    movie.cast = cast || movie.cast;
    movie.year = year || movie.year;
    movie.duration = duration || movie.duration;
    movie.media = media || movie.media;
    movie.genre = genre || movie.genre;
    movie.rating = rating || movie.rating;
    movie.value = value || movie.value;
    movie.description = description || movie.description;
    movie.location = location || movie.location;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete movie
// @route   DELETE /api/movie/:id
// @access  Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    await Movie.deleteOne({ _id: movie._id });
    res.status(200).json({ message: "Movie deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const filterMovies = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.media = checked;
    if (radio.length) args.genre = { $gte: radio[0], $lte: radio[1] };

    const movies = await Movie.find(args).sort({
      title: 1,
    });
    res.json(movies);
    console.log(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  filterMovies,
};
