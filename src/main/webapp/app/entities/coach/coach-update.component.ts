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
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';

type SelectableEntity = IContactInfo | ITeam;

@Component({
  selector: 'jhi-coach-update',
  templateUrl: './coach-update.component.html',
})
export class CoachUpdateComponent implements OnInit {
  isSaving = false;
  contactinfos: IContactInfo[] = [];
  teams: ITeam[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    jerseySize: [],
    contactInfo: [],
    team: [],
  });

  constructor(
    protected coachService: CoachService,
    protected contactInfoService: ContactInfoService,
    protected teamService: TeamService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coach }) => {
      this.updateForm(coach);

      this.contactInfoService
        .query({ filter: 'coach-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!coach.contactInfo || !coach.contactInfo.id) {
            this.contactinfos = resBody;
          } else {
            this.contactInfoService
              .find(coach.contactInfo.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.contactinfos = concatRes));
          }
        });

      this.teamService
        .query({ filter: 'coach-is-null' })
        .pipe(
          map((res: HttpResponse<ITeam[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITeam[]) => {
          if (!coach.team || !coach.team.id) {
            this.teams = resBody;
          } else {
            this.teamService
              .find(coach.team.id)
              .pipe(
                map((subRes: HttpResponse<ITeam>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITeam[]) => (this.teams = concatRes));
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
      contactInfo: coach.contactInfo,
      team: coach.team,
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
      contactInfo: this.editForm.get(['contactInfo'])!.value,
      team: this.editForm.get(['team'])!.value,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
