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
export const centerSlideInAnimation =
  trigger(
    'inOutAnimation',
    [
      transition(
        ':enter',
        [
          style({ 'transform': 'translateX(150%)'}),
          animate('150ms ease-out',
                  )
        ]
      ),
      transition(
        ':leave',
        [
          style({ 'transform': 'translateX(0)' }),
          animate('150ms ease-in',
             style({'transform': 'translateX(150%)'})     )
        ]
      )
    ]
  );
