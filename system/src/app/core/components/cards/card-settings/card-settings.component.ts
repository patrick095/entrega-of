import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, WritableSignal, afterNextRender, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GitService } from '../../../services/git.service';
import { ConfigService } from '../../../services/config.service';
import { debounceTime } from 'rxjs';
import { IConfig } from '../../../interfaces/config.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-settings',
  templateUrl: './card-settings.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [GitService],
})
export class CardSettingsComponent {
  public showToken: boolean;
  public form: FormGroup;
  public gitConectionVerified: WritableSignal<boolean> = signal(false);

  constructor(private _gitService: GitService, private _config: ConfigService, private _router: Router) {
    this.showToken = false;
    this.form = new FormGroup({
      gitUrl: new FormControl('', [Validators.required]),
      gitToken: new FormControl('', [Validators.required]),
      saveStorage: new FormControl(true, [Validators.required]),
      useCache: new FormControl(true, [Validators.required]),
    });

    afterNextRender(() => {
      const { gitUrl, gitToken, useCache, saveStorage } = this._config.getAllConfig();
      if (!!gitUrl && !!gitToken) this.gitConectionVerified.set(true);
      setTimeout(() => {
        this.form.setValue({ gitUrl, gitToken, useCache, saveStorage });
        this.watchFormAndcheckConection();
      });
    });
  }

  public save() {
    if (this.form.valid) {
      const value = this.form.value as IConfig;
      this._config.saveConfig(value);
      alert('Configurações salvas com sucesso!!');
      this._router.navigate(['/tasks'])
      return;
    }
    alert('Formulário inválido, favor verificar todos os campos');
  }

  private watchFormAndcheckConection(): void {
    this.form.valueChanges
    .pipe(debounceTime(2000))
    .subscribe(async (value) => {
      if (value.gitUrl && value.gitToken) {
        for (const version of [4,3,2,1]) {
          const checked = await this._gitService
            .checkGitConnection(value.gitUrl, value.gitToken, version)
            .then((msg) => {
              this.gitConectionVerified.set(true);
              alert(msg);
              this._config.saveConfig({
                gitUrl: value.gitUrl,
                gitToken: value.gitToken,
                useCache: false,
                saveStorage: false,
                gitApiVersion: version,
              });
              return true;
            })
            .catch((msg: string) => {
              if (version === 1) {
                this.gitConectionVerified.set(false);
                alert(msg);
              }
              return false
            });

          if (checked) break;
        }
      }
    });
  }
}
