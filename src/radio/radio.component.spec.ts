import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DebugElement, Component } from "@angular/core";

import { Radio } from "./radio.component";
import { RadioGroup } from "./radio-group.component";

@Component({
	selector: "test-component",
	template: `
	<ibm-radio-group [(ngModel)]="radio">
		<ibm-radio *ngFor="let one of manyRadios" [value]="one"
			class="indent">Radio {{one}}
		</ibm-radio>
	</ibm-radio-group>`
})
class RadioTest {
	manyRadios = ["one", "two", "three", "four", "five", "six"];
	radio: string;
}

describe("RadioGroup", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Radio, RadioGroup, RadioTest],
			imports: [FormsModule]
		}).compileComponents();
	}));

	it("should work", () => {
		const fixture = TestBed.createComponent(RadioTest);
		fixture.detectChanges();

		const directiveEl = fixture.debugElement.query(By.directive(RadioGroup));
		expect(directiveEl).not.toBeNull();
	});

	it("should select one", () => {
		const fixture = TestBed.createComponent(RadioTest);
		fixture.detectChanges();

		const radioOne = fixture.debugElement.query(By.directive(Radio));
		radioOne.triggerEventHandler("click", null);
		radioOne.nativeElement.querySelector("input").click();
		fixture.detectChanges();

		expect(fixture.componentInstance.radio).toBe("one");
	});
});

describe("RadioComponent", () => {
	let component: Radio;
	let fixture: ComponentFixture<Radio>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [Radio]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(Radio);
		component = fixture.componentInstance;
		de = fixture.debugElement.query(By.css("label"));
		el = de.nativeElement;
	});

	it("should work", () => {
		expect(component instanceof Radio).toBe(true);
	});
});
