import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterInputComponent } from "./counter-input/counter-input.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { CounterComponent } from "./counter/counter.component";


const routes: Routes = [
    { path:"", component: CounterComponent }
]

@NgModule({
    declarations: [
        CounterComponent,
        CounterButtonsComponent,
        CounterInputComponent,
        CounterOutputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class CounterModule { }