import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { FlagFootBallv1TestModule } from '../../../test.module';
import { EmergencyContactUpdateComponent } from 'app/entities/emergency-contact/emergency-contact-update.component';
import { EmergencyContactService } from 'app/entities/emergency-contact/emergency-contact.service';
import { EmergencyContact } from 'app/shared/model/emergency-contact.model';

describe('Component Tests', () => {
  describe('EmergencyContact Management Update Component', () => {
    let comp: EmergencyContactUpdateComponent;
    let fixture: ComponentFixture<EmergencyContactUpdateComponent>;
    let service: EmergencyContactService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FlagFootBallv1TestModule],
        declarations: [EmergencyContactUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EmergencyContactUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmergencyContactUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmergencyContactService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmergencyContact(123);
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
        const entity = new EmergencyContact();
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
