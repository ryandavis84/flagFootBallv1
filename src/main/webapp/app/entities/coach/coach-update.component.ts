import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICoach, Coach } from 'app/shared/model/coach.model';
import { CoachService } from './coach.service';

@Component({
  selector: 'jhi-coach-update',
  templateUrl: './coach-update.component.html',
})
export class CoachUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    jerseySize: [null, [Validators.required]],
  });

  constructor(protected coachService: CoachService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coach }) => {
      this.updateForm(coach);
    });
  }

  updateForm(coach: ICoach): void {
    this.editForm.patchValue({
      id: coach.id,
      firstName: coach.firstName,
      lastName: coach.lastName,
      jerseySize: coach.jerseySize,
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
}
