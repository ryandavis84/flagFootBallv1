import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';
import { SeasonDeleteDialogComponent } from './season-delete-dialog.component';

@Component({
  selector: 'jhi-season',
  templateUrl: './season.component.html',
})
export class SeasonComponent implements OnInit, OnDestroy {
  seasons?: ISeason[];
  eventSubscriber?: Subscription;

  constructor(protected seasonService: SeasonService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.seasonService.query().subscribe((res: HttpResponse<ISeason[]>) => (this.seasons = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSeasons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISeason): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSeasons(): void {
    this.eventSubscriber = this.eventManager.subscribe('seasonListModification', () => this.loadAll());
  }

  delete(season: ISeason): void {
    const modalRef = this.modalService.open(SeasonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.season = season;
  }
}
