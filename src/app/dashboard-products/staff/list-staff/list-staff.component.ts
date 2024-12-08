import { AsyncPipe } from "@angular/common";
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	signal,
	viewChild,
	viewChildren,
} from "@angular/core";
import { forkJoin, tap } from "rxjs";
import type { Staff } from "../../models";
import { InfoStaffService } from "../../services/info-staff.service";
import { AddStaffComponent } from "../add-staff/add-staff.component";
import { DeleteStaffComponent } from "../delete-staff/delete-staff.component";
import { EditStaffComponent } from "../edit-staff/edit-staff.component";

@Component({
	selector: "app-list-staff",
	standalone: true,
	imports: [
		DeleteStaffComponent,
		AddStaffComponent,
		EditStaffComponent,
		AsyncPipe,
	],
	templateUrl: "./list-staff.component.html",
	styleUrl: "./list-staff.component.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListStaffComponent {
	mainCheckbox = viewChild<ElementRef<HTMLInputElement>>("mainCheckbox");
	childrenCheckbox =
		viewChildren<ElementRef<HTMLInputElement>>("childrenCheckbox");
	isVisible = signal(false);
	listProductsSelect = signal<number[]>([]);
	loading = signal(false);

	//Injects
	productService = inject(InfoStaffService);

	//****//

	products$ = this.productService
		.getAllStaff()
		.pipe(tap(() => this.loading.set(true)));

	ngOnInit() {
		this.productService.getAllStaff().subscribe((resp) => console.log(resp));
	}

	onCheckboxAll() {
		const mainChecked = this.mainCheckbox()?.nativeElement.checked;
		if (!mainChecked) {
			this.childrenCheckbox().forEach((checkbox, index) => {
				checkbox.nativeElement.checked = false;
			});
			this.listProductsSelect.set([]);
			this.isVisible.set(false);
			return;
		}
		const list: number[] = this.childrenCheckbox().map((checkbox) => {
			checkbox.nativeElement.checked = true;
			return Number(checkbox.nativeElement.value);
		});

		const uniqueList: number[] = [...new Set(list)];
		this.listProductsSelect.set(uniqueList);
		this.isVisible.set(true);
	}

	onCheckbox(product: Staff) {
		console.log(product);
		const productIndex = this.listProductsSelect().indexOf(product.id);

		if (productIndex !== -1) {
			this.listProductsSelect().splice(productIndex, 1);
		} else {
			this.listProductsSelect().push(product.id);
		}

		console.log(this.listProductsSelect());

		const isChecked = this.childrenCheckbox().some(
			(checkbox) => checkbox.nativeElement.checked === true,
		);

		this.isVisible.set(isChecked);
	}

	onDeleteProducts() {
		this.loading.set(false);
		const selectProducts = this.listProductsSelect();

		const deleteObservables = selectProducts.map((productId) =>
			this.productService.deleteProducts(productId),
		);

		forkJoin(deleteObservables).subscribe({
			next: (results) => {
				console.log("Productos eliminados:", results);

				this.listProductsSelect.set([]);
				this.isVisible.set(false);
				this.refresh();
			},
			error: (error) => {
				console.error("Error al eliminar productos:", error);
			},
			complete: () => {
				this.loading.set(true);
			},
		});
	}

	refresh() {
		this.products$ = this.productService.getAllStaff();
	}
}
