import { Subject } from "rxjs";
import { TemplateRef } from "@angular/core";

export interface NotificationContent {
	[key: string]: any;
	type: string;
	title: string;
	target?: string;
	duration?: number;
	smart?: boolean;
	closeLabel?: any;
	message?: string;
	showClose?: boolean;
	lowContrast?: boolean;
	template?: TemplateRef<any>;
	actions?: NotificationAction[];
	links?: NotificationLink[];
}

export interface ToastContent extends NotificationContent {
	subtitle: string;
	caption: string;
	template?: TemplateRef<any>;
}

export interface NotificationAction {
	text: string;
	click: Subject<{event: Event, action: any}> | ((event: {event: Event, action: any}) => any);
	[x: string]: any;
}

export interface NotificationLink {
	text: string;
	href: string;
}
