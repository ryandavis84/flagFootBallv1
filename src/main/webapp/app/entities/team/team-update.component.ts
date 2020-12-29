import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITeam, Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { IPlayer } from 'app/shared/model/player.model';
import { PlayerService } from 'app/entities/player/player.service';
import { ICoach } from 'app/shared/model/coach.model';
import { CoachService } from 'app/entities/coach/coach.service';

type SelectableEntity = IPlayer | ICoach;

@Component({
  selector: 'jhi-team-update',
  templateUrl: './team-update.component.html',
})
export class TeamUpdateComponent implements OnInit {
  isSaving = false;
  players: IPlayer[] = [];
  coaches: ICoach[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    players: [],
    coach: [],
  });

  constructor(
    protected teamService: TeamService,
    protected playerService: PlayerService,
    protected coachService: CoachService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.updateForm(team);

      this.playerService.query().subscribe((res: HttpResponse<IPlayer[]>) => (this.players = res.body || []));

      this.coachService.query().subscribe((res: HttpResponse<ICoach[]>) => (this.coaches = res.body || []));
    });
  }

  updateForm(team: ITeam): void {
    this.editForm.patchValue({
      id: team.id,
      name: team.name,
      players: team.players,
      coach: team.coach,
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
      players: this.editForm.get(['players'])!.value,
      coach: this.editForm.get(['coach'])!.value,
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

  getSelected(selectedVals: IPlayer[], option: IPlayer): IPlayer {
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
