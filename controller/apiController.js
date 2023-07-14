import { getAllMatchesData } from "../service/Service.js";
import { getAllTeamsData } from "../service/Service.js";

export const getAllMatches = (req, res) => {
  const data = getAllMatchesData();
  res.status(200).json({
    message: data.length ? "Data found" : "Data not found",
    data: data,
  });
};

export const getAllTeams = (req, res) => {
  const data = getAllTeamsData();
  res.status(200).json({
    message: data.length ? "Data found" : "Data not found",
    data: data,
  });
};

export const getLeaderboard = (req, res) => {
  const leaderboard = getAllTeamsData().map((team) => {
    const topScorers = team.players.filter(
      (player) => player.score === Math.max(...team.players.map((p) => p.score))
    );

    const topWicketTakers = team.players.filter(
      (player) =>
        player.wickets === Math.max(...team.players.map((p) => p.wickets))
    );

    return {
      team: team.name,

      topScorers,

      topWicketTakers,
    };
  });

  res.status(200).json({
    message: leaderboard.length ? "Data found" : "Data not found",
    data: leaderboard,
  });
};

export const getAllMatchesByDate = (req, res) => {
  const { date } = req.params;
  const matches = getAllMatchesData();
  const filteredMatches = date
    ? matches.filter((match) => match.date.toISOString().split("T")[0] === date)
    : matches;

  res.status(200).json({
    message: filteredMatches.length ? "Data found" : "Data not found",
    data: filteredMatches,
  });
};
