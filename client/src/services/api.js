const gameService = {
  getProgress: async (gameId, token) => {
    try {
      const response = await fetch(`/api/progress/${gameId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching progress:', error);
      throw error;
    }
  },

  updateProgress: async (gameId, data, token) => {
    try {
      const response = await fetch(`/api/progress/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  },

  submitScore: async (gameId, scoreData, token) => {
    try {
      const response = await fetch(`/api/scores/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(scoreData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error submitting score:', error);
      throw error;
    }
  },

  getLeaderboard: async (gameId) => {
    try {
      const response = await fetch(`/api/scores/leaderboard/${gameId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw error;
    }
  },

  getUserScores: async (gameId, token) => {
    try {
      const response = await fetch(`/api/scores/user/${gameId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching user scores:', error);
      throw error;
    }
  }
};

export { gameService }; 