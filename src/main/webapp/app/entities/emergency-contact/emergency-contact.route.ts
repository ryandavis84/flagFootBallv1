import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmergencyContact, EmergencyContact } from 'app/shared/model/emergency-contact.model';
import { EmergencyContactService } from './emergency-contact.service';
import { EmergencyContactComponent } from './emergency-contact.component';
import { EmergencyContactDetailComponent } from './emergency-contact-detail.component';
import { EmergencyContactUpdateComponent } from './emergency-contact-update.component';

@Injectable({ providedIn: 'root' })
export class EmergencyContactResolve implements Resolve<IEmergencyContact> {
  constructor(private service: EmergencyContactService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmergencyContact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((emergencyContact: HttpResponse<EmergencyContact>) => {
          if (emergencyContact.body) {
            return of(emergencyContact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EmergencyContact());
  }
}

export const emergencyContactRoute: Routes = [
  {
    path: '',
    component: EmergencyContactComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.emergencyContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmergencyContactDetailComponent,
    resolve: {
      emergencyContact: EmergencyContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.emergencyContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmergencyContactUpdateComponent,
    resolve: {
      emergencyContact: EmergencyContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.emergencyContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmergencyContactUpdateComponent,
    resolve: {
      emergencyContact: EmergencyContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'flagFootBallv1App.emergencyContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
