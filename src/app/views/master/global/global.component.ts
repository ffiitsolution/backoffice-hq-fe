import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService, AppServiceType } from '../../../services/app.service'
import { finalize } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  title: string = 'Master Global';

  visibleFilter: boolean = false;
  loading: boolean = false;
  dataItems: any[] = [];
  CreateUpdateForm: FormGroup;
  formStatus: string;
  
  conditions: any[] = [];
  status: any[] = [
    {
      code: 'A',
      name: 'Active'
    },
    {
      code: 'I',
      name: 'Inactive'
    }
  ];
  selectedCondition: any = '';
  selectedStatus: any = '';

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
      cond: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  initFilter(): void {
    this.appSvc.post(AppServiceType.LIST_GLOBAL_CONDITION, {}).subscribe(response => {
      this.conditions = (response?.data || []).map((x: any) => {
        return {
          code: x.cond,
          name: x.cond
        }
      });
    });
  }

  initTable(): void {
    this.loading = true;
    this.dataItems = [];
    const params: any = {
      cond: this.selectedCondition,
      status: this.selectedStatus,
    };
    this.appSvc.post(AppServiceType.LIST_GLOBAL, params).pipe(finalize(() => this.loading = false)).subscribe(response => {
      this.dataItems = response?.data || [];
    });
  }

  onCreateClicked() {
    this.formStatus = FORM_STATUS.CREATE;
  }

  onEditClicked(value: any) {
    this.formStatus = FORM_STATUS.UPDATE;
    this.CreateUpdateForm.patchValue(value);
    console.log(value);
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
      // do create data;
    } else {
      alert('Terdapat data yang belum valid');
    }
  }

  onCancelClicked() {
    this.CreateUpdateForm.reset();
  }
}
