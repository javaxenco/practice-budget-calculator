import {transition, trigger, useAnimation} from "@angular/animations";
import { jackInTheBox} from "ng-animate";

export const showAnimation = trigger('showUp', [
  transition('* <=> void', useAnimation(jackInTheBox)),
])
