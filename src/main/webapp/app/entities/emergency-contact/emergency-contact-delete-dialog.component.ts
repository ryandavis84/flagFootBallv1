import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';
import { EmergencyContactService } from './emergency-contact.service';

@Component({
  templateUrl: './emergency-contact-delete-dialog.component.html',
})
export class EmergencyContactDeleteDialogComponent {
  emergencyContact?: IEmergencyContact;

  constructor(
    protected emergencyContactService: EmergencyContactService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.emergencyContactService.delete(id).subscribe(() => {
      this.eventManager.broadcast('emergencyContactListModification');
      this.activeModal.close();
    });
  }
}
