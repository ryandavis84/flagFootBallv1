import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FlagFootBallv1SharedModule } from 'app/shared/shared.module';
import { EmergencyContactComponent } from './emergency-contact.component';
import { EmergencyContactDetailComponent } from './emergency-contact-detail.component';
import { EmergencyContactUpdateComponent } from './emergency-contact-update.component';
import { EmergencyContactDeleteDialogComponent } from './emergency-contact-delete-dialog.component';
import { emergencyContactRoute } from './emergency-contact.route';

@NgModule({
  imports: [FlagFootBallv1SharedModule, RouterModule.forChild(emergencyContactRoute)],
  declarations: [
    EmergencyContactComponent,
    EmergencyContactDetailComponent,
    EmergencyContactUpdateComponent,
    EmergencyContactDeleteDialogComponent,
  ],
  entryComponents: [EmergencyContactDeleteDialogComponent],
})
export class FlagFootBallv1EmergencyContactModule {}
