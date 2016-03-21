import {Observable} from 'rxjs/Rx';

export function WatchCSSMedia(): {
    addQuery(query: string, callback: Function, transform?: Function): Observable<MediaQueryList>,
    addQueries(args: any[]): Observable<MediaQueryList> [],
    onWidthGreaterThan(width: string, callback: Function, transform?: Function): Observable<MediaQueryList>,
    onWidthLessThan(width: string, callback: Function, transform?: Function): Observable<MediaQueryList>,
    onOrientationChange(callback: Function, transform?: Function): Observable<MediaQueryList>
}
