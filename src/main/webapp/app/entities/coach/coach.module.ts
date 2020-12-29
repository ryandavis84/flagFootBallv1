import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlagFootBallv1SharedModule } from 'app/shared/shared.module';
import { CoachComponent } from './coach.component';
import { CoachDetailComponent } from './coach-detail.component';
import { CoachUpdateComponent } from './coach-update.component';
import { CoachDeleteDialogComponent } from './coach-delete-dialog.component';
import { coachRoute } from './coach.route';

@NgModule({
  imports: [FlagFootBallv1SharedModule, RouterModule.forChild(coachRoute)],
  declarations: [CoachComponent, CoachDetailComponent, CoachUpdateComponent, CoachDeleteDialogComponent],
  entryComponents: [CoachDeleteDialogComponent],
})
export class FlagFootBallv1CoachModule {}
