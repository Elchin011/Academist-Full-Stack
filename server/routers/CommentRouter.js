const express = require("express");

const { authProtectMiddleware } = require("../middleware/authProtectMiddleware");
const { createComment, getCommentsByProduct ,deleteComment, getProductRating } = require("../controllers/CommentController");


const router = express.Router();

router.get("/rating/:productId", getProductRating);
router.get("/:productId", getCommentsByProduct);

router.post("/", authProtectMiddleware, createComment);
router.delete("/:id", authProtectMiddleware, deleteComment);



module.exports = router;
