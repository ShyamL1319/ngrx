import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './auth/store/auth.actions';
import { AppState } from './store/app.state';
import { getErrorMessage, getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked{
  title = 'ngrx';
  showLoading: Observable<boolean>;
  errorMessage: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private cdRef: ChangeDetectorRef,
  ) { }
  ngOnInit() {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
  ngAfterViewChecked(): void {
      this.cdRef.detectChanges()
  }
}
