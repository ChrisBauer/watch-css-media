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

import {Observable} from 'rxjs/Rx';
import {map} from 'rxjs/operator/map';

export function WatchCSSMedia () {

    const queries = {};

    function defaultTransform (event, event$) {
        return {
            matches: event.matches,
            query: event.media.substring(1, event.media.substring.length - 1),
            originalEvent: event,
            event$: event$
        };
    }

    function addQuery (query, callback, transform) {
        const mql = window.matchMedia(`(${query})`),
            event$ = Observable.fromEventPattern(
                (cb) => mql.addListener(cb),
                (cb) => mql.removeListener(cb)
            )
                .map(event => transform ? transform(event, event$) : defaultTransform(event, event$))
                .startWith(mql.matches)
                .subscribe(callback);
        
        queries[query] = {
            callback: callback,
            mql: mql,
            event$: event$
        };

        return function unsubscribe () {
            mql.removeListener(callback);
            event$.dispose();
            delete queries[query];
        };
    }
    return {
        addQuery: (query, callback, transform) => {
            return addQuery(query, callback, transform);
        },
        addQueries: (args) => {
            if (!Array.isArray(args)) {
                throw new Error('expected Array but received ' + JSON.stringify(args));
            }
            return args.map( (arg) => addQuery.apply(addQuery, arg));
        },
        onOrientationChange: (callback) => {
            const query = 'orientation: landscape';
            return addQuery(query, callback,
                (event, event$) => { 
                    return {
                        matches: event.matches,
                        isLandscape: event.matches,
                        isPortrait: !event.matches,
                        query: query,
                        originalEvent: event,
                        event$: event$
                    };
                }
            ); 
        },
        onWidthGreaterThan: (min, callback) => {
            return addQuery(`min-width: ${min}`, callback);
        },
        onWidthLessThan: (max, callback) => {
            return addQuery(`max-width: ${max}`, callback);
        }
        
    };
}; 
