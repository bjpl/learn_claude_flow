/**
 * Enhanced Document Store
 * Extended document management with analytics, favorites, and learning paths
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Document } from '../types';

export interface DocumentMetadata {
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  readingTime?: number; // in minutes
  prerequisites?: string[]; // document IDs
  nextSteps?: string[]; // document IDs
  lastModified?: string;
  version?: string;
}

export interface DocumentAnalytics {
  viewCount: number;
  lastViewed: string;
  timeSpent: number; // in seconds
  completed: boolean;
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  documents: string[]; // document IDs in order
  estimatedTime: number; // total minutes
  completedDocuments: Set<string>;
}

interface EnhancedDocumentStore {
  // Document metadata
  metadata: Map<string, DocumentMetadata>;
  setMetadata: (docId: string, meta: DocumentMetadata) => void;
  getMetadata: (docId: string) => DocumentMetadata | undefined;

  // Analytics
  analytics: Map<string, DocumentAnalytics>;
  trackView: (docId: string) => void;
  trackTimeSpent: (docId: string, seconds: number) => void;
  markCompleted: (docId: string) => void;
  getAnalytics: (docId: string) => DocumentAnalytics | undefined;
  getMostViewed: (limit?: number) => Array<{ docId: string; views: number }>;
  getRecentlyViewed: (limit?: number) => string[];

  // Favorites/Bookmarks
  favorites: Set<string>;
  toggleFavorite: (docId: string) => void;
  isFavorite: (docId: string) => boolean;
  getFavorites: () => string[];

  // Learning Paths
  learningPaths: Map<string, LearningPath>;
  addLearningPath: (path: LearningPath) => void;
  updateLearningPath: (pathId: string, updates: Partial<LearningPath>) => void;
  removeLearningPath: (pathId: string) => void;
  getLearningPath: (pathId: string) => LearningPath | undefined;
  getAllLearningPaths: () => LearningPath[];
  completePathDocument: (pathId: string, docId: string) => void;

  // Search history
  searchHistory: string[];
  addSearch: (query: string) => void;
  getRecentSearches: (limit?: number) => string[];
  clearSearchHistory: () => void;

  // Tags
  customTags: Map<string, string[]>; // docId -> custom tags
  addCustomTag: (docId: string, tag: string) => void;
  removeCustomTag: (docId: string, tag: string) => void;
  getCustomTags: (docId: string) => string[];
}

// Calculate reading time based on markdown content length
export const calculateReadingTime = (content: string): number => {
  const words = content.split(/\s+/).length;
  const readingSpeed = 200; // words per minute
  return Math.max(1, Math.ceil(words / readingSpeed));
};

// Determine difficulty based on document characteristics
export const inferDifficulty = (doc: Document): DocumentMetadata['difficulty'] => {
  const title = doc.title.toLowerCase();
  const tags = (doc.tags || []).map(t => t.toLowerCase());

  // Beginner indicators
  if (
    title.includes('getting started') ||
    title.includes('intro') ||
    title.includes('basics') ||
    tags.includes('beginner')
  ) {
    return 'beginner';
  }

  // Expert indicators
  if (
    title.includes('advanced') ||
    title.includes('expert') ||
    tags.includes('consensus') ||
    tags.includes('distributed') ||
    tags.includes('neural')
  ) {
    return 'expert';
  }

  // Advanced indicators
  if (
    title.includes('optimization') ||
    title.includes('performance') ||
    tags.includes('swarm')
  ) {
    return 'advanced';
  }

  // Default to intermediate
  return 'intermediate';
};

export const useEnhancedDocumentStore = create<EnhancedDocumentStore>()(
  persist(
    (set, get) => ({
      // Metadata
      metadata: new Map(),

      setMetadata: (docId, meta) =>
        set((state) => {
          const newMetadata = new Map(state.metadata);
          newMetadata.set(docId, meta);
          return { metadata: newMetadata };
        }),

      getMetadata: (docId) => get().metadata.get(docId),

      // Analytics
      analytics: new Map(),

      trackView: (docId) =>
        set((state) => {
          const newAnalytics = new Map(state.analytics);
          const current = newAnalytics.get(docId) || {
            viewCount: 0,
            lastViewed: new Date().toISOString(),
            timeSpent: 0,
            completed: false,
          };

          newAnalytics.set(docId, {
            ...current,
            viewCount: current.viewCount + 1,
            lastViewed: new Date().toISOString(),
          });

          return { analytics: newAnalytics };
        }),

      trackTimeSpent: (docId, seconds) =>
        set((state) => {
          const newAnalytics = new Map(state.analytics);
          const current = newAnalytics.get(docId) || {
            viewCount: 0,
            lastViewed: new Date().toISOString(),
            timeSpent: 0,
            completed: false,
          };

          newAnalytics.set(docId, {
            ...current,
            timeSpent: current.timeSpent + seconds,
          });

          return { analytics: newAnalytics };
        }),

      markCompleted: (docId) =>
        set((state) => {
          const newAnalytics = new Map(state.analytics);
          const current = newAnalytics.get(docId) || {
            viewCount: 0,
            lastViewed: new Date().toISOString(),
            timeSpent: 0,
            completed: false,
          };

          newAnalytics.set(docId, {
            ...current,
            completed: true,
          });

          return { analytics: newAnalytics };
        }),

      getAnalytics: (docId) => get().analytics.get(docId),

      getMostViewed: (limit = 10) => {
        const analytics = Array.from(get().analytics.entries());
        return analytics
          .map(([docId, data]) => ({ docId, views: data.viewCount }))
          .sort((a, b) => b.views - a.views)
          .slice(0, limit);
      },

      getRecentlyViewed: (limit = 10) => {
        const analytics = Array.from(get().analytics.entries());
        return analytics
          .sort((a, b) =>
            new Date(b[1].lastViewed).getTime() - new Date(a[1].lastViewed).getTime()
          )
          .map(([docId]) => docId)
          .slice(0, limit);
      },

      // Favorites
      favorites: new Set(),

      toggleFavorite: (docId) =>
        set((state) => {
          const newFavorites = new Set(state.favorites);
          if (newFavorites.has(docId)) {
            newFavorites.delete(docId);
          } else {
            newFavorites.add(docId);
          }
          return { favorites: newFavorites };
        }),

      isFavorite: (docId) => get().favorites.has(docId),

      getFavorites: () => Array.from(get().favorites),

      // Learning Paths
      learningPaths: new Map(),

      addLearningPath: (path) =>
        set((state) => {
          const newPaths = new Map(state.learningPaths);
          newPaths.set(path.id, path);
          return { learningPaths: newPaths };
        }),

      updateLearningPath: (pathId, updates) =>
        set((state) => {
          const newPaths = new Map(state.learningPaths);
          const current = newPaths.get(pathId);
          if (current) {
            newPaths.set(pathId, { ...current, ...updates });
          }
          return { learningPaths: newPaths };
        }),

      removeLearningPath: (pathId) =>
        set((state) => {
          const newPaths = new Map(state.learningPaths);
          newPaths.delete(pathId);
          return { learningPaths: newPaths };
        }),

      getLearningPath: (pathId) => get().learningPaths.get(pathId),

      getAllLearningPaths: () => Array.from(get().learningPaths.values()),

      completePathDocument: (pathId, docId) =>
        set((state) => {
          const newPaths = new Map(state.learningPaths);
          const path = newPaths.get(pathId);
          if (path) {
            const newCompleted = new Set(path.completedDocuments);
            newCompleted.add(docId);
            newPaths.set(pathId, {
              ...path,
              completedDocuments: newCompleted,
            });
          }
          return { learningPaths: newPaths };
        }),

      // Search History
      searchHistory: [],

      addSearch: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;

          const newHistory = [
            trimmed,
            ...state.searchHistory.filter(q => q !== trimmed)
          ].slice(0, 20);

          return { searchHistory: newHistory };
        }),

      getRecentSearches: (limit = 10) => get().searchHistory.slice(0, limit),

      clearSearchHistory: () => set({ searchHistory: [] }),

      // Custom Tags
      customTags: new Map(),

      addCustomTag: (docId, tag) =>
        set((state) => {
          const newTags = new Map(state.customTags);
          const current = newTags.get(docId) || [];
          if (!current.includes(tag)) {
            newTags.set(docId, [...current, tag]);
          }
          return { customTags: newTags };
        }),

      removeCustomTag: (docId, tag) =>
        set((state) => {
          const newTags = new Map(state.customTags);
          const current = newTags.get(docId) || [];
          newTags.set(docId, current.filter(t => t !== tag));
          return { customTags: newTags };
        }),

      getCustomTags: (docId) => get().customTags.get(docId) || [],
    }),
    {
      name: 'enhanced-document-store',
      // Custom serialization for Maps and Sets
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const data = JSON.parse(str);

          // Deserialize Maps and Sets
          return {
            state: {
              ...data.state,
              metadata: new Map(data.state.metadata),
              analytics: new Map(data.state.analytics),
              favorites: new Set(data.state.favorites),
              learningPaths: new Map(
                data.state.learningPaths.map((path: any) => [
                  path.id,
                  { ...path, completedDocuments: new Set(path.completedDocuments) }
                ])
              ),
              customTags: new Map(data.state.customTags),
            }
          };
        },
        setItem: (name, value) => {
          const data = {
            state: {
              ...value.state,
              metadata: Array.from((value.state.metadata as Map<any, any>).entries()),
              analytics: Array.from((value.state.analytics as Map<any, any>).entries()),
              favorites: Array.from(value.state.favorites as Set<any>),
              learningPaths: Array.from((value.state.learningPaths as Map<any, any>).values()),
              customTags: Array.from((value.state.customTags as Map<any, any>).entries()),
            }
          };
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// Initialize default learning paths
export const DEFAULT_LEARNING_PATHS: LearningPath[] = [
  {
    id: 'getting-started',
    name: 'Getting Started with Claude Flow',
    description: 'Learn the basics of Claude Flow and agent coordination',
    difficulty: 'beginner',
    documents: [
      'claude',
      'agents-core-coder',
      'agents-core-researcher',
      'commands-coordination-swarm-init',
      'commands-coordination-agent-spawn',
    ],
    estimatedTime: 45,
    completedDocuments: new Set(),
  },
  {
    id: 'agent-development',
    name: 'Agent Development',
    description: 'Master creating and coordinating intelligent agents',
    difficulty: 'intermediate',
    documents: [
      'agents-readme',
      'agents-core-planner',
      'agents-core-coder',
      'agents-core-tester',
      'agents-core-reviewer',
      'agents-templates-coordinator-swarm-init',
    ],
    estimatedTime: 90,
    completedDocuments: new Set(),
  },
  {
    id: 'consensus-systems',
    name: 'Distributed Consensus',
    description: 'Learn advanced consensus algorithms and coordination',
    difficulty: 'expert',
    documents: [
      'agents-consensus-byzantine-coordinator',
      'agents-consensus-raft-manager',
      'agents-consensus-gossip-coordinator',
      'agents-consensus-quorum-manager',
    ],
    estimatedTime: 120,
    completedDocuments: new Set(),
  },
  {
    id: 'github-automation',
    name: 'GitHub Automation Mastery',
    description: 'Automate GitHub workflows with agents',
    difficulty: 'intermediate',
    documents: [
      'agents-github-pr-manager',
      'agents-github-code-review-swarm',
      'agents-github-issue-tracker',
      'commands-github-repo-analyze',
    ],
    estimatedTime: 75,
    completedDocuments: new Set(),
  },
];
