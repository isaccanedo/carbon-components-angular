import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs/angular";

import { RadioModule } from "../";
import { DocumentationModule } from "../documentation-component/documentation.module";
import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-reactive-forms",
	template: `
		<form [formGroup]="formGroup">
			<ibm-radio-group
				aria-label="radiogroup"
				formControlName="radioGroup">
				<ibm-radio
					value="radio">
					zero
				</ibm-radio>
				<ibm-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</ibm-radio>
			</ibm-radio-group>
		</form>

		<button (click)="changeSelected()">Set selected to three</button>
		<button (click)="disableGroup()">Set group disabled</button>
	`
})
class ReactiveFormsStory implements AfterViewInit, OnInit {
	public formGroup: FormGroup;

	manyRadios = [
		{ num: "one" },
		{ num: "two" },
		{ num: "three" },
		{ num: "four", disabled: true }
	];

	constructor(protected formBuilder: FormBuilder) {}

	changeSelected() {
		this.formGroup.get("radioGroup").setValue("three");
	}

	disableGroup() {
		this.formGroup.get("radioGroup").disable();
	}

	ngOnInit() {
		this.formGroup = this.formBuilder.group({
			radioGroup: new FormControl()
		});
	}

	ngAfterViewInit() {
		this.formGroup.get("radioGroup").setValue("one");
	}
}

storiesOf("Components|Radio", module).addDecorator(
	moduleMetadata({
		declarations: [ReactiveFormsStory],
		imports: [RadioModule, DocumentationModule, ReactiveFormsModule]
	})
)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
		<fieldset class="bx--fieldset">
			<legend class="bx--label">{{label}}</legend>
			<ibm-radio-group
				[disabled]="disabled"
				aria-label="radiogroup"
				[(ngModel)]="radio"
				(change)="onChange($event)">
				<ibm-radio
					value="radio"
					[checked]="true">
					zero
				</ibm-radio>
				<ibm-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</ibm-radio>
			</ibm-radio-group>
		</fieldset>
		<button (click)="disabled = !disabled">Toggle group disabled</button>
		`,
		props: {
			onChange: action("Radio change"),
			label: text("Label text", "Radio Button heading"),
			manyRadios: [
				{ num: "one" },
				{ num: "two" },
				{ num: "three" },
				{ num: "four", disabled: true }
			]
		}
	}))
	.add("Vertical", () => ({
		template: `
		<fieldset class="bx--fieldset">
			<legend class="bx--label">Radio button label</legend>

			<ibm-radio-group
				aria-label="radiogroup"
				orientation="vertical"
				[labelPlacement]="labelPlacement"
				[(ngModel)]="radio"
				(change)="onChange($event)">
				<ibm-radio
					value="radio"
					[checked]="true">
					zero
				</ibm-radio>
				<ibm-radio *ngFor="let radio of manyRadios"
					[value]="radio.num"
					[disabled]="radio.disabled">
					{{radio.num}}
				</ibm-radio>
			</ibm-radio-group>
		</fieldset>
		`,
		props: {
			onChange: action("Radio change"),
			labelPlacement: select("Label placement", ["right", "left"], "right"),
			manyRadios: [
				{ num: "one" },
				{ num: "two" },
				{ num: "three" },
				{ num: "four", disabled: true }
			]
		}
	}))
	.add("With reactive forms", () => ({
		template: `
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-reactive-forms></app-reactive-forms>
		`
	}))
	.add("Skeleton", () => ({
		template: `
		<ibm-radio-group skeleton="true">
			<ibm-radio></ibm-radio>
		</ibm-radio-group>
		`
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_radio.radio.html"></ibm-documentation>
		`
	}))
	.add("Radio Group Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/classes/src_radio.radiogroup.html"></ibm-documentation>
		`
	}));
