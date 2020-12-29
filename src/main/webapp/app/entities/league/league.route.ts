import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILeague, League } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';
import { LeagueComponent } from './league.component';
import { LeagueDetailComponent } from './league-detail.component';
import { LeagueUpdateComponent } from './league-update.component';

@Injectable({ providedIn: 'root' })
export class LeagueResolve implements Resolve<ILeague> {
  constructor(private service: LeagueService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILeague> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((league: HttpResponse<League>) => {
          if (league.body) {
            return of(league.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new League());
  }
}

export const leagueRoute: Routes = [
  {
    path: '',
    component: LeagueComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.league.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LeagueDetailComponent,
    resolve: {
      league: LeagueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.league.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LeagueUpdateComponent,
    resolve: {
      league: LeagueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.league.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LeagueUpdateComponent,
    resolve: {
      league: LeagueResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.league.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
