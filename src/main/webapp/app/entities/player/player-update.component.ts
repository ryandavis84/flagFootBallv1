import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPlayer, Player } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';
import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from 'app/entities/league/league.service';
import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from 'app/entities/season/season.service';

type SelectableEntity = IContactInfo | ITeam | ILeague | ISeason;

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html',
})
export class PlayerUpdateComponent implements OnInit {
  isSaving = false;
  ids: IContactInfo[] = [];
  ids: IContactInfo[] = [];
  teams: ITeam[] = [];
  leagues: ILeague[] = [];
  seasons: ISeason[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    dob: [null, [Validators.required]],
    grade: [null, [Validators.required]],
    age: [null, [Validators.required]],
    jerseySize: [null, [Validators.required]],
    id: [],
    id: [],
    team: [],
    league: [],
    season: [],
  });

  constructor(
    protected playerService: PlayerService,
    protected contactInfoService: ContactInfoService,
    protected teamService: TeamService,
    protected leagueService: LeagueService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);

      this.contactInfoService
        .query({ filter: 'emergencycontact-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!player.id || !player.id.id) {
            this.ids = resBody;
          } else {
            this.contactInfoService
              .find(player.id.id)
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
          if (!player.id || !player.id.id) {
            this.ids = resBody;
          } else {
            this.contactInfoService
              .find(player.id.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.ids = concatRes));
          }
        });

      this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => (this.teams = res.body || []));

      this.leagueService.query().subscribe((res: HttpResponse<ILeague[]>) => (this.leagues = res.body || []));

      this.seasonService.query().subscribe((res: HttpResponse<ISeason[]>) => (this.seasons = res.body || []));
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
      id: player.id,
      id: player.id,
      team: player.team,
      league: player.league,
      season: player.season,
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
      id: this.editForm.get(['id'])!.value,
      id: this.editForm.get(['id'])!.value,
      team: this.editForm.get(['team'])!.value,
      league: this.editForm.get(['league'])!.value,
      season: this.editForm.get(['season'])!.value,
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
