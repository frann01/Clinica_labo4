import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';
export const slideInAnimation =
  trigger('routeAnimations', [
    
    transition('MiPerfil => MisTurnos', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%' }))
        ]),
      ]),
    ]),

    transition('MisTurnos => MiPerfil', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ right: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('500ms ease-out', style({ right: '100%' }))
          ]),
          query(':enter', [
            animate('500ms ease-out', style({ right: '0%' }))
          ]),
        ]),
      ]),

      transition('Usuarios => MiPerfil', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild()),
        group([
          query(':leave', [
            animate('500ms ease-out', style({ left: '100%' }))
          ]),
          query(':enter', [
            animate('500ms ease-out', style({ left: '0%' }))
          ]),
        ]),
      ]),
  
  
      transition('MiPerfil => Usuarios', [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%'
            })
          ]),
          query(':enter', [
            style({ right: '-100%' })
          ]),
          query(':leave', animateChild()),
          group([
            query(':leave', [
              animate('500ms ease-out', style({ right: '100%' }))
            ]),
            query(':enter', [
              animate('500ms ease-out', style({ right: '0%' }))
            ]),
          ]),
        ]),

        transition('MiPerfil => Bienvenida', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ left: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ left: '0%' }))
              ]),
            ]),
          ]),

          transition('MisTurnos => Bienvenida', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ left: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ left: '0%' }))
              ]),
            ]),
          ]),


          transition('Usuarios => Bienvenida', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ left: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ left: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ left: '0%' }))
              ]),
            ]),
          ]),

          transition('Bienvenida => MiPerfil', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ right: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ right: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ right: '0%' }))
              ]),
            ]),
          ]),

          transition('Bienvenida => MisTurnos', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ right: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ right: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ right: '0%' }))
              ]),
            ]),
          ]),


          transition('Bienvenida => Usuarios', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
              style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%'
              })
            ]),
            query(':enter', [
              style({ right: '-100%' })
            ]),
            query(':leave', animateChild()),
            group([
              query(':leave', [
                animate('500ms ease-out', style({ right: '100%' }))
              ]),
              query(':enter', [
                animate('500ms ease-out', style({ right: '0%' }))
              ]),
            ]),
          ]),
    
    
    transition('* <=> *', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ top: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ top: '100%', opacity: 0 }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ top: '0%' }))
        ]),
        query('@*', animateChild())
      ]),
    ])
  ]);