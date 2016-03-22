# watch-css-media
Provides an easy way to provide callbacks for when the browser crosses the threshold of a media query. Uses the Observable API to allow for composable event streams

### getting the code
install from npm: `npm install watch-css-media`

use in your project:

`import {WatchCSSMedia} from 'watch-css-media';`
Or
`var WatchCSSMedia = require('watch-css-media');`

### running the tests
Install the dependencies using `npm install`

Run the tests using `npm test`

Transpile to ES5 using `npm run build`

Build the docs using `npm run doc`

Generate the docs for the readme with `npm run build-readme`

# API Reference

## <a name="module_WatchCSSMedia">WatchCSSMedia</a>

* [WatchCSSMedia](#module_WatchCSSMedia)
    * [.addQuery(query, callback, [transform])](#module_WatchCSSMedia+addQuery) ⇒ <code>Observable</code>
    * [.addQueries(args)](#module_WatchCSSMedia+addQueries) ⇒ <code>Array.&lt;Observable&gt;</code>
    * [.onOrientationChange(callback)](#module_WatchCSSMedia+onOrientationChange) ⇒ <code>Observable</code>
    * [.onWidthGreaterThan(min, callback, [transform])](#module_WatchCSSMedia+onWidthGreaterThan) ⇒ <code>Observable</code>
    * [.onWidthLessThan(min, callback, [transform])](#module_WatchCSSMedia+onWidthLessThan) ⇒ <code>Observable</code>

<a name="module_WatchCSSMedia+addQuery"></a>

### watchCSSMedia.addQuery(query, callback, [transform]) ⇒ <code>Observable</code>
General function to create a media query listener from a specified media query

**Kind**: instance method of <code>[WatchCSSMedia](#module_WatchCSSMedia)</code>  
**Returns**: <code>Observable</code> - An Observable event stream created from the MediaQueryList listener  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>string</code> | a media query, which will be watched |
| callback | <code>function</code> | a function to call when the media query boundary is changed        Unless a transform function is provided, the callback function will be invoked         with an object containing the following keys:        `matches: boolean. whether (true) or not (false) the browser matches the specified query`        `query: string. the original media query string`        `originalEvent: Event. the original event that triggered the callback`        `event$: Observable. An Observable event stream created from the MediaQueryList listener |
| [transform] | <code>function</code> | an optional function to map the mql event object to the        parameter passed into the callback |

<a name="module_WatchCSSMedia+addQueries"></a>

### watchCSSMedia.addQueries(args) ⇒ <code>Array.&lt;Observable&gt;</code>
Shortcut method to add multiple listeners. Each element in the arguments array corresponds to the 
parameters of [addQuery](#module_WatchCSSMedia+addQuery)

**Kind**: instance method of <code>[WatchCSSMedia](#module_WatchCSSMedia)</code>  
**Returns**: <code>Array.&lt;Observable&gt;</code> - An Array of Observable event streams created from the MediaQueryList listeners  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>Array</code> | an array of {query, callback, transform} objects |

<a name="module_WatchCSSMedia+onOrientationChange"></a>

### watchCSSMedia.onOrientationChange(callback) ⇒ <code>Observable</code>
Shortcut method to add an event listener for orientation changes

**Kind**: instance method of <code>[WatchCSSMedia](#module_WatchCSSMedia)</code>  
**Returns**: <code>Observable</code> - An Observable event stream created from the MediaQueryList listener  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | a callback function to execute when the orientation changes        The callback function will be invoked with an object containing the following keys:        `isLandscape: boolean. whether (true) or not (false) the device is now in landscape orientation`        `isPortrait: boolean. whether (true) or not (false) the device is now in portrait orientation`        `query: string. the original media query string`        `originalEvent: Event. the original event that triggered the callback`        `event$: Observable. An Observable event stream created from the MediaQueryList listener |

<a name="module_WatchCSSMedia+onWidthGreaterThan"></a>

### watchCSSMedia.onWidthGreaterThan(min, callback, [transform]) ⇒ <code>Observable</code>
Shortcut method to add an event listener for browser width changes. This allows for easy
creation of callbacks that fire when the browser crosses certain width thresholds without
having to use `window.on('resize');`

**Kind**: instance method of <code>[WatchCSSMedia](#module_WatchCSSMedia)</code>  
**Returns**: <code>Observable</code> - An Observable event stream created from the MediaQueryList listener  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>string</code> | a string representing the minimum width, including units (e.g. '500px') |
| callback | <code>function</code> | a callback function to execute when the browser width crosses the threshold        Unless a transform function is provided, the callback function will be invoked         with an object containing the following keys:        `matches: boolean. whether (true) or not (false) the browser is wider than the provided width`        `query: string. the original media query string`        `originalEvent: Event. the original event that triggered the callback`        `event$: Observable. An Observable event stream created from the MediaQueryList listener |
| [transform] | <code>function</code> | an optional function to map the mql event object to the        parameter passed into the callback |

<a name="module_WatchCSSMedia+onWidthLessThan"></a>

### watchCSSMedia.onWidthLessThan(min, callback, [transform]) ⇒ <code>Observable</code>
Shortcut method to add an event listener for browser width changes. This allows for easy
creation of callbacks that fire when the browser crosses certain width thresholds without
having to use `window.on('resize');`

**Kind**: instance method of <code>[WatchCSSMedia](#module_WatchCSSMedia)</code>  
**Returns**: <code>Observable</code> - An Observable event stream created from the MediaQueryList listener  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>string</code> | a string representing the maximum width, including units (e.g. '500px') |
| callback | <code>function</code> | a callback function to execute when the browser width crosses the threshold        Unless a transform function is provided, the callback function will be invoked         with an object containing the following keys:        `matches: boolean. whether (true) or not (false) the browser is narrower than the provided width`        `query: string. the original media query string`        `originalEvent: Event. the original event that triggered the callback`        `event$: Observable. An Observable event stream created from the MediaQueryList listener |
| [transform] | <code>function</code> | an optional function to map the mql event object to the        parameter passed into the callback |


