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
