import {
	Component,
	Input,
	Output,
	EventEmitter
} from "@angular/core";

/**
 * Contained by `HeaderGlobal`. Generally used to trigger `Panel`s
 */
@Component({
	selector: "ibm-header-action",
	template: `
		<button
			class="bx--header__action"
			[ngClass]="{
				'bx--header__action--active': active
			}"
			[title]="title"
			[attr.aria-label]="ariaLabel"
			(click)="onClick()">
			<ng-content></ng-content>
		</button>
	`
})
export class HeaderAction {
	/**
	 * Title. Populates the aria-label as well as the browser `title` tooltip
	 */
	@Input() title = "";
	/**
	 * Sets the aria label on the nav element.
	 */
	@Input() ariaLabel: string;
	/**
	 * Toggles the active state. May be used to toggle a `Panel`s active state.
	 */
	@Input() active = false;
	/**
	 * "Change" emitter to allow double binding to the `active` Input.
	 */
	@Output() activeChange = new EventEmitter<boolean>();
	/**
	 * Emits when the action has been clicked.
	 */
	@Output() selected = new EventEmitter<boolean>();

	onClick() {
		this.active = !this.active;
		this.selected.emit(this.active);
		this.activeChange.emit(this.active);
	}
}
