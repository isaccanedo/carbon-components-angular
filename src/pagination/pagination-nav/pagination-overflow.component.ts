import {
	Component,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import { I18n } from "carbon-components-angular/i18n";

/**
 * Used to present a selection of pages when there is an overflow
 * in the pagination list
 *
 * * ```html
 * <ibm-pagination-overflow [fromIndex]="5" [count]="30" (change)="handleChange(value)"></ibm-pagination-overflow>
 * ```
 */
@Component({
	selector: "ibm-pagination-overflow",
	template: `
		<li class="bx--pagination-nav__list-item" *ngIf="count > 1">
			<div class="bx--pagination-nav__select">
			<select
				[attr.aria-label]="ariaLabel"
				class="bx--pagination-nav__page bx--pagination-nav__page--select"
				(change)="handleChange($event)">
				<option value="" hidden></option>
				<option
				*ngFor="let item of countAsArray; let i = index">
					{{fromIndex + i + 1}}
				</option>
			</select>
			<div class="bx--pagination-nav__select-icon-wrapper">
				<svg
					ibmIcon="overflow-menu--horizontal"
					size="16"
					style="display: inherit"
					class="bx--pagination-nav__select-icon">
				</svg>
			</div>
			</div>
		</li>
		<ibm-pagination-nav-item *ngIf="count === 1" [page]="fromIndex + 1"></ibm-pagination-nav-item>
	`
})
export class PaginationOverflow {
	/**
	 * The page for this component to dipslay
	 */
	@Input() fromIndex: number;

	@Input() count: number;

	@Input() ariaLabel: string = this.i18n.get().PAGINATION.SELECT_ARIA;

	/**
	 * Emits click event
	 */
	@Output() change = new EventEmitter<number>();

	get countAsArray() {
		return [...Array(this.count)];
	}

	constructor(protected i18n: I18n) {}

	handleChange(event) {
		this.change.emit(+event.target.value);
		event.target.value = "";
	}
}
