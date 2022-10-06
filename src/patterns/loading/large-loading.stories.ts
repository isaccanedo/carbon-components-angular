import { Component } from "@angular/core";
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { withKnobs } from "@storybook/addon-knobs/angular";
import { GridModule } from "../../grid/index";
import { UIShellModule } from "../../ui-shell/index";
import { ProgressIndicatorModule } from "../../progress-indicator/index";
import { PlaceholderModule } from "../../placeholder/index";
import { InputModule } from "../../input/index";
import { DropdownModule } from "../../dropdown/index";
import { LoadingModule } from "../../loading/index";
import { ButtonModule } from "../../button/index";
import {
	FormGroup,
	FormControl,
	Validators,
	FormsModule,
	ReactiveFormsModule
} from "@angular/forms";

@Component({
	selector: "app-sample-large-loading",
	template: `
	<div ibmGrid>
		<div ibmRow class="header">
			<ibm-header name="Patterns">
				<ibm-hamburger></ibm-hamburger>
			</ibm-header>
		</div>
		<div ibmRow class="progress-indicator-wrapper">
			<ibm-progress-indicator [steps]="steps"></ibm-progress-indicator>
		</div>
		<div ibmRow class="form">
			<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
				<div class="bx--form-item">
					<ibm-label
						helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
						[invalid]="isInvalid('input')"
						invalidText="Please enter a response">
						Text input label
						<input
							ibmText
							formControlName="input"
							placeholder="Optional placeholder text">
					</ibm-label>
				</div>
				<div class="bx--form-item">
					<ibm-label
						helperText="Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)"
						[invalid]="isInvalid('textArea')"
						invalidText="Please enter a response">
						Text input label
						<textarea
							ibmTextArea
							formControlName="textArea"
							placeholder="Optional placeholder text">
						</textarea>
					</ibm-label>
				</div>
				<div class="bx--form-item">
					<div class="dropdown-wrapper">
						<ibm-dropdown
							label="Choose one option"
							[invalid]="isInvalid('dropdown')"
							invalidText="Please choose an option"
							placeholder="Select an option"
							formControlName="dropdown">
							<ibm-dropdown-list [items]="items"></ibm-dropdown-list>
						</ibm-dropdown>
					</div>
				</div>
				<div class="bx--form-item">
					<button
						class="form-button"
						ibmButton
						type="submit">
						Show Loading
					</button>
				</div>
			</form>
		</div>
	</div>
	<ibm-loading
		*ngIf="isLoading"
		[isActive]="isLoading"
		size="normal"
		[overlay]="overlay">
	</ibm-loading>
	`,
	styles: [`
		.header {
			margin-bottom: 80px;
		}

		.progress-indicator-wrapper {
			margin-bottom: 50px;
		}

		.dropdown-wrapper {
			width: 50%;
		}
	`
	]
})
class SampleLargeLoading {
	isLoading = false;
	overlay = false;

	formGroup = new FormGroup({
		input: new FormControl("", [ Validators.required ]),
		textArea: new FormControl("", [ Validators.required ]),
		dropdown: new FormControl("", [ Validators.required ])
	});

	steps = [
		{
			text: "First step",
			state: ["complete"]
		},
		{
			text: "Second step",
			state: ["complete"],
			tooltip: { content: "Overflow tooltip content.", trigger: "click", placement: "bottom" }
		},
		{
			text: "Third step",
			state: ["current"],
			tooltip: {
				content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Animi consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
					blanditiis cumque maxime tenetur veniam est illo deserunt sint quae pariatur.
					Laboriosam, consequatur.`,
				trigger: "click",
				placement: "bottom"
			}
		},
		{
			text: "Fourth step",
			state: ["incomplete"]
		},
		{
			text: "Fifth step",
			state: ["incomplete"]
		}
	];

	items = [
		{ content: "Option 1" },
		{ content: "Option 2" },
		{ content: "Option 3" },
		{ content: "Option 4" },
		{ content: "Option 5" }
	];

	onSubmit() {
		this.isLoading = true;
		this.overlay = true;

		setTimeout(() => {
			this.isLoading = false;
			this.overlay = false;
		}, 2000);

		if (this.formGroup.invalid) {
			const invalidFields = [].slice.call(document.getElementsByClassName("ng-invalid"));
			invalidFields[1].focus();
		}
		return;
	}

	isInvalid(controlName: string): boolean {
		const control = this.formGroup.get(controlName);

		return control && control.invalid && (control.dirty || control.touched);
	}
}

storiesOf("Patterns|Loading", module)
	.addDecorator(
		moduleMetadata({
			declarations: [ SampleLargeLoading ],
			imports: [
				DropdownModule,
				GridModule,
				UIShellModule,
				ProgressIndicatorModule,
				PlaceholderModule,
				InputModule,
				LoadingModule,
				FormsModule,
				ReactiveFormsModule,
				ButtonModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Large Loading", () => ({
		template: `
			<!--
				app-* components are for demo purposes only.
				You can create your own implementation by using the component source as an example.
			-->
			<app-sample-large-loading></app-sample-large-loading>
		`
	}));
