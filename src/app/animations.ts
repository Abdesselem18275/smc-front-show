import { trigger, transition, style, animate } from "@angular/animations";


export const sideSlideInAnimation =
trigger(
  'routeAnimations',
  [
    transition(
      ':enter',
      [
        style({ 'transform': 'translateX(-150%)'}),
        animate('200ms ease-out',
                )
      ]
    ),
    transition(
      ':leave',
      [
        style({ 'transform': 'translateX(0)' }),
        animate('200ms ease-in',
           style({'transform': 'translateX(-150%)'})     )
      ]
    )
  ]
);
export const centerSlideInAnimation =
  trigger(
    'inOutAnimation',
    [
      transition(
        ':enter',
        [
          style({ 'transform': 'translateX(150%)'}),
          animate('200ms ease-out',
                  )
        ]
      ),
      transition(
        ':leave',
        [
          style({ 'transform': 'translateX(0)' }),
          animate('200ms ease-in',
             style({'transform': 'translateX(150%)'})     )
        ]
      )
    ]
  );


