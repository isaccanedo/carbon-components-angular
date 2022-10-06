import { Directive, HostBinding } from "@angular/core";

@Directive({
	selector: "[ibmNotificationTitle]"
})
export class NotificationTitle {
	@HostBinding("class.bx--inline-notification__title") baseClass = true;
}
