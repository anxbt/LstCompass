import React from 'react';
import { Twitter, Github, Mail, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About LstCompass
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              LstCompass is your comprehensive platform for tracking and analyzing liquid staking tokens.
              We provide real-time data, analytics, and insights to help you make informed decisions in
              the liquid staking ecosystem.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/anxbrt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com/anxbt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:anubrat23@gmail.com"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Mail size={20} />
              </a>
            
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/markets" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Markets
                </a>
              </li>
              <li>
                <a href="/protocols" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Protocols
                </a>
              </li>
              <li>
                <a href="/stake-swap" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Stake & Swap
                </a>
              </li>
              <li>
                <a href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                <strong>Email:</strong>
                <br />
                <a href="mailto:anubrat23@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                  anubrat23@gmail.com
                </a>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <strong>Feature request</strong>
                <br />
                <a 
                  href="https://forms.gle/XYjJyV26RfK3usQ97" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                > Submit your request
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} LstCompass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}