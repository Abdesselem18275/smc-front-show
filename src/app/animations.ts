import { trigger, transition, style,animate, group } from "@angular/animations";


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
