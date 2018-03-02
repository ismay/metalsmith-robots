/* eslint-disable no-param-reassign */

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
 *   @property {Function} urlMangle
 * @return {Function}
 */
module.exports = (opts = {}) => (files, metalsmith, done) => {
  // Init
  opts.allow = opts.allow || [];
  opts.disallow = opts.disallow || [];

  Object.keys(files).forEach((filepath) => {
    const file = files[filepath];

    // Check for files with `public: true` in their metadata
    if (file.public) {
      debug(`file marked as public: ${filepath}`);
      opts.allow.push(filepath);
    }

    // Check for files with `private: true` in their metadata
    if (file.private) {
      debug(`file marked as private: ${filepath}`);
      opts.disallow.push(filepath);
    }
  });

  // Mangle urls if function provided
  if (typeof opts.urlMangle === 'function') {
    opts.allow = opts.allow.map(opts.urlMangle);
    opts.disallow = opts.disallow.map(opts.urlMangle);
  }

  robotize(opts, (err, robots) => {
    if (err) {
      debug('skipping creation of robots.txt');
      done();
    } else {
      debug('creating robots.txt');
      // Create file
      files['robots.txt'] = {
        contents: Buffer.from(robots, 'utf8')
      };
      done();
    }
  });
};
