import { Directive, HostBinding, Input } from "@angular/core";

/**
 * A directive for applying styling to an input element.
 *
 * Example:
 *
 * ```html
 * <input ibmText/>
 * ```
 *
 * See the [vanilla carbon docs](http://www.carbondesignsystem.com/components/text-input/code) for more detail.
 */
@Directive({
	selector: "[ibmText]"
})
export class TextInput {
	/**
	 * `light` or `dark` input theme
	 */
	@Input() theme: "light" | "dark" = "dark";

	/**
	 * Input field render size
	 */
	@Input() size: "sm" | "md" | "xl" = "md";

	@HostBinding("class.bx--text-input") inputClass = true;
	@HostBinding("class.bx--text-input--xl") get isSizeXl() {
		return this.size === "xl";
	}
	@HostBinding("class.bx--text-input--sm") get isSizeSm() {
		return this.size === "sm";
	}
	@HostBinding("class.bx--text-input--invalid") @Input() invalid = false;
	@HostBinding("class.bx--text-input__field-wrapper--warning") @Input() warn = false;
	@HostBinding("class.bx--skeleton") @Input() skeleton = false;
	@HostBinding("class.bx--text-input--light") get isLightTheme() {
		return this.theme === "light";
	}
}
