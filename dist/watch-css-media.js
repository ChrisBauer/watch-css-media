'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WatchCSSMedia = WatchCSSMedia;

var _Rx = require('rxjs/Rx');

var _map = require('rxjs/operator/map');

function WatchCSSMedia() {

    var queries = {};

    function defaultTransform(event, event$) {
        return {
            matches: event.matches,
            query: event.media.substring(1, event.media.substring.length - 1),
            originalEvent: event,
            event$: event$
        };
    }

    function _addQuery(query, callback, transform) {
        var mql = window.matchMedia('(' + query + ')'),
            event$ = _Rx.Observable.fromEventPattern(function (cb) {
            return mql.addListener(cb);
        }, function (cb) {
            return mql.removeListener(cb);
        }).map(function (event) {
            return transform ? transform(event, event$) : defaultTransform(event, event$);
        }).startWith(mql.matches).subscribe(callback);

        queries[query] = {
            callback: callback,
            mql: mql,
            event$: event$
        };

        return function unsubscribe() {
            mql.removeListener(callback);
            event$.dispose();
            delete queries[query];
        };
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
