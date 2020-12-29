import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISeason, Season } from 'app/shared/model/season.model';
import { SeasonService } from './season.service';
import { ILeague } from 'app/shared/model/league.model';
import { LeagueService } from 'app/entities/league/league.service';

@Component({
  selector: 'jhi-season-update',
  templateUrl: './season-update.component.html',
})
export class SeasonUpdateComponent implements OnInit {
  isSaving = false;
  leagues: ILeague[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    league: [],
  });

  constructor(
    protected seasonService: SeasonService,
    protected leagueService: LeagueService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ season }) => {
      this.updateForm(season);

      this.leagueService
        .query({ filter: 'season-is-null' })
        .pipe(
          map((res: HttpResponse<ILeague[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ILeague[]) => {
          if (!season.league || !season.league.id) {
            this.leagues = resBody;
          } else {
            this.leagueService
              .find(season.league.id)
              .pipe(
                map((subRes: HttpResponse<ILeague>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ILeague[]) => (this.leagues = concatRes));
          }
        });
    });
  }

  updateForm(season: ISeason): void {
    this.editForm.patchValue({
      id: season.id,
      name: season.name,
      league: season.league,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const season = this.createFromForm();
    if (season.id !== undefined) {
      this.subscribeToSaveResponse(this.seasonService.update(season));
    } else {
      this.subscribeToSaveResponse(this.seasonService.create(season));
    }
  }

  private createFromForm(): ISeason {
    return {
      ...new Season(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      league: this.editForm.get(['league'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeason>>): void {
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

  trackById(index: number, item: ILeague): any {
    return item.id;
  }
}
