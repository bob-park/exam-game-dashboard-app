interface Game {
  id: number;
  name: string;
  description?: string;
}

interface GameDashboard {
  id: number;
  game: Game;
  homeScore: number;
  awayScore: number;
}
