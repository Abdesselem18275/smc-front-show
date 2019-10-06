import { trigger, transition, style, animate } from "@angular/animations";


export const sideSlideInAnimation =
trigger('routeAnimations', [
  transition('empty => sideNav', [
    style({
            left: '-100%',
  }),
  animate('200ms ease-out',
  style({ left: 0 , }))
])
]);
// export const centerSlideInAnimation =
// trigger('auxRouteAnimations', [
//   transition('empty => centerNav', [
//     style({
//       transform : 'translateX(0)',

//   }),
//   animate('100ms ease-out',
//   style({ left: '50%' ,
//           width: '50%'
// }))
// ])
// ]);
