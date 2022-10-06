import {
	Component,
	HostBinding,
	ContentChildren,
	QueryList,
	AfterContentInit,
	Input,
	HostListener,
	ViewChild,
	ElementRef,
	EventEmitter,
	Output
} from "@angular/core";
import { ListColumn } from "./list-column.component";

/**
 * `ListRow` provides a container for the `ListColumn`s that make up the body of a structured list.
 *
 * Example:
 * ```html
 * 	<ibm-list-row>
 *		<ibm-list-column>Row 1</ibm-list-column>
 *		<ibm-list-column nowrap="true">Row One</ibm-list-column>
 *		<ibm-list-column>
 *			Lorem ipsum dolor sit amet,
 *			consectetur adipiscing elit. Nunc dui magna,
 *			finibus id tortor sed, aliquet bibendum augue.
 *			Aenean posuere sem vel euismod dignissim. Nulla ut cursus dolor.
 *			Pellentesque vulputate nisl a porttitor interdum.
 *		</ibm-list-column>
 *	</ibm-list-row>
 * ```
 */
@Component({
	selector: "ibm-list-row",
	template: `
		<ng-content></ng-content>
		<ng-container *ngIf="selection">
			<input
				#input
				tabindex="-1"
				class="bx--structured-list-input"
				type="radio"
				[value]="value"
				[name]="name"
				[title]="label"
				(change)="onChange($event)"
				[checked]="selected"/>
			<div class="bx--structured-list-td">
				<svg ibmIcon="checkmark--filled" size="16" class="bx--structured-list-svg"></svg>
			</div>
		</ng-container>
	`
})
export class ListRow implements AfterContentInit {
	@Input() @HostBinding("class.bx--structured-list-row--selected") selected = false;
	/**
	 * Applies an accessible label to the row. Defaults to no label.
	 */
	@Input() @HostBinding("attr.aria-label") label;
	/**
	 * The value for the row. Returned via `ngModel` or `selected` event on the containing `StructuredList`.
	 */
	@Input() value;
	/**
	 * Internal event used to notify the containing `StructuredList` of changes.
	 */
	@Output() change: EventEmitter<Event> = new EventEmitter();

	/**
	 * Set by the containing `StructuredList`. Enables or disables row level selection features.
	 */
	selection = false;
	/**
	 * Set by the containing `StructuredList`. When `selection = true`, used for the `name` property on the radio input.
	 */
	name = "list";

	@HostBinding("class.bx--structured-list-row") wrapper = true;
	@HostBinding("attr.tabindex") tabindex = this.selection ? "0" : null;

	@ContentChildren(ListColumn) columns: QueryList<ListColumn>;

	// @ts-ignore
	@ViewChild("input", { static: false }) input: ElementRef;

	ngAfterContentInit() {
		this.columns.forEach(column => {
			column.isBodyColumn = true;
			column.isHeaderColumn = false;
		});
	}

	@HostListener("click")
	onclick() {
		if (this.selection) {
			this.input.nativeElement.click();
		}
	}

	onChange(event) {
		this.change.emit(event);
	}
}
