const Video = require("../models/Video");
const asyncHandler = require("./asyncHandler");
const AppError = require("../utils/AppError");

const verifyVideoOwnership = asyncHandler(async (req, _res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    throw new AppError("Video not found", 404);
  }

  const isOwner = video.owner.toString() === req.user._id.toString();
  const isDeleteByAdmin = req.method === "DELETE" && req.user.role === "admin";

  if (!isOwner && !isDeleteByAdmin) {
    throw new AppError("Forbidden", 403);
  }

  req.video = video;
  next();
});

module.exports = { verifyVideoOwnership };
