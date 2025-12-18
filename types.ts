
export enum RLAlgorithm {
  DQN = 'DQN',
  PPO = 'PPO',
  A2C = 'A2C'
}

export interface MetricsPoint {
  episode: number;
  reward: number;
  accuracy: number;
  speed: number;
}

export interface AgentState {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  currentReward: number;
  totalReward: number;
  status: 'IDLE' | 'TRAINING' | 'FINISHED';
  episode: number;
}

export interface LogEntry {
  timestamp: string;
  action: string;
  reward: number;
  state: string;
  type?: 'default' | 'warning' | 'success';
}

export interface Config {
  algorithm: RLAlgorithm;
  learningRate: number;
  explorationRate: number;
  discountFactor: number;
  earlyStopping: boolean;
  earlyStoppingPatience: number;
}
