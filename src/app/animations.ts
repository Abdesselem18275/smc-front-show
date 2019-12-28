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

  export const expandAnimation =
  trigger(
    'expandAnimation',
    [
      transition(
        ':enter',
        [
          style({ 'opacity': '0'}),
          animate('150ms ease-in',
            style({'opacity': '1'})
                  )
        ]
      ),
      transition(
        ':leave',
        [
          style({ 'opacity': '1' }),
          animate('150ms ease-in',
             style({'opacity': '0'})     )
        ]
      )
    ]
  );




