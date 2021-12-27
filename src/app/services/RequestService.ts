import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class RequestService {

  baseURL: string = "localhost:8080/";

  constructor(private http: HttpClient) {
  }

  getDokuBinary(url: string): Observable<any> {

    const response$ = this.http.get(url);
    return response$;
  }

}
