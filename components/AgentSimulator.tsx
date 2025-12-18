
import React from 'react';
import { GRID_SIZE } from '../constants';
import { AgentState } from '../types';

interface Props {
  agent: AgentState;
  target: { x: number; y: number };
  obstacles: { x: number; y: number }[];
}

export const AgentSimulator: React.FC<Props> = ({ agent, target, obstacles }) => {
  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isAgent = agent.x === x && agent.y === y;
        const isTarget = target.x === x && target.y === y;
        const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);

        cells.push(
          <div 
            key={`${x}-${y}`} 
            className={`
              w-full h-full border border-slate-800/50 flex items-center justify-center relative
              ${isTarget ? 'bg-emerald-500/20' : ''}
              ${isObstacle ? 'bg-slate-800' : ''}
            `}
          >
            {isAgent && (
              <div className={`
                w-4/5 h-4/5 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] 
                transition-all duration-200 flex items-center justify-center
                ${agent.direction === 'up' ? '-rotate-90' : ''}
                ${agent.direction === 'down' ? 'rotate-90' : ''}
                ${agent.direction === 'left' ? 'rotate-180' : ''}
              `}>
                <div className="w-1/2 h-1/2 border-t-2 border-r-2 border-white rotate-45 transform -translate-x-0.5"></div>
              </div>
            )}
            {isTarget && !isAgent && (
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
            )}
            {isObstacle && (
              <div className="w-4 h-4 text-slate-600 flex items-center justify-center">×</div>
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <h3 className="text-white font-bold flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Environment Simulation
        </h3>
        <div className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full uppercase font-medium">
          {GRID_SIZE}x{GRID_SIZE} Discrete Space
        </div>
      </div>
      
      <div 
        className="grid bg-slate-950 rounded-lg overflow-hidden border border-slate-800"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '100%',
          maxWidth: '400px',
          aspectRatio: '1/1'
        }}
      >
        {renderGrid()}
      </div>

      <div className="mt-6 w-full grid grid-cols-3 gap-4">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">State</p>
          <p className="text-sm font-mono text-blue-400">[{agent.x}, {agent.y}]</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Reward</p>
          <p className="text-sm font-mono text-emerald-400">{agent.currentReward.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
          <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Episode</p>
          <p className="text-sm font-mono text-amber-400">#{agent.episode}</p>
        </div>
      </div>
    </div>
  );
};
