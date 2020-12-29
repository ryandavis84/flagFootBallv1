import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IContactInfo, ContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from './contact-info.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';

@Component({
  selector: 'jhi-contact-info-update',
  templateUrl: './contact-info-update.component.html',
})
export class ContactInfoUpdateComponent implements OnInit {
  isSaving = false;
  addresses: IAddress[] = [];

  editForm = this.fb.group({
    id: [],
    address: [],
  });

  constructor(
    protected contactInfoService: ContactInfoService,
    protected addressService: AddressService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contactInfo }) => {
      this.updateForm(contactInfo);

      this.addressService
        .query({ filter: 'contactinfo-is-null' })
        .pipe(
          map((res: HttpResponse<IAddress[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAddress[]) => {
          if (!contactInfo.address || !contactInfo.address.id) {
            this.addresses = resBody;
          } else {
            this.addressService
              .find(contactInfo.address.id)
              .pipe(
                map((subRes: HttpResponse<IAddress>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAddress[]) => (this.addresses = concatRes));
          }
        });
    });
  }

  updateForm(contactInfo: IContactInfo): void {
    this.editForm.patchValue({
      id: contactInfo.id,
      address: contactInfo.address,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contactInfo = this.createFromForm();
    if (contactInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.contactInfoService.update(contactInfo));
    } else {
      this.subscribeToSaveResponse(this.contactInfoService.create(contactInfo));
    }
  }

  private createFromForm(): IContactInfo {
    return {
      ...new ContactInfo(),
      id: this.editForm.get(['id'])!.value,
      address: this.editForm.get(['address'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactInfo>>): void {
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

  trackById(index: number, item: IAddress): any {
    return item.id;
  }
}
