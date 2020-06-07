import { trigger, transition, style, animate, animation, useAnimation } from "@angular/animations";


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
  export const accordionTransAnimationIn = animation([
    style({
      height: '0px',
      opacity: 0,
    }),
    animate('90ms ease-in',            
      style({'height': '{{ height }}',
      opacity : 1})
    )
  ],{params: {height: '280px'}});

  export const verticalAccordionAnimation =
  trigger(
    'verticalAccordionAnimation',
    [
      transition(
        ':enter',
        [
          useAnimation(accordionTransAnimationIn,{
            params: {
              height: '280px'
            }
          })
        ]
      ),
      transition(
        ':leave',
        [
          style({ 'height': '280px',
                   opacity : 1 }),
          animate('90ms ease-in',
             style({'height': '0px',
            opacity: 0})     )
        ]
      )
    ]
  );

