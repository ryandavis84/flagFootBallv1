import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { LeagueUpdateComponent } from 'app/entities/league/league-update.component';
import { LeagueService } from 'app/entities/league/league.service';
import { League } from 'app/shared/model/league.model';

describe('Component Tests', () => {
  describe('League Management Update Component', () => {
    let comp: LeagueUpdateComponent;
    let fixture: ComponentFixture<LeagueUpdateComponent>;
    let service: LeagueService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [LeagueUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LeagueUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeagueUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeagueService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new League(123);
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
        const entity = new League();
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
