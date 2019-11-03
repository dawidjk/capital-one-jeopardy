import { HammerGestureConfig } from '@angular/platform-browser';

export class HammerJSConfig extends HammerGestureConfig  {
    overrides =  {
        swipe: {velocity: 0.4, threshold: 20} // override default settings
    } as any;
  }
