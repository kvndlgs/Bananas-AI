import React from 'react';
import { Banana, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Banana className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-display font-bold text-neutral-800">
              Bananas
            </span>
            <span className="ml-2 text-sm text-neutral-500">
              © {new Date().getFullYear()} Podcast Generator
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://bolt.new"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center px-3 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
            >
              <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
                Built with Bolt.new
              </span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
