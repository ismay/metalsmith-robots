/* eslint-disable no-param-reassign */
'use strict';

/**
 * Dependencies
 */
const debug = require('debug')('metalsmith-robots');
const robotize = require('robotize');

/**
 * Metalsmith plugin for generating a robots.txt file.
 *
 * @param {Object} options
 *   @property {String} useragent (optional)
 *   @property {Array} allow
 *   @property {Array} disallow
 *   @property {String} sitemap
 * @return {Function}
 */
module.exports = function plugin(opts) {
  /**
   * Init
   */
  opts = opts || {};

  // Create local arrays for allowed and disallowed pages
  const allow = [];
  const disallow = [];

  /**
   * Main plugin function
   */
  return function (files, metalsmith, done) {
    /**
     * Check for files with `public: true` in their metadata
     */
    for (const file in files) {
      if (files[file].public) {
        debug(`file marked as public: ${file}`);
        allow.push(file);
      }
    }

    // Add allowed pages to options
    if (allow.length) {
      if (opts.allow) {
        opts.allow = opts.allow.concat(allow);
      } else {
        opts.allow = allow;
      }
    }

    /**
     * Check for files with `private: true` in their metadata
     */
    for (const file in files) {
      if (files[file].private) {
        debug(`file marked as private: ${file}`);
        disallow.push(file);
      }
    }

    // Add allowed pages to options
    if (disallow.length) {
      if (opts.disallow) {
        opts.disallow = opts.disallow.concat(disallow);
      } else {
        opts.disallow = disallow;
      }
    }

    robotize(opts, (err, robots) => {
      if (err) {
        debug('skipping creation of robots.txt');
        done();
      } else {
        debug('creating robots.txt');
        // Create file
        files['robots.txt'] = {
          contents: new Buffer(robots)
        };
        done();
      }
    });
  };
};
