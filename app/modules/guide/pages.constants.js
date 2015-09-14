'use strict';

require('./guide.module.js')
    .constant('GuidePages', [
        {
            slug: 'overview',
            title: 'Overview'
        },
        {
            slug: 'line-by-line',
            title: 'Line by line transcription'
        },
        {
            slug: 'transcribing',
            title: 'Annotating text'
        },
        {
            slug: 'images',
            title: 'Annotating images'
        },
        {
            slug: 'already-transcribed',
            title: 'Black dots / previously transcribed lines'
        },
        {
            slug: 'blank',
            title: 'Blank pages'
        },
        {
            slug: 'insertion',
            title: 'Inserted text'
        },
        {
            slug: 'deletion',
            title: 'Deleted text'
        },
        {
            slug: 'illegible',
            title: 'Illegible text'
        },
        {
            slug: 'not-english',
            title: 'Non-English languages'
        }
    ]);


