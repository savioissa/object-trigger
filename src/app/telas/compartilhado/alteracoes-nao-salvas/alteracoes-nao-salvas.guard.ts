import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';

/**
 * Página que pode ter alterações não salvas (ex.: formulário em edição).
 * Use com `alteracoesNaoSalvasGuard` no `canDeactivate` da rota.
 */
export interface ComAlteracoesNaoSalvas {
  temAlteracoesNaoSalvas(): boolean;
}

/**
 * Ao sair de uma página com alterações não salvas (voltar, menu ou outro endereço), pede
 * confirmação. Os textos são genéricos, para qualquer página reaproveitar.
 * Recarregar ou fechar a aba é tratado pela própria página, com o aviso nativo do navegador.
 */
export const alteracoesNaoSalvasGuard: CanDeactivateFn<ComAlteracoesNaoSalvas> = pagina => {
  if (!pagina?.temAlteracoesNaoSalvas()) {
    return true;
  }
  const confirmacao = inject(ConfirmationService);
  const translate = inject(TranslateService);
  return new Promise<boolean>(resolver =>
    confirmacao.confirm({
      header: translate.instant('iclass.generic.label.discard-changes'),
      message: translate.instant('portal.generic.label.unsaved-changes-will-be-lost'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: translate.instant('portal.generic.button.discard'),
      rejectLabel: translate.instant('portal.generic.label.no-keep-editing'),
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'btn--md btn--danger',
      rejectButtonStyleClass: 'btn--md btn--secondary',
      defaultFocus: 'reject',
      closeOnEscape: true,
      accept: () => resolver(true),
      reject: () => resolver(false)
    })
  );
};
