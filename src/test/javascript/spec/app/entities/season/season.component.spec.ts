import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { SeasonComponent } from 'app/entities/season/season.component';
import { SeasonService } from 'app/entities/season/season.service';
import { Season } from 'app/shared/model/season.model';

describe('Component Tests', () => {
  describe('Season Management Component', () => {
    let comp: SeasonComponent;
    let fixture: ComponentFixture<SeasonComponent>;
    let service: SeasonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [SeasonComponent],
      })
        .overrideTemplate(SeasonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeasonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeasonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Season(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.seasons && comp.seasons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
