import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlayer, Player } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';

type SelectableEntity = ITeam | IContactInfo;

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html',
})
export class PlayerUpdateComponent implements OnInit {
  isSaving = false;
  teams: ITeam[] = [];
  contactinfos: IContactInfo[] = [];
  teams: ITeam[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    dob: [null, [Validators.required]],
    grade: [null, [Validators.required]],
    age: [null, [Validators.required]],
    jerseySize: [null, [Validators.required]],
    team: [],
    contactInfo: [],
    team: [],
  });

  constructor(
    protected playerService: PlayerService,
    protected teamService: TeamService,
    protected contactInfoService: ContactInfoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);

      this.teamService
        .query({ filter: 'player-is-null' })
        .pipe(
          map((res: HttpResponse<ITeam[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITeam[]) => {
          if (!player.team || !player.team.id) {
            this.teams = resBody;
          } else {
            this.teamService
              .find(player.team.id)
              .pipe(
                map((subRes: HttpResponse<ITeam>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITeam[]) => (this.teams = concatRes));
          }
        });

      this.contactInfoService
        .query({ filter: 'player-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!player.contactInfo || !player.contactInfo.id) {
            this.contactinfos = resBody;
          } else {
            this.contactInfoService
              .find(player.contactInfo.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.contactinfos = concatRes));
          }
        });

      this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => (this.teams = res.body || []));
    });
  }

  updateForm(player: IPlayer): void {
    this.editForm.patchValue({
      id: player.id,
      firstName: player.firstName,
      lastName: player.lastName,
      dob: player.dob,
      grade: player.grade,
      age: player.age,
      jerseySize: player.jerseySize,
      team: player.team,
      contactInfo: player.contactInfo,
      team: player.team,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const player = this.createFromForm();
    if (player.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(player));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(player));
    }
  }

  private createFromForm(): IPlayer {
    return {
      ...new Player(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      dob: this.editForm.get(['dob'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      age: this.editForm.get(['age'])!.value,
      jerseySize: this.editForm.get(['jerseySize'])!.value,
      team: this.editForm.get(['team'])!.value,
      contactInfo: this.editForm.get(['contactInfo'])!.value,
      team: this.editForm.get(['team'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>): void {
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
