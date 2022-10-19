import {SnackbarService} from "../services/snackbar.service";
import {ErrorHandler, Injectable, NgZone} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private snackbarService: SnackbarService,
    private zone: NgZone
  ) {}

  handleError(error: any) {

    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection;
    }
    this.zone.run(() =>
      this.snackbarService.showMessage(
        `${error?.message || 'Undefined client error'}`
      )
    );
  }
}
