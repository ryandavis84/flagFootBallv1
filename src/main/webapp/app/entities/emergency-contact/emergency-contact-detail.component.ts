import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';

@Component({
  selector: 'jhi-emergency-contact-detail',
  templateUrl: './emergency-contact-detail.component.html',
})
export class EmergencyContactDetailComponent implements OnInit {
  emergencyContact: IEmergencyContact | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emergencyContact }) => (this.emergencyContact = emergencyContact));
  }

  previousState(): void {
    window.history.back();
  }
}
