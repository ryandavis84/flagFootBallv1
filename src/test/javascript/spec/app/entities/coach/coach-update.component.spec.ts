import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { CoachUpdateComponent } from 'app/entities/coach/coach-update.component';
import { CoachService } from 'app/entities/coach/coach.service';
import { Coach } from 'app/shared/model/coach.model';

describe('Component Tests', () => {
  describe('Coach Management Update Component', () => {
    let comp: CoachUpdateComponent;
    let fixture: ComponentFixture<CoachUpdateComponent>;
    let service: CoachService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [CoachUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CoachUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoachUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoachService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Coach(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Coach();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
