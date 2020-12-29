import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';
import { EmergencyContactService } from './emergency-contact.service';
import { EmergencyContactDeleteDialogComponent } from './emergency-contact-delete-dialog.component';

@Component({
  selector: 'jhi-emergency-contact',
  templateUrl: './emergency-contact.component.html',
})
export class EmergencyContactComponent implements OnInit, OnDestroy {
  emergencyContacts?: IEmergencyContact[];
  eventSubscriber?: Subscription;

  constructor(
    protected emergencyContactService: EmergencyContactService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.emergencyContactService.query().subscribe((res: HttpResponse<IEmergencyContact[]>) => (this.emergencyContacts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmergencyContacts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmergencyContact): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmergencyContacts(): void {
    this.eventSubscriber = this.eventManager.subscribe('emergencyContactListModification', () => this.loadAll());
  }

  delete(emergencyContact: IEmergencyContact): void {
    const modalRef = this.modalService.open(EmergencyContactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.emergencyContact = emergencyContact;
  }
}
