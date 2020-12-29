import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICoach, Coach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';
import { CoachComponent } from './coach.component';
import { CoachDetailComponent } from './coach-detail.component';
import { CoachUpdateComponent } from './coach-update.component';

@Injectable({ providedIn: 'root' })
export class CoachResolve implements Resolve<ICoach> {
  constructor(private service: CoachService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICoach> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((coach: HttpResponse<Coach>) => {
          if (coach.body) {
            return of(coach.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Coach());
  }
}

export const coachRoute: Routes = [
  {
    path: '',
    component: CoachComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.coach.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CoachDetailComponent,
    resolve: {
      coach: CoachResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.coach.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CoachUpdateComponent,
    resolve: {
      coach: CoachResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.coach.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CoachUpdateComponent,
    resolve: {
      coach: CoachResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.coach.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
