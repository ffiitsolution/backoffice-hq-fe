import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service'
import { Subject, finalize } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';
import { Page } from 'src/app/models/page';
import { ACTION } from 'src/app/constants/libraries/action';
import { DataTableDirective } from 'angular-datatables';
import { ToasterService } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  userData: any;
  title: string = 'Master Global';

  visibleFilter: boolean = false;
  loading: boolean = false;
  createUpdateForm: FormGroup;
  formStatus: string;

  conditions: any[] = [];
  status: any[] = [
    {
      code: '',
      name: 'All'
    },
    {
      code: 'A',
      name: 'Active'
    },
    {
      code: 'I',
      name: 'Inactive'
    }
  ];
  selectedCondition: string | null = null;
  selectedStatus: string | null = null;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRowData: any;
  dtColumns: any = [];
  page = new Page();

  constructor(
    private formBuilder: FormBuilder,
    private appSvc: AppService,
    private toastr: ToastrService,
    private g: GlobalService
  ) {}

  ngOnInit(): void {
    this.userData = this.g.auth.getUser();
    this.initForm();
    this.initFilter();
    this.initTable();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  initForm(): void {
    this.createUpdateForm = this.formBuilder.group({
      cond: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  initFilter(): void {
    this.appSvc.doPost('/global/param/condition').subscribe(response => {
      this.conditions = (response?.data || []).map((x: any) => {
        return {
          code: x.cond,
          name: x.cond
        }
      });
    });
  }

  initTable(): void {
    const mapData = (resp: any) => {
      return resp.data.map((item: any, index: number) => {
        const { rn, ...rest } = item;
        return {
          ...rest,
          dtIndex: this.page.start + index + 1
        };
      });
    };

    const handleButtonClick = (action: string, data: any) => {
      this.selectedRowData = data;
      let { cond, code, description, value, status } = data;
      switch (action) {
        case ACTION.EDIT:
          this.formStatus = FORM_STATUS.UPDATE;
          break;
        case ACTION.INACTIVE:
          this.formStatus = FORM_STATUS.INACTIVE;
          status = 'I';
          break;
        case ACTION.ACTIVATE:
          status = 'A';
          this.formStatus = FORM_STATUS.ACTIVATE;
          break;
      }
      this.createUpdateForm.patchValue({ cond, code, description, value, status });
      const openModalButton = document.getElementById("openModalButton");
      if (openModalButton instanceof HTMLButtonElement) {
        openModalButton.click();
      }
    };

    this.dtOptions = {
      processing: true,
      serverSide: true,
      autoWidth: true,
      info: true,
      drawCallback: () => {
        this.selectedRowData = undefined;
      },
      ajax: (dataTablesParameters: any, callback) => {
        this.page.start = dataTablesParameters.start;
        this.page.length = dataTablesParameters.length;
        dataTablesParameters['status'] = this.selectedStatus ?? '';
        dataTablesParameters['cond'] = this.selectedCondition ?? '';
        this.appSvc
          .listGlobal(dataTablesParameters)
          .subscribe((resp: any) => {
            const mappedData = mapData(resp);
            this.page.recordsTotal = resp.recordsTotal;
            this.page.recordsFiltered = resp.recordsFiltered;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: mappedData,
            });
          });
      },
      columns: [
        { data: 'dtIndex', title: '#', orderable: false, searchable: false },
        { data: 'cond', title: 'CONDITION', orderable: true, searchable: true },
        { data: 'code', title: 'CODE', orderable: true, searchable: true },
        { data: 'description', title: 'DESCRIPTION', orderable: true, searchable: true },
        { data: 'value', title: 'VALUE', orderable: true, searchable: true },
        {
          data: 'status',
          title: 'STATUS',
          orderable: true,
          searchable: true,
          render: (data: any, type: any, row: any) => {
            const statusText = data === 'A' ? 'Active' :  (data === 'I' ? 'Inactive' : '-');
            return `
              <div class="badge-status badge-status__${data}">
                  ${statusText}
              </div>
            `;
          },
        },
        {
          data: 'status',
          title: 'ACTIONS',
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any) => {
            ` <div class="dropdown-action">
                <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                <div class="dropdown-content">
                  <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
                  <button class="action-button"><i class="fa fa-power-off"></i> Inactive</button>
                </div>
              </div>
            `
            let actionBtn =  `
              <div class="dropdown-action">
                <button class="dropbtn">Action <i class="fa fa-caret-down" aria-hidden="true"></i></button>
                <div class="dropdown-content">
                  <button class="action-button action-edit"><i class="fa fa-pencil"></i> Edit</button>
            `;
            if (data == 'I') {
              actionBtn += `
                  <button class="action-button action-activate"><i class="fa fa-power-off"></i> Activate</button>
                </div>
              </div>`
            } else {
              actionBtn += `
                  <button class="action-button action-inactive"><i class="fa fa-power-off"></i> Inactive</button>
                </div>
              </div>`
            }
            return actionBtn;
          },
        }
      ],
      searchDelay: 1500,
      order: [[1, 'asc']],
      rowCallback: (row: Node, data: any, index: number) => {
        $('.action-edit', row).on('click', () => handleButtonClick(ACTION.EDIT, data));
        $('.action-inactive', row).on('click', () => handleButtonClick(ACTION.INACTIVE, data));
        $('.action-activate', row).on('click', () => handleButtonClick(ACTION.ACTIVATE, data));
        return row;
      },
    };

    this.dtColumns = this.dtOptions.columns;
  }

  dtPageChange(event: any) {
    this.selectedRowData = undefined;
    $.fn['dataTable'].ext.search.pop();
  }

  onCreateClicked() {
    this.formStatus = FORM_STATUS.CREATE;
  }

  onEditClicked(value: any) {
    this.formStatus = FORM_STATUS.UPDATE;
    this.createUpdateForm.patchValue(value);
  }

  onDeleteClicked(value: any) {

  }

  onFilterChange(): void {
    this.dtElement.dtInstance.then(dtInstance => {
      dtInstance.draw();
    });
  }


  getModalTitle(): string {
    return (this.formStatus == FORM_STATUS.CREATE ? 'Create New' : 'Update') + ' ' + this.title;
  }

  onSubmitForm() {
    const valid = this.createUpdateForm.valid;
    if (valid) {
      const body = this.createUpdateForm.getRawValue();
      body['userUpd'] = this.userData.staffCode;
      const endpoint = this.formStatus == FORM_STATUS.CREATE ? this.appSvc.insertGlobal(body) : this.appSvc.updateGlobal(body);
      endpoint.subscribe(response => {
        if (response?.success) {
          if (this.formStatus == 'CREATE') {
            this.toastr.success('Pembuatan Data Master Global Berhasil', 'Berhasil!');
          } else if (this.formStatus == 'ACTIVATE') {
            this.toastr.success('Aktivasi Data Master Global Berhasil', 'Berhasil!');
          } else if (this.formStatus == 'INACTIVE') {
            this.toastr.success('Non Aktivasi Data Master Global Berhasil', 'Berhasil!'); 
          } else if (this.formStatus == 'UPDATE') {
            this.toastr.success('Update Data Master Global Berhasil', 'Berhasil!'); 
          }
        } else {
          this.toastr.error(response?.message, 'Maaf, Terjadi Kesalahan!');
        }
      });
    } else {
      this.markFormGroupTouched(this.createUpdateForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancelClicked() {
    this.createUpdateForm.reset();
  }
}
