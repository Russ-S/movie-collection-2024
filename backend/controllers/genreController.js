import asyncHandler from "../middlewares/asyncHandler.js";
import Genre from "../models/genreModel.js";

// @desc    Create genre
// @route   POST /api/genre
// @access  Private/Admin
const createGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const genreExists = await Genre.findOne({ name });

  if (genreExists) {
    res.status(400);
    throw new Error("Genre already exists");
  }

  const genre = await Genre.create({
    name,
  });

  if (genre) {
    res.status(201).json({
      _id: genre._id,
      name: genre.name,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add genre");
  }
});

// @desc    Get genres
// @route   GET /api/genre
// @access  Public
const getGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.find({}).sort({ name: 1 });
  res.json(genre);
});

// @desc    Get genre by ID
// @route   GET /api/genre/:id
// @access  Private/Admin
const getGenreById = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (genre) {
    return res.json(genre);
  } else {
    res.status(404);
    throw new Error("Genre not found");
  }
});

// @desc    Update genre
// @route   PUT /api/genre/:id
// @access  Private/Admin
const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const genre = await Genre.findById(req.params.id);

  if (genre) {
    genre.name = name;

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete genre
// @route   DELETE /api/genre/:id
// @access  Private/Admin
const deleteGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (genre) {
    await Genre.deleteOne({ _id: genre._id });
    res.status(200).json({ message: "Genre deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { createGenre, getGenre, getGenreById, updateGenre, deleteGenre };
