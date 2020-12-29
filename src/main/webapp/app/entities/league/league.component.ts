import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';
import { LeagueDeleteDialogComponent } from './league-delete-dialog.component';

@Component({
  selector: 'jhi-league',
  templateUrl: './league.component.html',
})
export class LeagueComponent implements OnInit, OnDestroy {
  leagues?: ILeague[];
  eventSubscriber?: Subscription;

  constructor(protected leagueService: LeagueService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.leagueService.query().subscribe((res: HttpResponse<ILeague[]>) => (this.leagues = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLeagues();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILeague): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLeagues(): void {
    this.eventSubscriber = this.eventManager.subscribe('leagueListModification', () => this.loadAll());
  }

  delete(league: ILeague): void {
    const modalRef = this.modalService.open(LeagueDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.league = league;
  }
}
