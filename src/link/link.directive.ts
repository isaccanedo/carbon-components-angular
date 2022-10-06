import {
	Directive,
	HostBinding,
	Input
} from "@angular/core";

/**
 * A convenience directive for applying styling to a link.
 *
 * [See demo](../../?path=/story/components-link--basic)
 *
 * Example:
 *
 * ```html
 * <a href="#" ibmLink>A link</a>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/link/code) for more detail.
 *
 * <example-url>../../iframe.html?id=components-link--basic</example-url>
 */
@Directive({
	selector: "[ibmLink]"
})


export class Link {
	@HostBinding("class.bx--link") baseClass = true;

	/**
	 * Automatically set to `-1` when link is disabled.
	 */
	@HostBinding("attr.tabindex") tabindex;

	/**
	 * Set to true to show links inline in a sentence or paragraph.
	 */
	@Input()
	@HostBinding("class.bx--link--inline") inline = false;

	/**
	 * Set to true to disable link.
	 */
	@Input()
	@HostBinding("attr.aria-disabled")
	@HostBinding("class.bx--link--disabled")
	set disabled(disabled: boolean) {
		this._disabled = disabled;
		this.tabindex = this.disabled ? -1 : null;
	}

	get disabled(): boolean {
		return this._disabled;
	}

	private _disabled;
}
