'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WatchCSSMedia = WatchCSSMedia;

var _Rx = require('rxjs/Rx');

var _map = require('rxjs/operator/map');

/**
 * Copyright (c) 2016, Chris Bauer <cbauer@outlook.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any purpose
 * with or without fee is hereby granted, provided that the above copyright notice and
 * this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
 * OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE,
 * DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
 * ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

function WatchCSSMedia() {

    function defaultTransform(event, event$) {
        return {
            matches: event.matches,
            query: event.media.substring(1, event.media.substring.length - 1),
            originalEvent: event,
            event$: event$
        };
    }

    function _addQuery(query, callback, transform) {
        query = '(' + query + ')';
        transform = transform || defaultTransform;

        var mql = window.matchMedia(query),
            event$ = _Rx.Observable.fromEventPattern(function (cb) {
            return mql.addListener(cb);
        }, function (cb) {
            return mql.removeListener(cb);
        });

        event$.startWith({
            matches: mql.matches,
            media: query,
            originalEvent: null,
            event$: event$
        }).map(function (event) {
            return transform(event, event$);
        }).subscribe(callback);

        return event$;
    }

    return {
        addQuery: function addQuery(query, callback, transform) {
            return _addQuery(query, callback, transform);
        },
        addQueries: function addQueries(args) {
            if (!Array.isArray(args)) {
                throw new Error('expected Array but received ' + JSON.stringify(args));
            }
            return args.map(function (arg) {
                return _addQuery.apply(_addQuery, arg);
            });
        },
        onOrientationChange: function onOrientationChange(callback) {
            var query = 'orientation: landscape';
            return _addQuery(query, callback, function (event, event$) {
                return {
                    matches: event.matches,
                    isLandscape: event.matches,
                    isPortrait: !event.matches,
                    query: query,
                    originalEvent: event,
                    event$: event$
                };
            });
        },
        onWidthGreaterThan: function onWidthGreaterThan(min, callback) {
            return _addQuery('min-width: ' + min, callback);
        },
        onWidthLessThan: function onWidthLessThan(max, callback) {
            return _addQuery('max-width: ' + max, callback);
        }

    };
};
