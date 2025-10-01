/**
 * SettingsRoute Component
 * User preferences and application settings
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Book, Zap } from 'lucide-react';
import { SEO } from '../components/seo';

export default function SettingsRoute() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [defaultZoom, setDefaultZoom] = useState(1.0);
  const [showPageNumbers, setShowPageNumbers] = useState(true);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO
        title="Settings"
        description="Configure your Learn Claude Flow experience with personalized settings and preferences"
        noindex={true}
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Customize your documentation viewing experience</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-yellow-600" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 px-4 py-3 border rounded-lg transition-colors ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Sun className="w-5 h-5 mx-auto mb-1" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 px-4 py-3 border rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Moon className="w-5 h-5 mx-auto mb-1" />
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Document Viewer</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Zoom Level: {defaultZoom.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={defaultZoom}
                onChange={(e) => setDefaultZoom(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Show Page Numbers
              </label>
              <button
                onClick={() => setShowPageNumbers(!showPageNumbers)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showPageNumbers ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showPageNumbers ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-900">Performance</h2>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>• Documents are lazy loaded for optimal performance</p>
            <p>• Page changes update URL for bookmarkable links</p>
            <p>• Settings are automatically saved to local storage</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => navigate('/')}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save & Return Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
      </div>
    </>
  );
}
