import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { comExibirTags } from './prototipador/principal/carregador-com-tags';
import { ParserPosicional } from './traducao/parser-posicional';

export function criarCarregadorDeTraducoes(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // MessageService na raiz: um único <p-toast> (no AppComponent) atende todas as telas
    MessageService,
    // Confirmações (ex.: sair com alterações não salvas); um único <p-confirmDialog> no AppComponent
    ConfirmationService,
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'pt',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => comExibirTags(criarCarregadorDeTraducoes(http)),
          deps: [HttpClient],
        },
        // Tags da planilha usam parâmetros posicionais: {0}, {1}
        parser: { provide: TranslateParser, useClass: ParserPosicional },
      }),
    ),
  ],
};
