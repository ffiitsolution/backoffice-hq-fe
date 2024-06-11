import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService, AppServiceType } from '../../../services/app.service'
import { finalize } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  title: string = 'Master Price';

  visibleFilter: boolean = false;
  loading: boolean = false;
  dataItems: any[] = [];
  CreateUpdateForm: FormGroup;
  formStatus: string;

  constructor(
    private formBuilder: FormBuilder,
    private appSvc: AppService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initFilter();
    this.initTable();
  }

  initForm(): void {
    this.CreateUpdateForm = this.formBuilder.group({
      // todo, create your form
    });
  }

  initFilter(): void {
    //todo, init your filter
  }

  initTable(): void {
    this.loading = true;
    this.dataItems = [];
    const params: any = {
      outletCode: '0208',
    };
    this.appSvc.post(AppServiceType.LIST_ITEM_PRICE, params).pipe(finalize(() => this.loading = false)).subscribe(response => {
      this.dataItems = response?.data || [];
    });
  }

  onCreateClicked() {
    this.formStatus = FORM_STATUS.CREATE;
  }

  onEditClicked(value: any) {
    this.formStatus = FORM_STATUS.UPDATE;
    this.CreateUpdateForm.patchValue(value);
  }

  onDeleteClicked(value: any) {

  }

  onFilterChange(): void {
    this.initTable();
  }

  getModalTitle(): string {
    return (this.formStatus == FORM_STATUS.CREATE ? 'Create New' : 'Update') + ' ' + this.title;
  }

  onSubmitForm() {
    const valid = this.CreateUpdateForm.valid;
    if (valid) {
      const body = this.CreateUpdateForm.getRawValue();
      // todo, create data;
    } else {
      alert('Terdapat data yang belum valid');
    }
  }

  onCancelClicked() {
    this.CreateUpdateForm.reset();
  }
}