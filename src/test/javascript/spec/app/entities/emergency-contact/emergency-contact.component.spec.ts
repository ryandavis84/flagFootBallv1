import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { EmergencyContactComponent } from 'app/entities/emergency-contact/emergency-contact.component';
import { EmergencyContactService } from 'app/entities/emergency-contact/emergency-contact.service';
import { EmergencyContact } from 'app/shared/model/emergency-contact.model';

describe('Component Tests', () => {
  describe('EmergencyContact Management Component', () => {
    let comp: EmergencyContactComponent;
    let fixture: ComponentFixture<EmergencyContactComponent>;
    let service: EmergencyContactService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [EmergencyContactComponent],
      })
        .overrideTemplate(EmergencyContactComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmergencyContactComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmergencyContactService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EmergencyContact(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.emergencyContacts && comp.emergencyContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
