# AnnoTate

A full-text transcription web app, written for the Tate Britain.

---

## Commands

To install, clone the repo and run `npm install`

To develop locally, run `npm start`. Your browser will automatically be opened and directed to the browser-sync proxy address, and the server will serve files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp, and the changes injected to any open browsers pointed at the proxy address.

__NOTE__: this app wasn't developed against staging, so while there is a staging app for testing auth, it _probably won't work otherwise_. To get it running locally as expected, run `NODE_ENV=production npm start`;

To deploy to [http://preview.zooniverse.org/annotate/](http://preview.zooniverse.org/annotate/) run `npm run deploy-staging`.

To deploy to [https://anno.tate.org.uk/](https://anno.tate.org.uk) run `npm run deploy-production`.

---

## Built using:

- AngularJS
- Gulp
- Browserify
- Stylus
- Nib
- Bootstrap

## Conventions

- [johnpapa's AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide)
- [Gulp best practices](https://github.com/greypants/gulp-starter)
- [RSCSS](https://github.com/rstacruz/rscss)
- [Semantic Versioning](http://semver.org)
- [Keep A Changelog](http://keepachangelog.com/)

## Related links

* [Alpha version](http://preview.zooniverse.org/transcribe) - as of [5c954ca](https://github.com/zooniverse/annoTate/tree/5c954ca9b14ea719290b6c117b01e5cab5cf9e48)
* [Data aggregation algorithm](https://github.com/zooniverse/Tate-Transcriptions) by [ggdhines](https://github.com/ggdhines)
