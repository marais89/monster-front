import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookiesUtils} from '../../utils/cookies-utils';
import {Observable} from 'rxjs';
import {Address} from '../../model/address';
import {UrlUtils} from '../../utils/url-utils';
import {Governorate} from '../../model/governorate';
import {Country} from '../../model/country';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http: HttpClient) {
  }

  private buildHeader() {
    return {
      headers: new HttpHeaders({Authorization: 'Bearer ' + CookiesUtils.getCookie('token')})
    };
  }

  findAdressByGouvernorat(gouvernorat: number): Observable<Address[]> {
    return this.http.get<Address[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ADRESS_URL + gouvernorat, this.buildHeader());
  }

  findGovernorateByCountryId(countryId: number): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_TOWN_BY_ID_URL + countryId, this.buildHeader());
  }

  retrieveAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(UrlUtils.BASE_URL + UrlUtils.RETRIEVE_ALL_COUNTRIES_URL, this.buildHeader());
  }
}
