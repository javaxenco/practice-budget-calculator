import {transition, trigger, useAnimation} from "@angular/animations";
import {fadeIn, fadeInUp, flash, jackInTheBox} from "ng-animate";

export const showAnimation = trigger('showUp', [
  transition('* <=> void', useAnimation(flash)),
])
