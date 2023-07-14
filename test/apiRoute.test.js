import {
    getAllMatches,
    getAllTeams,
    getLeaderboard,
    getAllMatchesByDate,
  } from '../controller/apiController.js';
  import { AllMatchesData, AllTeamsData } from '../service/Service.js';
  
  jest.mock('../service/Service.js', () => ({
    AllMatchesData: jest.fn(),
    AllTeamsData: jest.fn(),
  }));
  
  describe('Controller Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAllMatches', () => {
      it('should return data when available', () => {
        const mockData = [{ id: 1, name: 'Match 1' }];
        AllMatchesData.mockReturnValue(mockData);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllMatches({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data found',
          data: mockData,
        });
      });
  
      it('should return data not found message when no data available', () => {
        AllMatchesData.mockReturnValue([]);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllMatches({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data not found',
          data: [],
        });
      });
    });
  
    describe('getAllTeams', () => {
      it('should return data when available', () => {
        const mockData = [{ id: 1, name: 'Team 1' }];
        AllTeamsData.mockReturnValue(mockData);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllTeams({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data found',
          data: mockData,
        });
      });
  
      it('should return data not found message when no data available', () => {
        AllTeamsData.mockReturnValue([]);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllTeams({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data not found',
          data: [],
        });
      });
    });
  
    describe('getLeaderboard', () => {
      it('should return leaderboard data when available', () => {
        const mockTeamsData = [
          {
            name: 'Team 1',
            players: [
              { name: 'Player 1', score: 50, wickets: 3 },
              { name: 'Player 2', score: 75, wickets: 1 },
            ],
          },
          {
            name: 'Team 2',
            players: [
              { name: 'Player 3', score: 100, wickets: 2 },
              { name: 'Player 4', score: 30, wickets: 5 },
            ],
          },
        ];
  
        AllTeamsData.mockReturnValue(mockTeamsData);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getLeaderboard({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data found',
          data: [
            {
              team: 'Team 1',
              topScorers: [{ name: 'Player 2', score: 75, wickets: 1 }],
              topWicketTakers: [{ name: 'Player 1', score: 50, wickets: 3 }],
            },
            {
              team: 'Team 2',
              topScorers: [{ name: 'Player 3', score: 100, wickets: 2 }],
              topWicketTakers: [{ name: 'Player 4', score: 30, wickets: 5 }],
            },
          ],
        });
      });
  
      it('should return data not found message when no leaderboard data available', () => {
        AllTeamsData.mockReturnValue([]);
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getLeaderboard({}, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data not found',
          data: [],
        });
      });
    });
  
    describe('getAllMatchesByDate', () => {
      it('should return filtered matches when date is provided', () => {
        const mockData = [
          { id: 1, name: 'Match 1', date: new Date('2023-07-01') },
          { id: 2, name: 'Match 2', date: new Date('2023-07-02') },
        ];
  
        AllMatchesData.mockReturnValue(mockData);
  
        const req = {
          params: { date: '2023-07-01' },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllMatchesByDate(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data found',
          data: [mockData[0]],
        });
      });
  
      it('should return all matches when date is not provided', () => {
        const mockData = [
          { id: 1, name: 'Match 1', date: new Date('2023-07-01') },
          { id: 2, name: 'Match 2', date: new Date('2023-07-02') },
        ];
  
        AllMatchesData.mockReturnValue(mockData);
  
        const req = {
          params: { date: undefined },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllMatchesByDate(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data found',
          data: mockData,
        });
      });
  
      it('should return data not found message when no matches available', () => {
        AllMatchesData.mockReturnValue([]);
  
        const req = {
          params: { date: '2023-07-01' },
        };
  
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        getAllMatchesByDate(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: 'Data not found',
          data: [],
        });
      });
    });
  });
  