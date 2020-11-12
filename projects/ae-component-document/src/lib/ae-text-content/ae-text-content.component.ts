import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IconType } from 'ng-icon-type';

@Component({
  selector: 'ae-text-content',
  templateUrl: './ae-text-content.component.html',
  styleUrls: ['./ae-text-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AeTextContentComponent implements OnInit {

  /**
   * @Internal
   */
  @Input() content: string;

  /**
   * @Internal
   */
  codeIcon: IconType = 'content_copy';

  constructor(private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  copyContent(): void {
    this.clipboard.copy(this.content);
  }

}
