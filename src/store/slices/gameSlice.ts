import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GameMode = 'study' | 'challenge' | 'timed';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DepartmentPlacement {
  departmentId: string;
  correct: boolean;
}

export interface GameState {
  currentMode: GameMode;
  score: number;
  correctPlacements: number;
  incorrectPlacements: number;
  hintsUsed: number;
  timeElapsed: number;
  isGameActive: boolean;
  selectedDepartment: string | null;
  placedDepartments: DepartmentPlacement[];
  difficulty: Difficulty;
}

const initialState: GameState = {
  currentMode: 'study',
  score: 0,
  correctPlacements: 0,
  incorrectPlacements: 0,
  hintsUsed: 0,
  timeElapsed: 0,
  isGameActive: false,
  selectedDepartment: null,
  placedDepartments: [],
  difficulty: 'medium',
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameMode: (state, action: PayloadAction<GameMode>) => {
      state.currentMode = action.payload;
    },
    startGame: (state) => {
      state.isGameActive = true;
      state.timeElapsed = 0;
      state.score = 0;
      state.correctPlacements = 0;
      state.incorrectPlacements = 0;
      state.hintsUsed = 0;
      state.placedDepartments = [];
    },
    endGame: (state) => {
      state.isGameActive = false;
    },
    incrementScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    recordCorrectPlacement: (state) => {
      state.correctPlacements += 1;
    },
    recordIncorrectPlacement: (state) => {
      state.incorrectPlacements += 1;
    },
    useHint: (state) => {
      state.hintsUsed += 1;
    },
    updateTimeElapsed: (state, action: PayloadAction<number>) => {
      state.timeElapsed = action.payload;
    },
    selectDepartment: (state, action: PayloadAction<string>) => {
      state.selectedDepartment = action.payload;
    },
    placeDepartment: (state, action: PayloadAction<DepartmentPlacement>) => {
      state.placedDepartments.push(action.payload);
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
    resetGame: () => initialState,
  },
});

export const {
  setGameMode,
  startGame,
  endGame,
  incrementScore,
  recordCorrectPlacement,
  recordIncorrectPlacement,
  useHint,
  updateTimeElapsed,
  selectDepartment,
  placeDepartment,
  setDifficulty,
  resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
