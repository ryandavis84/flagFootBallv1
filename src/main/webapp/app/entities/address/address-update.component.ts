import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IContactInfo } from 'app/shared/model/contact-info.model';
import { ContactInfoService } from 'app/entities/contact-info/contact-info.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html',
})
export class AddressUpdateComponent implements OnInit {
  isSaving = false;
  ids: IContactInfo[] = [];

  editForm = this.fb.group({
    id: [],
    street1: [null, [Validators.required]],
    street2: [null, [Validators.required]],
    city: [null, [Validators.required]],
    state: [null, [Validators.required]],
    id: [],
  });

  constructor(
    protected addressService: AddressService,
    protected contactInfoService: ContactInfoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);

      this.contactInfoService
        .query({ filter: 'id-is-null' })
        .pipe(
          map((res: HttpResponse<IContactInfo[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContactInfo[]) => {
          if (!address.id || !address.id.id) {
            this.ids = resBody;
          } else {
            this.contactInfoService
              .find(address.id.id)
              .pipe(
                map((subRes: HttpResponse<IContactInfo>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContactInfo[]) => (this.ids = concatRes));
          }
        });
    });
  }

  updateForm(address: IAddress): void {
    this.editForm.patchValue({
      id: address.id,
      street1: address.street1,
      street2: address.street2,
      city: address.city,
      state: address.state,
      id: address.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id'])!.value,
      street1: this.editForm.get(['street1'])!.value,
      street2: this.editForm.get(['street2'])!.value,
      city: this.editForm.get(['city'])!.value,
      state: this.editForm.get(['state'])!.value,
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>): void {
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

  trackById(index: number, item: IContactInfo): any {
    return item.id;
  }
}
