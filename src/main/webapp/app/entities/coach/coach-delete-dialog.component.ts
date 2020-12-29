import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';

@Component({
  templateUrl: './coach-delete-dialog.component.html',
})
export class CoachDeleteDialogComponent {
  coach?: ICoach;

  constructor(protected coachService: CoachService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.coachService.delete(id).subscribe(() => {
      this.eventManager.broadcast('coachListModification');
      this.activeModal.close();
    });
  }
}
