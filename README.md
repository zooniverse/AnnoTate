# AnnoTate

A full-text transcription web app, written for the Tate Britain.

---

## Commands

To install, clone the repo and run `npm install`

To develop locally, run `gulp dev`. Your browser will automatically be opened and directed to the browser-sync proxy address, and the server will serve files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp, and the changes injected to any open browsers pointed at the proxy address.

To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the Express server).

To deploy to [preview.zooniverse.org/transcribe](http://preview.zooniverse.org/transcribe), run `make deploy-preview`

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
