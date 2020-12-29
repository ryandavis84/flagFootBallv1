import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'season',
        loadChildren: () => import('./season/season.module').then(m => m.FlagFootBallv1SeasonModule),
      },
      {
        path: 'league',
        loadChildren: () => import('./league/league.module').then(m => m.FlagFootBallv1LeagueModule),
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.FlagFootBallv1TeamModule),
      },
      {
        path: 'player',
        loadChildren: () => import('./player/player.module').then(m => m.FlagFootBallv1PlayerModule),
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.FlagFootBallv1AddressModule),
      },
      {
        path: 'contact-info',
        loadChildren: () => import('./contact-info/contact-info.module').then(m => m.FlagFootBallv1ContactInfoModule),
      },
      {
        path: 'coach',
        loadChildren: () => import('./coach/coach.module').then(m => m.FlagFootBallv1CoachModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class FlagFootBallv1EntityModule {}
