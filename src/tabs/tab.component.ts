import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ContentChild,
	TemplateRef,
	HostBinding
} from "@angular/core";


let nextId = 0;

/**
* The `Tab` component is a child of the `Tabs` component.
* It represents one `Tab` item and its content within a panel of other `Tab` items.
*
*
* `Tab` takes a string or `TemplateRef` for the header, and any content for the body of the tab.
* Disabled states should be handled by the application (ie. switch to the tab, but display some
* indication as to _why_ the tab is disabled).
*
* When the tab is selected the `select` output will be triggered.
* The `select` output will also be triggered for the active tab when the tabs are loaded or updated.
*
*
* Tab with string header:
*
* ```html
* <ibm-tab heading='tab1'>
* 	tab 1 content
* </ibm-tab>
* ```
*
* Tab with custom header:
*
* ```html
* <ng-template #tabHeading>
* 	<svg ibmIcon="facebook"
* 		size="sm"
* 		style="margin-right: 7px;">
* 	</svg>
* 	Hello Tab 1
* </ng-template>
* <ibm-tabs>
* 	<ibm-tab [heading]="tabHeading">
* 		Tab 1 content <svg ibmIcon="alert" size="lg"></svg>
* 	</ibm-tab>
* 	<ibm-tab heading='Tab2'>
* 		Tab 2 content
* 	</ibm-tab>
* 	<ibm-tab heading='Tab3'>
* 		Tab 3 content
* 	</ibm-tab>
* </ibm-tabs>
* ```
*/
@Component({
	selector: "ibm-tab",
	template: `
		<div
			[attr.tabindex]="tabIndex"
			role="tabpanel"
			*ngIf="shouldRender()"
			class="bx--tab-content"
			[ngStyle]="{'display': active ? null : 'none'}"
			[attr.aria-labelledby]="id + '-header'"
			aria-live="polite">
			<ng-content></ng-content>
		</div>
	`
})
export class Tab implements OnInit {
	/**
	 * Boolean value reflects if the `Tab` is using a custom template for the heading.
	 * Default value is false.
	 */
	public headingIsTemplate = false;

	/**
	 * The `Tab`'s title to be displayed or custom temaplate for the `Tab` heading.
	 */
	@Input() heading: string | TemplateRef<any>;
	/**
	 * Optional override for the `tabItem's`'s title attribute which is set in `TabHeaders`.
	 * `tabItem`'s title attribute is automatically set to `heading`.
	 *
	 * You might want to use this if you set `heading` to a `TemplateRef`.
	 */
	@Input() title: string;
	/**
	 * Allows the user to pass data to the custom template for the `Tab` heading.
	 */
	@Input() context: any;
	/**
	 * Indicates whether the `Tab` is active/selected.
	 * Determines whether it's `TabPanel` is rendered.
	 */
	@Input() active = false;
	/**
	 * Indicates whether or not the `Tab` item is disabled.
	 */
	@Input() disabled = false;

	@Input() tabIndex = 0;
	// do we need id's?
	/**
	 * Sets the id of the `Tab`. Will be uniquely generated if not provided.
	 */
	@Input() id = `n-tab-${nextId++}`;
	/**
	 * Set to true to have Tab items cached and not reloaded on tab switching.
	 */
	@Input() set cacheActive(shouldCache: boolean) {
		this._cacheActive = shouldCache;
	}
	/**
	 * Value 'selected' to be emitted after a new `Tab` is selected.
	 */
	@Output() selected: EventEmitter<void> = new EventEmitter<void>();

	/**
	 * Used to set the id property on the element.
	 */
	@HostBinding("attr.id") attrClass = this.id;

	get cacheActive() {
		return this._cacheActive;
	}

	protected _cacheActive = false;

	/**
	 * Checks for custom heading template on initialization and updates the value
	 * of the boolean 'headingIsTemplate'.
	 */
	ngOnInit() {
		if (this.heading instanceof TemplateRef) {
			this.headingIsTemplate = true;
		}
	}

	/**
	 * Emit the status of the `Tab`, specifically 'select' and 'selected' properties.
	 */
	doSelect() {
		this.selected.emit();
	}

	/**
	* Returns value indicating whether this `Tab` should be rendered in a `TabPanel`.
	*/
	shouldRender() {
		return this.active || this.cacheActive;
	}
}
