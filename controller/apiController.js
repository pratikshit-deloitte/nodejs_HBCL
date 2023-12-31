import { AllMatchesData } from "../service/Service.js";
import { AllTeamsData } from "../service/Service.js";

export const getAllMatches = (req, res) => {
  const data = AllMatchesData();
  res.status(200).json({
    message: data.length ? "Data found" : "Data not found",
    data: data,
  });
};

export const getAllTeams = (req, res) => {
  const data = AllTeamsData();
  res.status(200).json({
    message: data.length ? "Data found" : "Data not found",
    data: data,
  });
};

export const getLeaderboard = (req, res) => {
  const leaderboard = AllTeamsData().map((team) => {
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
  const matches = AllMatchesData();
  const filteredMatches = date
    ? matches.filter((match) => match.date.toISOString().split("T")[0] === date)
    : matches;

  res.status(200).json({
    message: filteredMatches.length ? "Data found" : "Data not found",
    data: filteredMatches,
  });
};

export const getPlayerDetails =(req,res) =>{
  const{playerId,teamId} =req.params;
  
  const teams = AllTeamsData();
  const match = AllMatchesData();
  const team = teams.find(team => team.id === teamId);
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }

  // Find the player in the team
  const playerDetails = team.players.find(player => player.id === playerId);
  if (!playerDetails) {
    return res.status(404).json({ error: "Player not found" });
  }


  res.status(200).json({
    message: playerDetails.length ? "Data found" : "",
    data: playerDetails,
  });
};

