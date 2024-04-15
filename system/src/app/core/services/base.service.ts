import { Injectable } from '@angular/core';
import { RequestCache } from '../utils/request-cache.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, map, of } from 'rxjs';

type HttpMethodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected _baseUrl: string;
  protected _token: string;

  constructor(private _cache: RequestCache, private _htttp: HttpClient, private _config: ConfigService) {
    this._baseUrl = `${this._config.getGitUrl()}/api/v${this._config.getGitApiVersion()}`;
    this._token = this._config.getGitToken();
  }

  public get<T>(url: string) {
    return this._sendRequest<T>('GET', url);
  }

  public post<T>(url: string, body?: Record<string, unknown>) {
    return this._sendRequest<T>('POST', url, body);
  }

  public put<T>(url: string, body?: Record<string, unknown>) {
    return this._sendRequest<T>('PUT', url, body);
  }

  public patch<T>(url: string, body?: Record<string, unknown>) {
    return this._sendRequest<T>('PATCH', url, body);
  }

  public delete<T>(url: string) {
    return this._sendRequest<T>('DELETE', url);
  }

  private _sendRequest<T>(method: HttpMethodType, url: string, body: Record<string, unknown> | null = null): Observable<T> {
    const cache = this._cache.get<T>(url, method, body ?? {});
    
    if (cache) return of(cache);

    return this._htttp.request<T>(method, `${this._baseUrl}${url}`, {
      body,
      headers: new HttpHeaders({
        'PRIVATE-TOKEN': this._token,
        'rejectUnauthorized': 'false'
      }
    )
    }).pipe(map((response) => {
      console.log(this._config.useCache(), response)
      if (this._config.useCache()) this._cache.set(url, method, response, body ?? {});
      return response;
    }))
  }
}
