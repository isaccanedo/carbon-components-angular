import {
	TemplateRef,
	Component,
	ViewChild,
	OnInit,
	Input,
	OnChanges,
	SimpleChanges
} from "@angular/core";
import { TableModel } from "../table-model.class";
import { Table } from "../index";

@Component({
	selector: "app-skeleton-table",
	template: `
		<ibm-table
			style="display: block; width: 800px;"
			[model]="skeletonModel"
			[skeleton]="skeleton"
			[size]="size"
			[striped]="striped">
			<ng-content></ng-content>
		</ibm-table>
	`
})
export class SkeletonTableStory implements OnInit, OnChanges {
	@Input() size = "md";
	@Input() striped = false;
	@Input() skeleton = true;
	@Input() skeletonModel = new TableModel();

	ngOnInit() {
		// Creates an empty table with 5 rows and 5 columns
		this.skeletonModel = Table.skeletonModel(5, 5);
	}
}
