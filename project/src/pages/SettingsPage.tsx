import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Shield, Zap, BookOpen, Code } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    aiModel: 'gpt-4',
    securityScanEnabled: true,
    performanceScanEnabled: true,
    bestPracticesScanEnabled: true,
    codeStyleScanEnabled: true,
    autoScanOnSave: false,
    scanThreshold: 70,
    languages: ['javascript', 'typescript', 'python', 'java'],
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setSettings({
        ...settings,
        [name]: target.checked,
      });
    } else {
      setSettings({
        ...settings,
        [name]: value,
      });
    }
  };

  const handleLanguageToggle = (language: string) => {
    if (settings.languages.includes(language)) {
      setSettings({
        ...settings,
        languages: settings.languages.filter(lang => lang !== language),
      });
    } else {
      setSettings({
        ...settings,
        languages: [...settings.languages, language],
      });
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Configure your NeuraLint preferences and AI analysis settings.
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">Analysis Configuration</h3>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </button>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="aiModel" className="block text-sm font-medium text-gray-700">
                AI Model
              </label>
              <select
                id="aiModel"
                name="aiModel"
                value={settings.aiModel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="gpt-4">GPT-4 (Most Accurate)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                <option value="codex">OpenAI Codex</option>
                <option value="custom">Custom Fine-tuned Model</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="scanThreshold" className="block text-sm font-medium text-gray-700">
                Scan Sensitivity Threshold ({settings.scanThreshold}%)
              </label>
              <input
                type="range"
                id="scanThreshold"
                name="scanThreshold"
                min="0"
                max="100"
                value={settings.scanThreshold}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
              <p className="mt-1 text-sm text-gray-500">
                Higher values will report only more severe issues.
              </p>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">Analysis Features</legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="securityScanEnabled"
                        name="securityScanEnabled"
                        type="checkbox"
                        checked={settings.securityScanEnabled}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="securityScanEnabled" className="font-medium text-gray-700 flex items-center">
                        <Shield className="h-4 w-4 text-red-500 mr-1" />
                        Security Vulnerability Detection
                      </label>
                      <p className="text-gray-500">
                        Detect SQL injections, XSS, buffer overflows, and other security issues.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="performanceScanEnabled"
                        name="performanceScanEnabled"
                        type="checkbox"
                        checked={settings.performanceScanEnabled}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="performanceScanEnabled" className="font-medium text-gray-700 flex items-center">
                        <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                        Performance Optimization
                      </label>
                      <p className="text-gray-500">
                        Identify performance bottlenecks and suggest optimizations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="bestPracticesScanEnabled"
                        name="bestPracticesScanEnabled"
                        type="checkbox"
                        checked={settings.bestPracticesScanEnabled}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="bestPracticesScanEnabled" className="font-medium text-gray-700 flex items-center">
                        <BookOpen className="h-4 w-4 text-blue-500 mr-1" />
                        Best Practices
                      </label>
                      <p className="text-gray-500">
                        Suggest code improvements based on industry best practices.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="codeStyleScanEnabled"
                        name="codeStyleScanEnabled"
                        type="checkbox"
                        checked={settings.codeStyleScanEnabled}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="codeStyleScanEnabled" className="font-medium text-gray-700 flex items-center">
                        <Code className="h-4 w-4 text-indigo-500 mr-1" />
                        Code Style & Formatting
                      </label>
                      <p className="text-gray-500">
                        Enforce consistent code style and formatting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="autoScanOnSave"
                        name="autoScanOnSave"
                        type="checkbox"
                        checked={settings.autoScanOnSave}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="autoScanOnSave" className="font-medium text-gray-700">
                        Auto-scan on Save
                      </label>
                      <p className="text-gray-500">
                        Automatically analyze code when saved.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">Supported Languages</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['javascript', 'typescript', 'python', 'java', 'c++', 'go', 'ruby', 'php', 'rust', 'swift'].map(language => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        settings.languages.includes(language)
                          ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                          : 'bg-gray-100 text-gray-800 border-2 border-transparent'
                      }`}
                    >
                      {language.charAt(0).toUpperCase() + language.slice(1)}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;