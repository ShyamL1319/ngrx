import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changeChannelName, customIncrement } from '../store/counter.actions';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss']
})
export class CounterInputComponent implements OnInit {
  counter: number = 0;
  channelName: string = "";
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.store.dispatch(customIncrement({count:+this.counter}))
  }

  onChangeChannelName() { 
    this.store.dispatch(changeChannelName({channelName: this.channelName}))
  }

}
