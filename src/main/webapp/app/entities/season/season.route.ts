import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISeason, Season } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';
import { SeasonComponent } from './season.component';
import { SeasonDetailComponent } from './season-detail.component';
import { SeasonUpdateComponent } from './season-update.component';

@Injectable({ providedIn: 'root' })
export class SeasonResolve implements Resolve<ISeason> {
  constructor(private service: SeasonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeason> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((season: HttpResponse<Season>) => {
          if (season.body) {
            return of(season.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Season());
  }
}

export const seasonRoute: Routes = [
  {
    path: '',
    component: SeasonComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.season.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SeasonDetailComponent,
    resolve: {
      season: SeasonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.season.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SeasonUpdateComponent,
    resolve: {
      season: SeasonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.season.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SeasonUpdateComponent,
    resolve: {
      season: SeasonResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.season.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
