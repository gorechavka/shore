import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get(url) {
    return this.httpClient.get(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(err) {
    if (err instanceof ErrorEvent) {
      console.log('An error occurred:', err.error.message);
    } else {
      console.log(`Backend returned code ${err.status}, ` + `body was: ${err.error}`);
    }
    return err.status;
  }
}
