import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild, viewChildren } from '@angular/core';
import { tap, forkJoin } from 'rxjs';
import type { Product } from '../../models';
import { InfoProductsService } from '../../services';
import { AsyncPipe } from '@angular/common';
import { AddClientComponent } from '../add-client/add-client.component';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { EditClientComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-list-clients',
  standalone: true,
  imports: [
    AsyncPipe,
    AddClientComponent,
    DialogsComponent,
    EditClientComponent
  ],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'wrapper'
  }
})
export default class ListClientsComponent {
  mainCheckbox = viewChild<ElementRef<HTMLInputElement>>("mainCheckbox");
	childrenCheckbox =
		viewChildren<ElementRef<HTMLInputElement>>("childrenCheckbox");
	isVisible = signal(false);
	listProductsSelect = signal<string[]>([]);
	loading = signal(false);

	//Injects
	productService = inject(InfoProductsService);

	//****//

	products$ = this.productService
		.getAllProducts()
		.pipe(tap(() => this.loading.set(true)));

	ngOnInit() {
		this.productService.getAllProducts().subscribe((resp) => console.log(resp));
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
		const list = this.childrenCheckbox().map((checkbox) => {
			checkbox.nativeElement.checked = true;
			return checkbox.nativeElement.value;
		});

		const uniqueList = [...new Set(list)];
		this.listProductsSelect.set(uniqueList);
		this.isVisible.set(true);
	}

	onCheckbox(product: Product) {
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
		this.products$ = this.productService.getAllProducts();
	}
}