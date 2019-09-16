import { trigger, transition, style, query, animateChild, animate, group } from "@angular/animations";


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({ 'position': 'fixed' }),
      query(':enter, :leave', [
        style({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          'background-color' : 'red'
        })
      ]),
    ])
  ]);