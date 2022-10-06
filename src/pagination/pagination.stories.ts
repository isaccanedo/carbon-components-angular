import {
	Component,
	OnInit,
	Input
} from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs, number, boolean } from "@storybook/addon-knobs/angular";

import { NFormsModule } from "..";
import { PaginationModule, PaginationModel } from "./index";
import { DocumentationModule } from "./../documentation-component/documentation.module";

@Component({
	selector: "app-pagination",
	template: `
		<ibm-pagination
			[model]="model"
			[disabled]="disabled"
			[pageInputDisabled]="pageInputDisabled"
			[pagesUnknown]="pagesUnknown"
			[showPageInput]="showPageInput"
			[skeleton]="skeleton"
			(selectPage)="selectPage($event)">
		</ibm-pagination>
	`
})
class PaginationStory implements OnInit {
	@Input() model = new PaginationModel();
	@Input() skeleton = false;
	@Input() disabled = false;
	@Input() pageInputDisabled = false;
	@Input() pagesUnknown = false;
	@Input() showPageInput = true;

	@Input() get totalDataLength() {
		return this.model.totalDataLength;
	}
	set totalDataLength(value) {
		this.model.totalDataLength = value;
	}

	ngOnInit() {
		this.model.pageLength = 10;
		this.model.currentPage = 1;
	}

	selectPage(page) {
		console.log("Loading page", page, "from pagination model");
		this.model.currentPage = page;
	}
}


storiesOf("Components|Pagination", module).addDecorator(
		moduleMetadata({
			imports: [
				NFormsModule,
				PaginationModule,
				DocumentationModule
			],
			declarations: [
				PaginationStory
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div style="width: 800px">
				<!--
					app-* components are for demo purposes only.
					You can create your own implementation by using the component source as an example.
				-->
				<app-pagination
					[disabled]="disabled"
					[pageInputDisabled]="pageInputDisabled"
					[pagesUnknown]="pagesUnknown"
					[totalDataLength]="totalDataLength"
					[showPageInput]="showPageInput">
				</app-pagination>
			</div>
		`,
		props: {
			disabled: boolean("Disabled buttons", false),
			pageInputDisabled: boolean("Disable page input", false),
			pagesUnknown: boolean("Total number of items unknown ", false),
			totalDataLength: number("Total number of items", 105),
			showPageInput: boolean("Show the page selects", true)
		}
	}))
	.add("Skeleton", () => ({
		template: `
			<div style="width: 800px">
				<!--
					app-* components are for demo purposes only.
					You can create your own implementation by using the component source as an example.
				-->
				<app-pagination [totalDataLength]="totalDataLength" [skeleton]="true"></app-pagination>
			</div>
		`,
		props: {
			totalDataLength: number("totalDataLength", 105)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_pagination.pagination.html"></ibm-documentation>
		`
	}));

