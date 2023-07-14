import express from "express";
import {
  getAllMatches,
  getAllTeams,
  getLeaderboard,
  getAllMatchesByDate,
  getPlayerDetails
} from "../controller/apiController.js";

const router = express.Router();

router.get("/matches", (req, res) => getAllMatches(req, res));
router.get("/teams", (req, res) => getAllTeams(req, res));
router.get("/team/:teamId/player/:playerId",(req,res)=> getPlayerDetails(req,res));
router.get("/leaderboard", (req, res) => getLeaderboard(req, res));
router.get("/matches/:date", (req, res) => getAllMatchesByDate(req, res));


export default router;
