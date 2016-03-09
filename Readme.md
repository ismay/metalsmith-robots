# metalsmith-robots

[![npm version][version-badge]][version-url]
[![build status][build-badge]][build-url]
[![dependency status][dependency-badge]][dependency-url]
[![devdependency status][devdependency-badge]][devdependency-url]
[![downloads][downloads-badge]][downloads-url]

> A metalsmith plugin for generating a robots.txt file

[![stack overflow][stackoverflow-badge]][stackoverflow-url]
[![slack chat][slack-badge]][slack-url]

This plugin allows you to generate a robots.txt file. It accepts global options, and can be triggered from a file's frontmatter with the `public` and `private` keywords. Works well with [metalsmith-mapsite](https://github.com/superwolff/metalsmith-mapsite), as that also accepts setting a page to private from the frontmatter.

For support questions please use [stack overflow][stackoverflow-url] or the metalsmith [slack channel][slack-url].

## Installation

```
$ npm install metalsmith-robots
```

## Example

Configuration in `metalsmith.json`:

```json
{
  "plugins": {
    "metalsmith-robots": {
      "useragent": "googlebot",
      "allow": ["index.html", "about.html"],
      "disallow": ["404.html"],
      "sitemap": "https://www.site.com/sitemap.xml"
    }
  }
}
```

Which will generate the following robots.txt:

```
User-agent: googlebot
Allow: index.html
Allow: about.html
Disallow: 404.html
Sitemap: https://www.site.com/sitemap.xml
```

## Options

You can pass options to `metalsmith-robots` with the [Javascript API](https://github.com/segmentio/metalsmith#api) or [CLI](https://github.com/segmentio/metalsmith#cli). The options are:

* `useragent`: the useragent - String, default: `*`
* `allow`: an array of the url(s) to allow - Array of Strings
* `disallow`: an array of the url(s) to disallow - Array of Strings
* `sitemap`: the sitemap url - String

Besides these options, settings `public: true` or `private: true` in a file's frontmatter will add that page to the `allow` or `disallow` option respectively. `metalsmith-robots` expects at least one of the last three options, without them it will not generate a robots.txt.

## License

MIT

[build-badge]: https://travis-ci.org/superwolff/metalsmith-robots.svg
[build-url]: https://travis-ci.org/superwolff/metalsmith-robots
[dependency-badge]: https://david-dm.org/superwolff/metalsmith-robots.svg
[dependency-url]: https://david-dm.org/superwolff/metalsmith-robots
[devdependency-badge]: https://david-dm.org/superwolff/metalsmith-robots/dev-status.svg
[devdependency-url]: https://david-dm.org/superwolff/metalsmith-robots#info=devDependencies
[downloads-badge]: https://img.shields.io/npm/dm/metalsmith-robots.svg
[downloads-url]: https://www.npmjs.com/package/metalsmith-robots
[slack-badge]: https://img.shields.io/badge/Slack-Join%20Chat%20→-blue.svg
[slack-url]: http://metalsmith-slack.herokuapp.com/
[stackoverflow-badge]: https://img.shields.io/badge/stack%20overflow-%23metalsmith-red.svg
[stackoverflow-url]: http://stackoverflow.com/questions/tagged/metalsmith
[version-badge]: https://img.shields.io/npm/v/metalsmith-robots.svg
[version-url]: https://www.npmjs.com/package/metalsmith-robots
