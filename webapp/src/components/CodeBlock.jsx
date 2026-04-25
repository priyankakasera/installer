import { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

export default function CodeBlock({ children, className = '' }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`relative group ${className}`}>
      <pre className="bg-gray-50 dark:bg-[#0f1612] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-gray-300 overflow-x-auto font-mono">
        {children}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white dark:bg-[#1a2820] shadow-sm border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy"
      >
        {copied ? (
          <FiCheck className="w-3.5 h-3.5 text-primary" />
        ) : (
          <FiCopy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
