import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEmergencyContact } from 'app/shared/model/emergency-contact.model';

type EntityResponseType = HttpResponse<IEmergencyContact>;
type EntityArrayResponseType = HttpResponse<IEmergencyContact[]>;

@Injectable({ providedIn: 'root' })
export class EmergencyContactService {
  public resourceUrl = SERVER_API_URL + 'api/emergency-contacts';

  constructor(protected http: HttpClient) {}

  create(emergencyContact: IEmergencyContact): Observable<EntityResponseType> {
    return this.http.post<IEmergencyContact>(this.resourceUrl, emergencyContact, { observe: 'response' });
  }

  update(emergencyContact: IEmergencyContact): Observable<EntityResponseType> {
    return this.http.put<IEmergencyContact>(this.resourceUrl, emergencyContact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmergencyContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmergencyContact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
