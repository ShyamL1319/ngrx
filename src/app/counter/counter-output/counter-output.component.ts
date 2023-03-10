import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getChannelName, getCounter } from '../store/counter.selectors';
import { CounterState } from '../store/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {
  counter$!: Observable<{ counter: number }>;
  channelName$!: Observable<{ channelName: string }>;
  data$!: Observable<CounterState>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.data$ = this.store.select('counter');
    this.counter$ = this.store.select(getCounter);
    this.channelName$ = this.store.select(getChannelName);
  }
}
