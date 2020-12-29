import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { CoachComponent } from 'app/entities/coach/coach.component';
import { CoachService } from 'app/entities/coach/coach.service';
import { Coach } from 'app/shared/model/coach.model';

describe('Component Tests', () => {
  describe('Coach Management Component', () => {
    let comp: CoachComponent;
    let fixture: ComponentFixture<CoachComponent>;
    let service: CoachService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [CoachComponent],
      })
        .overrideTemplate(CoachComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CoachComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CoachService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Coach(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.coaches && comp.coaches[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
