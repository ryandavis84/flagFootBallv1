import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';

@Component({
  templateUrl: './league-delete-dialog.component.html',
})
export class LeagueDeleteDialogComponent {
  league?: ILeague;

  constructor(protected leagueService: LeagueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.leagueService.delete(id).subscribe(() => {
      this.eventManager.broadcast('leagueListModification');
      this.activeModal.close();
    });
  }
}
