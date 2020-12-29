import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEmergencyContact, EmergencyContact } from 'app/shared/model/emergency-contact.model';
import { EmergencyContactService } from './emergency-contact.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from 'app/entities/coach/coach.service';

type SelectableEntity = IPlayer | ICoach;

@Component({
  selector: 'jhi-emergency-contact-update',
  templateUrl: './emergency-contact-update.component.html',
})
export class EmergencyContactUpdateComponent implements OnInit {
  isSaving = false;
  ids: IPlayer[] = [];
  ids: ICoach[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    id: [],
    id: [],
  });

  constructor(
    protected emergencyContactService: EmergencyContactService,
    protected playerService: PlayerService,
    protected coachService: CoachService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emergencyContact }) => {
      this.updateForm(emergencyContact);

      this.playerService
        .query({ filter: 'id-is-null' })
        .pipe(
          map((res: HttpResponse<IPlayer[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPlayer[]) => {
          if (!emergencyContact.id || !emergencyContact.id.id) {
            this.ids = resBody;
          } else {
            this.playerService
              .find(emergencyContact.id.id)
              .pipe(
                map((subRes: HttpResponse<IPlayer>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPlayer[]) => (this.ids = concatRes));
          }
        });

      this.coachService
        .query({ filter: 'id-is-null' })
        .pipe(
          map((res: HttpResponse<ICoach[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICoach[]) => {
          if (!emergencyContact.id || !emergencyContact.id.id) {
            this.ids = resBody;
          } else {
            this.coachService
              .find(emergencyContact.id.id)
              .pipe(
                map((subRes: HttpResponse<ICoach>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICoach[]) => (this.ids = concatRes));
          }
        });
    });
  }

  updateForm(emergencyContact: IEmergencyContact): void {
    this.editForm.patchValue({
      id: emergencyContact.id,
      firstName: emergencyContact.firstName,
      lastName: emergencyContact.lastName,
      id: emergencyContact.id,
      id: emergencyContact.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const emergencyContact = this.createFromForm();
    if (emergencyContact.id !== undefined) {
      this.subscribeToSaveResponse(this.emergencyContactService.update(emergencyContact));
    } else {
      this.subscribeToSaveResponse(this.emergencyContactService.create(emergencyContact));
    }
  }

  private createFromForm(): IEmergencyContact {
    return {
      ...new EmergencyContact(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      id: this.editForm.get(['id'])!.value,
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmergencyContact>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
