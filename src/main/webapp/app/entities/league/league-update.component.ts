import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILeague, League } from 'app/shared/model/league.model';
import { LeagueService } from './league.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team/team.service';
import { ISeason } from 'app/shared/model/season.model';
import { SeasonService } from 'app/entities/season/season.service';

type SelectableEntity = ITeam | ISeason;

@Component({
  selector: 'jhi-league-update',
  templateUrl: './league-update.component.html',
})
export class LeagueUpdateComponent implements OnInit {
  isSaving = false;
  teams: ITeam[] = [];
  seasons: ISeason[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    ids: [],
    ids: [],
  });

  constructor(
    protected leagueService: LeagueService,
    protected teamService: TeamService,
    protected seasonService: SeasonService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ league }) => {
      this.updateForm(league);

      this.teamService.query().subscribe((res: HttpResponse<ITeam[]>) => (this.teams = res.body || []));

      this.seasonService.query().subscribe((res: HttpResponse<ISeason[]>) => (this.seasons = res.body || []));
    });
  }

  updateForm(league: ILeague): void {
    this.editForm.patchValue({
      id: league.id,
      name: league.name,
      ids: league.ids,
      ids: league.ids,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const league = this.createFromForm();
    if (league.id !== undefined) {
      this.subscribeToSaveResponse(this.leagueService.update(league));
    } else {
      this.subscribeToSaveResponse(this.leagueService.create(league));
    }
  }

  private createFromForm(): ILeague {
    return {
      ...new League(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      ids: this.editForm.get(['ids'])!.value,
      ids: this.editForm.get(['ids'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeague>>): void {
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

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
