import { TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { Component } from "@angular/core";
import { IconModule } from "../icon/index";
import { AccordionItem } from "./accordion-item.component";
import { Accordion } from "./accordion.component";

@Component({
	template: `
	<ibm-accordion [size]="size">
		<ibm-accordion-item
		[disabled]="disabled"
		[title]="title"
		[skeleton]="skeleton">
			test-content
		</ibm-accordion-item>
	<ibm-accordion>`
})
class AccordionTest {
	disabled = false;
	title = "Section 1";
	skeleton = "false";
	size = "md";
}

describe("Accordion", () => {
	let fixture, wrapper, debugElement;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				Accordion,
				AccordionItem,
				AccordionTest
			],
			imports: [
				FormsModule,
				IconModule
			]
		});
	});

	it("should work", () => {
		fixture = TestBed.createComponent(Accordion);
		expect(fixture.componentInstance instanceof Accordion).toBe(true);
	});

	it("should call onClick on button click", () => {
		fixture = TestBed.createComponent(AccordionTest);
		let debugElement = fixture.debugElement.query(By.css(".bx--accordion__heading"));
		fixture.detectChanges();
		spyOn(debugElement.componentInstance.selected, "emit");
		debugElement.triggerEventHandler("click", null);
		fixture.detectChanges();
		expect(debugElement.componentInstance.selected.emit).toHaveBeenCalled();
	});

	it("should expand on button click", () => {
		fixture = TestBed.createComponent(AccordionTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		debugElement = fixture.debugElement.query(By.css(".bx--accordion__heading"));
		debugElement.triggerEventHandler("click", null);
		fixture.detectChanges();
		expect(debugElement.nativeElement.getAttribute("aria-expanded")).toEqual("true");
	});

	it("should not expand disabled items", () => {
		fixture = TestBed.createComponent(AccordionTest);
		wrapper = fixture.componentInstance;
		wrapper.disabled = true;
		fixture.detectChanges();
		debugElement = fixture.debugElement.query(By.css(".bx--accordion__heading"));
		debugElement.nativeElement.click();
		fixture.detectChanges();
		expect(debugElement.nativeElement.getAttribute("aria-expanded")).toEqual("false");
	});

	it("should set test-content into accordion item", () => {
		fixture = TestBed.createComponent(AccordionTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		debugElement = fixture.debugElement.query(By.css("ibm-accordion .bx--accordion__content"));
		expect(debugElement.nativeElement.textContent).toContain("test-content");
	});

	it("should set ibm-accordion item title to 'Section 1'", () => {
		fixture = TestBed.createComponent(AccordionTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		debugElement = fixture.debugElement.query(By.css("ibm-accordion .bx--accordion__title"));
		expect(debugElement.nativeElement.textContent).toContain("Section 1");
	});

	it("should apply style for specified size (md)", () => {
		fixture = TestBed.createComponent(AccordionTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		debugElement = fixture.debugElement.query(By.css("ibm-accordion .bx--accordion"));
		expect(debugElement.nativeElement.classList).toContain("bx--accordion--md");
	});
});
