import {
	Component,
	Input,
	ContentChildren,
	QueryList,
	AfterContentInit,
	ContentChild,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { Tab } from "./tab.component";
import { TabHeaders } from "./tab-headers.component";


/**
 * Build out your application's tabs using this component.
 * This is the parent of the `Tab` and `TabHeader` components.
 *
 * [See demo](../../?path=/story/components-tabs--basic)
 *
 * `Tabs` expects a set of `n-tab` elements
 *
 * ```html
 * <ibm-tabs>
 * 	<ibm-tab heading='tab1'>
 * 		tab 1 content
 * 	</ibm-tab>
 * 	<ibm-tab heading='tab1'>
 * 		tab 2 content
 * 	</ibm-tab>
 * 	<!-- ... -->
 * 	<ibm-tab heading='tab1'>
 * 		tab n content
 * 	</ibm-tab>
 * </ibm-tabs>
 * ```
 *
 * <example-url>../../iframe.html?id=components-tabs--basic</example-url>
 */
@Component({
	selector: "ibm-tabs",
	template: `
			<ibm-tab-headers
				*ngIf="hasTabHeaders() && position === 'top'"
				[skeleton]="skeleton"
				[tabs]="tabs"
				[followFocus]="followFocus"
				[cacheActive]="cacheActive"
				[contentBefore]="before"
				[contentAfter]="after"
				[ariaLabel]="ariaLabel"
				[ariaLabelledby]="ariaLabelledby"
				[type]="type">
			</ibm-tab-headers>
			<ng-content></ng-content>
			<ng-template #before>
				<ng-content select="[before]"></ng-content>
			</ng-template>
			<ng-template #after>
				<ng-content select="[after]"></ng-content>
			</ng-template>
			<ibm-tab-headers
				*ngIf="hasTabHeaders() && position === 'bottom'"
				[skeleton]="skeleton"
				[tabs]="tabs"
				[cacheActive]="cacheActive"
				[type]="type">
			</ibm-tab-headers>
	`
})
export class Tabs implements AfterContentInit, OnChanges {
	/**
	 * Takes either the string value 'top' or 'bottom' to place TabHeader
	 * relative to the `TabPanel`s.
	 */
	@Input() position: "top" | "bottom" = "top";
	/**
	 * Set to 'true' to have `Tab` items cached and not reloaded on tab switching.
	 */
	@Input() cacheActive = false;
	/**
	 * Set to 'true' to have tabs automatically activated and have their content displayed when they receive focus.
	 */
	@Input() followFocus = true;
	/**
	 * Set to `true` to put tabs in a loading state.
	 */
	@Input() skeleton = false;
	/**
	 * Set to `true` to have the tabIndex of the all tabpanels be -1.
	 */
	@Input() isNavigation = false;
	/**
	 * Sets the aria label on the `TabHeader`s nav element.
	 */
	@Input() ariaLabel: string;
	/**
	 * Sets the aria labelledby on the `TabHeader`s nav element.
	 */
	@Input() ariaLabelledby: string;
	/**
	 * Sets the type of the `TabHeader`s
	 */
	@Input() type: "default" | "container" = "default";

	/**
	 * Maintains a `QueryList` of the `Tab` elements and updates if `Tab`s are added or removed.
	 */
	@ContentChildren(Tab, { descendants: false }) tabs: QueryList<Tab>;
	/**
	 * Content child of the projected header component
	 */
	// @ts-ignore
	@ContentChild(TabHeaders, { static: false }) tabHeaders;

	/**
	 * After content is initialized update `Tab`s to cache (if turned on) and set the initial
	 * selected Tab item.
	 */
	ngAfterContentInit() {
		if (this.tabHeaders) {
			this.tabHeaders.cacheActive = this.cacheActive;
		}

		this.tabs.forEach(tab => {
			tab.tabIndex = this.isNavigation ? null : 0;
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.tabHeaders && changes.cacheActive) {
			this.tabHeaders.cacheActive = this.cacheActive;
		}

		if (this.tabs && changes.isNavigation) {
			this.tabs.forEach(tab => {
				tab.tabIndex = this.isNavigation ? null : 0;
			});
		}
	}

	/**
	 * true if the n-tab's are passed directly to the component as children
	 */
	hasTabHeaders() {
		return this.tabs.length > 0;
	}
}
