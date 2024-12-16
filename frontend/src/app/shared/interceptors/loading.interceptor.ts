import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

var pendingRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService: LoadingService = inject(LoadingService);
  loadingService.showLoading();
  pendingRequest = pendingRequest + 1;
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          handleHideLoading(loadingService);
        }
      },
      error: (_) => {
        handleHideLoading(loadingService);
      },
    }),
  );
};

function handleHideLoading(loadingService: LoadingService) {
  pendingRequest = pendingRequest - 1;
  if (pendingRequest === 0) {
    loadingService.hideLoading();
  }
}
