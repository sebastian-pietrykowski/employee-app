import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MessageService } from './message.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export abstract class ErrorLoggingService implements OnDestroy {
  private unsubscribe$ = new Subject();

  ngOnDestroy(): void {
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }

  protected constructor(
    private derivedClassName: string,
    private readonly messageService: MessageService,
    private readonly translateService: TranslateService,
  ) {}

  protected log(
    messageKey: string | string[],
    params?: NonNullable<unknown> | undefined,
  ): void {
    this.translateService
      .get(messageKey, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((translated: string) =>
        this.messageService.add(this.derivedClassName + ': ' + translated),
      );
  }

  protected handleError<T>(operation: string, result?: T) {
    return (error: ErrorEvent): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
