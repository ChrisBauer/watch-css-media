'use strict';

var MatchMediaMock = require('match-media-mock');
var ExecutionEnvironment = require('exenv');
ExecutionEnvironment.canUseDOM = true;

global.matchMedia = MatchMediaMock.create()

var WatchCSSMedia = require('../index').WatchCSSMedia();
var Observable = require('rxjs').Observable;

function simpleTransform (event) {
    return event.matches;
}

var cbSpy = jasmine.createSpy('cbSpy1').and.callFake(function cbSpy (event) { return event; });
var cbSpy2 = jasmine.createSpy('cbSpy2').and.callFake(function cbSpy2 (event) { return event; });


describe('watch-css-media', function () {

    beforeEach(function () {
        global.matchMedia.setConfig({type: 'screen', width: 300});
    });

    it('should set up an event listener using .addQuery() and change when the query changes', function () {

        WatchCSSMedia.addQuery('max-width: 400px', cbSpy, simpleTransform);

        // the 'startsWith' value should match
        expect(cbSpy).toHaveBeenCalledWith(true);

        global.matchMedia.setConfig({type: 'screen', width: 500});
        expect(cbSpy).toHaveBeenCalledWith(false);

    });

    it('should set up multiple listeners using .addQueries() and fire callbacks appropriately', function () {

        var query1 = ['max-width: 400px', cbSpy, simpleTransform];
        var query2 = ['max-width: 600px', cbSpy2, simpleTransform];

        WatchCSSMedia.addQueries([query1, query2]);

        expect(cbSpy).toHaveBeenCalledWith(true);
        expect(cbSpy2).toHaveBeenCalledWith(true);

        // reset the spies
        cbSpy.calls.reset();
        cbSpy2.calls.reset();

        // update the browser width
        global.matchMedia.setConfig({type: 'screen', width: 500});

        // check the spies
        expect(cbSpy).toHaveBeenCalledWith(false);
        expect(cbSpy2).not.toHaveBeenCalled();

        // reset the spies again
        cbSpy.calls.reset();
        cbSpy2.calls.reset();

        // update the browser width again
        global.matchMedia.setConfig({type: 'screen', width: 700});

        // check the spies for a final time
        expect(cbSpy).not.toHaveBeenCalled();
        expect(cbSpy2).toHaveBeenCalledWith(false);
    });

    it('should set up the appropriate query when using .onWidthGreaterThan()', function () {

        WatchCSSMedia.onWidthGreaterThan('400px', cbSpy, simpleTransform);
        expect(cbSpy).toHaveBeenCalledWith(false);
        global.matchMedia.setConfig({type: 'screen', width: 500});
        expect(cbSpy).toHaveBeenCalledWith(true);
    });

    it('should set up the appropriate query when using .onWidthLessThan()', function () {

        WatchCSSMedia.onWidthLessThan('400px', cbSpy, simpleTransform);
        expect(cbSpy).toHaveBeenCalledWith(true);
        global.matchMedia.setConfig({type: 'screen', width: 500});
        expect(cbSpy).toHaveBeenCalledWith(false);
    });
});
