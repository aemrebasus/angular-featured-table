import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { IconType } from 'ng-icon-type';

export interface AeComponentView {
  name?: string;
  HTML?: string;
  CSS?: string;
  TS?: string;
  component?: any;
}

@Component({
  selector: 'ae-component-view',
  templateUrl: './ae-component-view.component.html',
  styleUrls: ['./ae-component-view.component.scss'],
})
export class AeComponentViewComponent implements OnInit, AfterViewInit {

  /**
   * @Input
   */
  @Input() input: AeComponentView = {
    name: 'No NAME Provided',
    HTML: 'No HTML Provided',
    CSS: 'No CSS Provided',
    TS: 'No TS Provided',
  };

  /**
   * @Internal
   */
  openCodeIcon: IconType = 'code';

  /**
   * @Internal
   */
  copyIcon: IconType = 'content_copy';

  /**
   * @Internal
   */
  contentVisible = false;


  constructor() {

  }

  ngAfterViewInit(): void {
    const s = this.input;
    this.input = null;
    this.input = s;
  }

  ngOnInit(): void {

  }

}
