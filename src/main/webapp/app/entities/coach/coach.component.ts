import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';
import { CoachDeleteDialogComponent } from './coach-delete-dialog.component';

@Component({
  selector: 'jhi-coach',
  templateUrl: './coach.component.html',
})
export class CoachComponent implements OnInit, OnDestroy {
  coaches?: ICoach[];
  eventSubscriber?: Subscription;

  constructor(protected coachService: CoachService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.coachService.query().subscribe((res: HttpResponse<ICoach[]>) => (this.coaches = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCoaches();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICoach): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCoaches(): void {
    this.eventSubscriber = this.eventManager.subscribe('coachListModification', () => this.loadAll());
  }

  delete(coach: ICoach): void {
    const modalRef = this.modalService.open(CoachDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.coach = coach;
  }
}
