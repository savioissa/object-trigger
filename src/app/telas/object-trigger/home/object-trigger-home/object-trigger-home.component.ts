import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable, catchError, finalize, forkJoin, map, of, switchMap, tap } from 'rxjs';

import { GrupoCategoria, ObjectTrigger, Webhook } from '../../object-trigger.model';
import {
  criarObjectTriggerForm,
  definirSomenteLeitura,
  paraObjectTrigger,
  podeCriar,
  preencherObjectTriggerForm,
  retratoObjectTrigger
} from '../../object-trigger-form.factory';
import { ObjectTriggerService } from '../../object-trigger.service';
import { deCamposDTO, deObjectTriggerDTO, deWebhookDTO, paraObjectTriggerDTO } from '../../object-trigger.conversao';
import { ObjectTriggerFormComponent } from '../../create/object-trigger-form/object-trigger-form.component';
import { ComAlteracoesNaoSalvas, confirmarDescarte } from '../../../compartilhado/alteracoes-nao-salvas/alteracoes-nao-salvas.guard';

/**
 * Página do gatilho: o mesmo formulário do cadastro, em somente leitura.
 * "Editar" libera os campos; em edição, "Cancelar" descarta as alterações e "Salvar" grava.
 */
@Component({
  selector: 'app-object-trigger-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [RouterLink, TranslateModule, ButtonModule, SkeletonModule, ObjectTriggerFormComponent],
  templateUrl: './object-trigger-home.component.html',
  styleUrl: './object-trigger-home.component.css'
})
export class ObjectTriggerHomeComponent implements OnInit, ComAlteracoesNaoSalvas {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ObjectTriggerService);
  private readonly messages = inject(MessageService);
  private readonly confirmacao = inject(ConfirmationService);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = criarObjectTriggerForm();

  /** Gatilho como está salvo: o cabeçalho mostra sempre este, não o que está sendo editado. */
  protected gatilho: ObjectTrigger | null = null;
  protected categorias: GrupoCategoria[] = [];
  protected webhooks: Webhook[] = [];

  protected carregando = true;
  protected editando = false;
  protected salvando = false;

  /** Retrato do gatilho salvo, para saber se o usuário alterou algo. */
  private retratoSalvo = '';

  /** Em edição, há alguma alteração em relação ao gatilho salvo (usado pela confirmação de saída). */
  temAlteracoesNaoSalvas(): boolean {
    return this.editando && !this.salvando && retratoObjectTrigger(this.form) !== this.retratoSalvo;
  }

  /** Recarregar ou fechar a aba com alterações não salvas: aviso nativo do navegador. */
  @HostListener('window:beforeunload', ['$event'])
  protected avisarAntesDeSair(evento: BeforeUnloadEvent): void {
    if (this.temAlteracoesNaoSalvas()) {
      evento.preventDefault();
      evento.returnValue = '';
    }
  }

  /** "Salvar": em edição, com alguma alteração em relação ao salvo e tudo válido (mesmas regras do "Criar"). */
  protected get podeSalvar(): boolean {
    return podeCriar(this.form) && this.temAlteracoesNaoSalvas();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(() => {
          this.carregando = true;
          this.editando = false;
        }),
        switchMap(params =>
          forkJoin({
            gatilho: this.service.buscar(Number(params.get('id'))).pipe(
              map(deObjectTriggerDTO),
              catchError(() => of(null))
            ),
            opcoes: this.carregarOpcoes()
          }).pipe(finalize(() => (this.carregando = false)))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ gatilho, opcoes }) => {
        this.categorias = opcoes.categorias;
        this.webhooks = opcoes.webhooks;
        this.exibirSalvo(gatilho);
      });
  }

  /** Libera os campos para edição. */
  editar(): void {
    if (!this.gatilho || this.editando) {
      return;
    }
    this.editando = true;
    definirSomenteLeitura(this.form, false);
  }

  /**
   * Descarta as alterações e volta para a leitura. Com alguma alteração, antes pede
   * confirmação ("Descartar alterações"); sem alteração, volta direto.
   */
  protected async cancelar(): Promise<void> {
    if (this.temAlteracoesNaoSalvas() && !(await confirmarDescarte(this.confirmacao, this.translate))) {
      return;
    }
    this.exibirSalvo(this.gatilho);
  }

  protected salvar(): void {
    if (!this.podeSalvar || !this.gatilho) {
      return;
    }
    this.salvando = true;
    this.service
      .atualizar(paraObjectTriggerDTO({ ...paraObjectTrigger(this.form), id: this.gatilho.id }))
      .pipe(
        map(deObjectTriggerDTO),
        finalize(() => (this.salvando = false))
      )
      .subscribe({
        next: salvo => {
          this.exibirSalvo(salvo);
          this.messages.add({
            severity: 'success',
            summary: this.translate.instant('portal.generic.label.all-changes-saved')
          });
        },
        error: () =>
          this.messages.add({
            severity: 'error',
            summary: this.translate.instant('portal.generic.label.error-saving-trigger'),
            detail: this.translate.instant('portal.generic.label.unable-save-trigger')
          })
      });
  }

  /** Mostra o gatilho salvo em somente leitura. */
  private exibirSalvo(gatilho: ObjectTrigger | null): void {
    this.gatilho = gatilho;
    this.editando = false;
    if (gatilho) {
      preencherObjectTriggerForm(this.form, gatilho);
      this.retratoSalvo = retratoObjectTrigger(this.form);
    }
    definirSomenteLeitura(this.form, true);
  }

  /** Categorias e webhooks; se algum falhar, a página abre sem eles e avisa por toast. */
  private carregarOpcoes(): Observable<{ categorias: GrupoCategoria[]; webhooks: Webhook[] }> {
    return forkJoin({
      categorias: this.service.listarCampos().pipe(map(deCamposDTO)),
      webhooks: this.service.listarWebhooks().pipe(map(lista => lista.map(deWebhookDTO)))
    }).pipe(
      catchError(() => {
        this.messages.add({
          severity: 'error',
          summary: this.translate.instant('portal.generic.label.error-loading-data'),
          detail: this.translate.instant('portal.generic.label.unable-load-form-options')
        });
        return of({ categorias: [], webhooks: [] });
      })
    );
  }
}
