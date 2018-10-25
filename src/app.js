import $ from 'jquery';
import Rx from 'rxjs/Rx';
// import {switchMap} from 'rxjs/operators'

console.log('Up and running..');

const startBtn = $('#start');
const stopBtn = $('#stop');


const Observable = Rx.Observable;

const start$ = Observable.fromEvent(startBtn, 'click');
const stop$ = Observable.fromEvent(stopBtn, 'click');
const interval$ = Observable.interval(1000);

const observable$ = start$.map(event => {
    return interval$;
});

observable$.mergeAll().subscribe(num => console.log(num));


// start$
//     .switchMap( value1 =>
//         Observable.interval(1000).map(val=>value1)
//     )
//     .subscribe(value=>console.log(value))

// start$
//     .map(event=>Observable.interval(1000))
// switchMapTo

// const startInterval$ = start$
//   .switchMapTo(interval$)
//   .subscribe((x)=> console.log(x));


// switchMapTo / scan, startWith

const stop$ = Observable.fromEvent(stopBtn, 'click');

const intervalThatStops$ = interval$
  .takeUntil(stop$);

const data = {count:0};

// const inc = acc => ({count: acc.count + 1});
//
//   start$
//   .switchMapTo(intervalThatStops$)
//   .startWith(data)
//   .scan(inc)
//   .subscribe((x)=> console.log(x));


// const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

// simple Observable / Observer example

// btnStream$.subscribe(
//   (event) => console.log('Clicked'),
//   (err) => console.log(`Error occurred ${err}`),
//   () => console.log('Completed')
// );

// switchMap Example 1

// const getUser = (username) => {
//   return $.ajax({
//     url: `https://api.github.com/users/${username}`,
//     dataType: 'jsonp'
//   }).promise();
// };


// const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup')
//   .map(e => e.target.value)
//   .switchMap(v => {
//     return Rx.Observable.fromPromise(getUser(v));
//   });
//
// inputSource$.subscribe(x => {
//   // console.log(x);
//   $('#name').text(x.data.name);
//   $('#blog').text(x.data.blog);
//   $('#avatar').attr('src', x.data.avatar_url);
// });


// Concat example

// const source1$ = Rx.Observable.range(0, 5).map(v => `Source1: ${v}`);
// const source2$ = Rx.Observable.range(6, 5).map(v => `Source2: ${v}`);
//
// Rx.Observable.concat(source1$, source2$)
//   .subscribe(x => console.log(x));



// mergeMap example

// Rx.Observable.of('Hello')
//   .mergeMap(v => {
//     return Rx.Observable.of(v + ' Everyone');
//   })
//   .subscribe(x => console.log(x));

