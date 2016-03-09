/* eslint-env mocha */
'use strict';

const equal = require('assert-dir-equal');
const metalsmith = require('metalsmith');
const robots = require('..');

describe('metalsmith-robots', () => {
  it('should accept an allow option', (done) => {
    metalsmith('test/fixtures/allow')
      .use(robots({
        allow: ['allowed-1.html', 'allowed-2.html']
      }))
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/allow/expected', 'test/fixtures/allow/build');
        return done();
      });
  });

  it('should accept a disallow option', (done) => {
    metalsmith('test/fixtures/disallow')
      .use(robots({
        disallow: ['disallowed-1.html', 'disallowed-2.html']
      }))
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/disallow/expected', 'test/fixtures/disallow/build');
        return done();
      });
  });

  it('should not create robots.txt without allow, disallow or sitemap', (done) => {
    metalsmith('test/fixtures/no-empty')
      .use(robots())
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/no-empty/expected', 'test/fixtures/no-empty/build');
        return done();
      });
  });

  it('should disallow private pages', (done) => {
    metalsmith('test/fixtures/private')
      .use(robots())
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/private/expected', 'test/fixtures/private/build');
        return done();
      });
  });

  it('should allow public pages', (done) => {
    metalsmith('test/fixtures/public')
      .use(robots())
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/public/expected', 'test/fixtures/public/build');
        return done();
      });
  });

  it('should accept a sitemap option', (done) => {
    metalsmith('test/fixtures/sitemap')
      .use(robots({
        sitemap: 'https://www.site.com/sitemap.xml'
      }))
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/sitemap/expected', 'test/fixtures/sitemap/build');
        return done();
      });
  });

  it('should accept a useragent option', (done) => {
    metalsmith('test/fixtures/useragent')
      .use(robots({
        useragent: 'googlebot',
        sitemap: 'https://www.site.com/sitemap.xml'
      }))
      .build((err) => {
        if (err) {
          return done(err);
        }
        equal('test/fixtures/useragent/expected', 'test/fixtures/useragent/build');
        return done();
      });
  });
});
