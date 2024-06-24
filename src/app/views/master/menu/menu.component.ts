import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { Subject, finalize } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';
import { Page } from 'src/app/models/page';
import { ACTION } from 'src/app/constants/libraries/action';
import { DataTableDirective } from 'angular-datatables';
import { ToasterService } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-master-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title: string = 'Master Menu';

  visibleFilter: boolean = false;
  loading: boolean = false;
  loadingDetailOrderType: boolean = false;
  loadingDetailOutletLimit: boolean = false;
  dataItems: any[] = [];
  createUpdateForm: FormGroup;
  formStatus: string;

  listOrderType: any[] = [];
  listOutletLimit: any[] = [];
  outlets: any[] = [
    {
      code: '',
      name: 'All',
    },
  ];
  status: any[] = [
    {
      code: '',
      name: 'All',
    },
    {
      code: 'A',
      name: 'Active',
    },
    {
      code: 'I',
      name: 'Inactive',
    },
  ];
  selectedStatus: string | null = '';
  selectedOutletCode: string | null = null;
  selectedOrderType: any = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRowData: any;
  dtColumns: any = [];
  page = new Page();

  constructor(
    private formBuilder: FormBuilder,
    private appSvc: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
      status: ['', Validators.required],
    });
  }

  initFilter(): void {
    this.appSvc.doPost('/menu/param/outlet').subscribe((response) => {
      this.outlets = [...this.outlets, ...(response?.data || [])];
      this.outlets = this.outlets.map((x: any) => {
        if (x.name === 'All') {
          return {
            code: x.code,
            name: x.name,
          };
        }
        return {
          code: x.outletCode,
          name: x.outletCode + ' - ' + x.outletName,
        };
      });
    });
  }

  initTable(): void {
    const mapData = (resp: any) => {
      return resp.data.map((item: any, index: number) => {
        const { rn, ...rest } = item;
        return {
          ...rest,
          dtIndex: this.page.start + index + 1,
        };
      });
    };

    const handleButtonClick = (action: string, data: any) => {
      switch (action) {
        case ACTION.EDIT:
          this.formStatus = FORM_STATUS.UPDATE;
          const { cond, code, description, value, status } = data;
          this.createUpdateForm.patchValue({
            cond,
            code,
            description,
            value,
            status,
          });
          break;
        case ACTION.INACTIVE:
          this.formStatus = FORM_STATUS.INACTIVE;
          break;
      }
      const openModalButton = document.getElementById('openModalButton');
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
        dataTablesParameters['outletCode'] = this.selectedOutletCode ?? '';
        this.appSvc
          .doPost('/menu/dt', dataTablesParameters)
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
        {
          data: 'outletCode',
          title: 'OUTLET CODE',
          orderable: true,
          searchable: true,
        },
        {
          data: 'menuGroupCode',
          title: 'CODE',
          orderable: true,
          searchable: true,
        },
        { data: 'seq', title: 'SEQ', orderable: true, searchable: true },
        {
          data: 'menuGroup',
          title: 'Menu Group',
          orderable: true,
          searchable: true,
        },
        {
          data: 'status',
          title: 'STATUS',
          orderable: true,
          searchable: true,
          render: (data: any, type: any, row: any) => {
            const statusText = data === 'I' ? 'Inactive' : 'Active';
            return `
              <div class="badge-status badge-status__${data}">
                  ${statusText}
              </div>
            `;
          },
        },
        {
          data: 'dtIndex',
          title: 'ACTIONS',
          orderable: false,
          searchable: false,
          render: (data: any, type: any, row: any) => {
            return `
              <div class="button-action">
                <button class="action-edit"><i class="fa fa-pencil"></i> Edit</button>
                <button class="action-inactive"><i class="fa fa-power-off"></i> Inactive</button>
              </div>
            `;
          },
        },
      ],
      searchDelay: 1500,
      order: [
        [1, 'asc'],
        [5, 'asc'],
        [3, 'asc'],
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        // select row
        $('td', row).off('click');
        $('td', row).on('click', () => {
          $('td').removeClass('bg-info text-white fw-bold');
          if (self.selectedRowData !== data) {
            self.selectedRowData = data;
            self.listOrderType = [];
            self.listOutletLimit = [];
            self.getListOrderType();
            $('td', row).addClass('bg-info text-white fw-bold');
          } else {
            self.selectedRowData = undefined;
          }
        });
        // handle action
        $('.action-edit', row).on('click', () =>
          handleButtonClick(ACTION.EDIT, data)
        );
        $('.action-inactive', row).on('click', () =>
          handleButtonClick(ACTION.INACTIVE, data)
        );
        return row;
      },
    };

    this.dtColumns = this.dtOptions.columns;
  }

  getListOrderType(): void {
    this.loadingDetailOrderType = true;
    this.appSvc
      .doPost('/menu/detail/menu-group-order-type', {
        menuGroupCode: this.selectedRowData?.menuGroupCode ?? '',
      })
      .subscribe((response) => {
        this.loadingDetailOrderType = false;
        this.listOrderType = response?.data || [];
      });
  }

  selectOrderType(event: any, data: any){
    console.log(event.target);
    this.getListOutletLimit(data?.orderType);
  }

  getListOutletLimit(orderType): void {
    this.loadingDetailOutletLimit = true;
    this.appSvc
      .doPost('/menu/detail/menu-group-limit', {
        menuGroupCode: this.selectedRowData?.menuGroupCode ?? '',
        orderType: orderType,
      })
      .subscribe((response) => {
        this.loadingDetailOutletLimit = false;
        this.listOutletLimit = response?.data || [];
      });
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
    console.log(value);
  }

  onDeleteClicked(value: any) {}

  onFilterChange(): void {
    this.dtElement.dtInstance.then((dtInstance) => {
      dtInstance.draw();
    });
  }

  getModalTitle(): string {
    return (
      (this.formStatus == FORM_STATUS.CREATE ? 'Create New' : 'Update') +
      ' ' +
      this.title
    );
  }

  onSubmitForm() {
    const valid = this.createUpdateForm.valid;
    if (valid) {
      const body = this.createUpdateForm.getRawValue();
      // this.appSvc.insertMenu(body).subscribe(response => {
      //   if (response?.success) {

      //   } else {
      //     this.toastr.error(response?.message, 'Maaf, Terjadi Kesalahan!');
      //   }
      // });
    } else {
      this.markFormGroupTouched(this.createUpdateForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
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
