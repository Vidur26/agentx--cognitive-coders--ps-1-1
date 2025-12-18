
import { RLAlgorithm, Config } from './types';

export const GRID_SIZE = 10;

export const INITIAL_CONFIG: Config = {
  algorithm: RLAlgorithm.DQN,
  learningRate: 0.001,
  explorationRate: 0.1,
  discountFactor: 0.99,
  earlyStopping: true,
  earlyStoppingPatience: 10
};

export const PLATEAU_WINDOW = 5;
export const PLATEAU_THRESHOLD = 0.2;

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  bg: '#020617',
  card: '#0f172a',
  border: '#1e293b'
};
