import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICoach, Coach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';

@Component({
  selector: 'jhi-coach-update',
  templateUrl: './coach-update.component.html',
})
export class CoachUpdateComponent implements OnInit {
  isSaving = false;
  ids: IContactInfo[] = [];
  ids: IContactInfo[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    jerseySize: [null, [Validators.required]],
    id: [],
    id: [],
  });

  constructor(
    protected coachService: CoachService,
    protected contactInfoService: ContactInfoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coach }) => {
      this.updateForm(coach);

      this.contactInfoService
        .query({ filter: 'emergencycontact-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!coach.id || !coach.id.id) {
            this.ids = resBody;
          } else {
            this.contactInfoService
              .find(coach.id.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.ids = concatRes));
          }
        });

      this.contactInfoService
        .query({ filter: 'personalcontact-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!coach.id || !coach.id.id) {
            this.ids = resBody;
          } else {
            this.contactInfoService
              .find(coach.id.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.ids = concatRes));
          }
        });
    });
  }

  updateForm(coach: ICoach): void {
    this.editForm.patchValue({
      id: coach.id,
      firstName: coach.firstName,
      lastName: coach.lastName,
      jerseySize: coach.jerseySize,
      id: coach.id,
      id: coach.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coach = this.createFromForm();
    if (coach.id !== undefined) {
      this.subscribeToSaveResponse(this.coachService.update(coach));
    } else {
      this.subscribeToSaveResponse(this.coachService.create(coach));
    }
  }

  private createFromForm(): ICoach {
    return {
      ...new Coach(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      jerseySize: this.editForm.get(['jerseySize'])!.value,
      id: this.editForm.get(['id'])!.value,
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoach>>): void {
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

  trackById(index: number, item: IContactInfo): any {
    return item.id;
  }
}
