import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITeam, Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from 'app/entities/coach/coach.service';
import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from 'app/entities/league/league.service';
import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from 'app/entities/season/season.service';

type SelectableEntity = ICoach | ILeague | ISeason;

@Component({
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html',
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  coaches: ICoach[] = [];
  leagues: ILeague[] = [];
  seasons: ISeason[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    coach: [],
    league: [],
    season: [],
  });

  constructor(
    protected teamService: TeamService,
    protected coachService: CoachService,
    protected leagueService: LeagueService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.updateForm(team);

      this.coachService.query().subscribe((res: HttpResponse<ICoach[]>) => (this.coaches = res.body || []));

      this.leagueService.query().subscribe((res: HttpResponse<ILeague[]>) => (this.leagues = res.body || []));

      this.seasonService.query().subscribe((res: HttpResponse<ISeason[]>) => (this.seasons = res.body || []));
    });
  }

  updateForm(team: ITeam): void {
    this.editForm.patchValue({
      id: team.id,
      name: team.name,
      coach: team.coach,
      league: team.league,
      season: team.season,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const team = this.createFromForm();
    if (team.id !== undefined) {
      this.subscribeToSaveResponse(this.teamService.update(team));
    } else {
      this.subscribeToSaveResponse(this.teamService.create(team));
    }
  }

  private createFromForm(): ITeam {
    return {
      ...new Team(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      coach: this.editForm.get(['coach'])!.value,
      league: this.editForm.get(['league'])!.value,
      season: this.editForm.get(['season'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>): void {
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
