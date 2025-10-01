import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PerformanceState {
  fps: number;
  renderTime: number;
  memoryUsage: number;
  interactionLatency: number;
  bundleSize: number;
  cacheHitRate: number;
  errorRate: number;
}

const initialState: PerformanceState = {
  fps: 60,
  renderTime: 16,
  memoryUsage: 0,
  interactionLatency: 0,
  bundleSize: 0,
  cacheHitRate: 0,
  errorRate: 0,
};

const performanceSlice = createSlice({
  name: 'performance',
  initialState,
  reducers: {
    updateFPS: (state, action: PayloadAction<number>) => {
      state.fps = action.payload;
    },
    updateRenderTime: (state, action: PayloadAction<number>) => {
      state.renderTime = action.payload;
    },
    updateMemoryUsage: (state, action: PayloadAction<number>) => {
      state.memoryUsage = action.payload;
    },
    updateInteractionLatency: (state, action: PayloadAction<number>) => {
      state.interactionLatency = action.payload;
    },
    updateBundleSize: (state, action: PayloadAction<number>) => {
      state.bundleSize = action.payload;
    },
    updateCacheHitRate: (state, action: PayloadAction<number>) => {
      state.cacheHitRate = action.payload;
    },
    updateErrorRate: (state, action: PayloadAction<number>) => {
      state.errorRate = action.payload;
    },
    resetMetrics: () => initialState,
  },
});

export const {
  updateFPS,
  updateRenderTime,
  updateMemoryUsage,
  updateInteractionLatency,
  updateBundleSize,
  updateCacheHitRate,
  updateErrorRate,
  resetMetrics,
} = performanceSlice.actions;

export default performanceSlice.reducer;
