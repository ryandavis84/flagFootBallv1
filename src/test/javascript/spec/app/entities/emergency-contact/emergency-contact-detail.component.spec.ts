import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { EmergencyContactDetailComponent } from 'app/entities/emergency-contact/emergency-contact-detail.component';
import { EmergencyContact } from 'app/shared/model/emergency-contact.model';

describe('Component Tests', () => {
  describe('EmergencyContact Management Detail Component', () => {
    let comp: EmergencyContactDetailComponent;
    let fixture: ComponentFixture<EmergencyContactDetailComponent>;
    const route = ({ data: of({ emergencyContact: new EmergencyContact(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [EmergencyContactDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EmergencyContactDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmergencyContactDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load emergencyContact on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.emergencyContact).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
