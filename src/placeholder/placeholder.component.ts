import {
	Component,
	OnInit,
	ViewContainerRef,
	ViewChild,
	Input
} from "@angular/core";
import { PlaceholderService } from "./placeholder.service";

/**
 * Using a modal, dialog (Tooltip, OverflowMenu), or any other component that draws out of the normal page flow
 * in your application *requires* this component (`ibm-placeholder`).
 * It would generally be placed near the end of your root app component template
 * (app.component.ts or app.component.html) as:
 *
 * ```
 * <ibm-placeholder></ibm-placeholder>
 * ```
 */
@Component({
	selector: "ibm-placeholder",
	template: `<div #placeholder></div>`
})
export class Placeholder implements OnInit {
	@Input() id: any;
	/**
	 * Maintains a reference to the view DOM element of the `Placeholder`.
	 */
	// @ts-ignore
	@ViewChild("placeholder", { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

	/**
	 * Creates an instance of `Placeholder`.
	 */
	constructor(public placeholderService: PlaceholderService) { }

	/**
	 * Registers the components view with `PlaceholderService`
	 */
	ngOnInit() {
		// TODO use `id` to register with the placeholderService
		this.placeholderService.registerViewContainerRef(this.viewContainerRef);
	}
}
