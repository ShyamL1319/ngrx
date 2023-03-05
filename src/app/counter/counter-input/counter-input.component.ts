import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeChannelName, customIncrement } from '../store/counter.actions';
import { CounterState } from '../store/counter.state';

@Component({
  selector: 'app-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.scss']
})
export class CounterInputComponent implements OnInit {
  counter: number = 0;
  channelName: string = "";
  constructor(private store: Store<{counter:CounterState}>) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.store.dispatch(customIncrement({count:+this.counter}))
  }

  onChangeChannelName() { 
    this.store.dispatch(changeChannelName({channelName: this.channelName}))
  }

}
