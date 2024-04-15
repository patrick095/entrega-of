import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { RequestCache } from '../utils/request-cache.util';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { IGitUser } from '../interfaces/git.interface';

@Injectable({
  providedIn: 'root'
})
export class GitService extends BaseService {

  constructor(private _requestCache: RequestCache, private _http: HttpClient, private _configService: ConfigService) {
    super(_requestCache, _http, _configService);
  }

  public checkGitConnection(gitUrl: string, gitToken: string, version: number): Promise<string> {
    this._baseUrl = `${gitUrl}/api/v${version}`;
    this._token = gitToken;
    return new Promise((resolve, reject) => {
      this.getUser().subscribe((response) => resolve('Conexão realizada com sucesso!'), (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) {
          reject('Token inválido!');
          return;
        }
        reject('Falha ao conectar ao GIT!');
      })
    });
  }

  public getUser(): Observable<IGitUser> {
    return this.get<IGitUser>('/user');
  }
}
