import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';

@Component({
  templateUrl: './season-delete-dialog.component.html',
})
export class SeasonDeleteDialogComponent {
  season?: ISeason;

  constructor(protected seasonService: SeasonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.seasonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('seasonListModification');
      this.activeModal.close();
    });
  }
}
