import $ from 'jquery';
import Rx from 'rxjs/Rx';

console.log('Up and running..');

const btn = $('#btn');


const btnStream$ = Rx.Observable.fromEvent(btn, 'click');

btnStream$.subscribe(
  (event) => console.log('Clicked'),
  (err) => console.log(`Error occurred ${err}`),
  () => console.log('Completed')
);


const getUser = (username) => {
  return $.ajax({
    url: `https://api.github.com/users/${username}`,
    dataType: 'jsonp'
  }).promise();
};


// const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup');
//
// inputSource$.subscribe(e => {
//   Rx.Observable.fromPromise(getUser(e.target.value))
//     .subscribe(x => {
//       // console.log(x);
//       $('#name').text(x.data.name);
//       $('#blog').text(x.data.blog);
//       $('#avatar').attr('src', x.data.avatar_url);
//     });
// });

const inputSource$ = Rx.Observable.fromEvent($('#input'), 'keyup')
  .map(e => e.target.value)
  .switchMap(v => {
    return Rx.Observable.fromPromise(getUser(v));
  });

inputSource$.subscribe(x => {
  // console.log(x);
  $('#name').text(x.data.name);
  $('#blog').text(x.data.blog);
  $('#avatar').attr('src', x.data.avatar_url);
});


// const source1$ = Rx.Observable.range(0, 5).map(v => `Source1: ${v}`);
// const source2$ = Rx.Observable.range(6, 5).map(v => `Source2: ${v}`);
//
// Rx.Observable.concat(source1$, source2$)
//   .subscribe(x => console.log(x));


Rx.Observable.of('Hello')
  .mergeMap(v => {
    return Rx.Observable.of(v + ' Everyone');
  })
  .subscribe(x => console.log(x));

