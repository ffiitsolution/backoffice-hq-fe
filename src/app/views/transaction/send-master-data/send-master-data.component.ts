import {
  AfterContentInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { Subject } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Page } from '../../../models/page';
import { ACTION } from '../../../constants/libraries/action';
import { BtnActionComponent } from 'src/app/core/btn-action/btn-action.component';
import moment from 'moment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-send-master-data',
  templateUrl: './send-master-data.component.html',
  styleUrls: ['./send-master-data.component.scss'],
})
export class SendMasterDataComponent implements AfterContentInit, OnInit {
  title: string = 'Kirim Data Master';
  userData: any;

  @ViewChild('btnAction') btnAction: TemplateRef<BtnActionComponent>;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  rangeDatePeriode: any;
  fromDate: any;
  toDate: any;
  today: any;

  visibleFilter: boolean = false;
  visibleCreateOrUpdateForm: boolean = false;
  loading: boolean = false;
  createUpdateForm: FormGroup;
  formStatus: string;
  isFormLoading: boolean = false;

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
  selectedStatus: any = '';

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
    private g: GlobalService
  ) {}

  dtPageChange(event: any) {
    this.selectedRowData = undefined;
    $.fn['dataTable'].ext.search.pop();
  }

  ngOnInit(): void {
    this.userData = this.g.auth.getUser();
    this.today = moment().format('yyyy-MM-DD');
    this.initForm();
    this.initFilter();
  }

  ngAfterContentInit(): void {
    this.initTable();
  }

  initForm(): void {
    this.createUpdateForm = this.formBuilder.group({
      dateUpd: ['', Validators.required],
      totalUpd: ['', Validators.required],
      remark: ['', Validators.required],
    });
  }

  initFilter(): void {
    this.fromDate = moment().subtract(7, 'days');
    this.toDate = moment().add(14, 'days');
    this.rangeDatePeriode = [this.fromDate.toDate(), this.toDate.toDate()];
  }

  initTable(): void {
    const mapData = (resp: any) => {
      return resp.data.map((item: any, index: number) => {
        const { rn, ...rest } = item;
        return {
          ...rest,
          dtIndex: this.page.start + index + 1,
          dateCreate: item.dateCreate,
          timeCreate: item.timeCreate,
        };
      });
    };

    const handleButtonClick = (action: string, data: any) => {
      switch (action) {
        case ACTION.EDIT:
          this.formStatus = FORM_STATUS.UPDATE;
          this.createUpdateForm.patchValue(data);
          const openModalButton = document.getElementById('openModalButton');
          if (openModalButton instanceof HTMLButtonElement) {
            openModalButton.click();
          }
          break;
        case ACTION.INACTIVE:
          this.g.swal
            .fire({
              title: 'Confirm to Inactive?',
              icon: 'question',
              showCancelButton: true,
              showConfirmButton: !this.isFormLoading,
              color: this.g.swalBtnConfirmColor,
              cancelButtonColor: this.g.swalBtnCancelColor,
              allowOutsideClick: false,
              customClass: {
                confirmButton: 'swal-btn-width',
                cancelButton: 'swal-btn-width',
                denyButton: 'swal-btn-width',
              },
            })
            .then((val) => {
              if (val.isConfirmed) {
                this.isFormLoading = true;
                this.g.service.doPost('/send-master/inactive', data).subscribe({
                  next: (response) => {
                    if (response?.success) {
                      this.onFilterChange();
                      this.g.toastr.success('Saved successfully.');
                    } else {
                      this.g.toastr.error('Failed: ' + response?.message);
                    }
                    this.visibleCreateOrUpdateForm = false;
                  },
                  error: (error) => {
                    this.g.toastr.error('Error: ' + error.message);
                  },
                  complete: () => {
                    this.g.swal.close();
                    this.isFormLoading = false;
                  },
                });
              }
            });
          break;
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
        dataTablesParameters['startDate'] = this.fromDate.format('DD MMM yyyy');
        dataTablesParameters['endDate'] = this.toDate.format('DD MMM yyyy');
        dataTablesParameters['status'] = this.selectedStatus;
        this.appSvc
          .doPost('/send-master/dt', dataTablesParameters)
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
        { data: 'syncId', title: 'SYNC ID', orderable: true, searchable: true },
        {
          data: 'versions',
          title: 'VERSION',
          orderable: true,
          searchable: true,
        },
        { data: 'userUpd', title: 'USER', orderable: true, searchable: true },
        {
          data: 'dateUpd',
          title: 'DATE UPD',
          orderable: true,
          searchable: true,
        },
        {
          data: 'timeUpd',
          title: 'TIME UPD',
          orderable: true,
          searchable: true,
        },
        { data: 'remark', title: 'REMARK', orderable: true, searchable: true },
        { data: 'totalUpd', title: 'TOTAL', orderable: true, searchable: true },
        {
          data: 'description',
          title: 'DESC',
          orderable: true,
          searchable: true,
        },
        {
          data: 'status',
          title: 'STATUS',
          orderable: true,
          searchable: true,
          render: (data: any, type: any, row: any) => {
            const statusText =
              data === 'A' ? 'Active' : data === 'I' ? 'Inactive' : '-';
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
            const showInactive = row?.status === 'A';
            return showInactive
              ? `
              <div class="button-action">
                <button class="action-inactive"><i class="fa fa-power-off"></i> Inactive</button>
              </div>
            `
              : '';
          },
        },
      ],
      searchDelay: 1500,
      order: [
        [9, 'asc'],
        [3, 'asc'],
        [1, 'desc'],
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        $('.action-inactive', row).on('click', () =>
          handleButtonClick(ACTION.INACTIVE, data)
        );
        return row;
      },
    };

    this.dtColumns = this.dtOptions.columns;
  }

  onChangePeriode(data: any) {
    if (data && !this.isFormLoading) {
      this.fromDate = moment(data[0]);
      this.toDate = moment(data[1]);
      this.onFilterChange();
    }
  }

  onCreateClicked() {
    this.formStatus = FORM_STATUS.CREATE;
  }

  onFilterChange(): void {
    this.dtElement?.dtInstance?.then((dtInstance) => {
      dtInstance?.draw();
    });
  }

  getModalTitle(): string {
    return (
      (this.formStatus == FORM_STATUS.CREATE
        ? 'Create New'
        : this.formStatus == FORM_STATUS.UPDATE
        ? 'Update'
        : 'Delete') +
      ' ' +
      this.title
    );
  }

  onSubmitForm() {
    this.isFormLoading = true;
    const valid = this.createUpdateForm.valid;
    if (valid) {
      let param = {
        userUpd: this.userData?.staffCode,
        ...this.createUpdateForm.getRawValue(),
      };
      this.appSvc.doPost('/send-master/insert', param).subscribe({
        next: (response) => {
          let data = response?.data;
          if (response?.success) {
            this.onFilterChange();
            this.g.toastr.success('Saved successfully.');
          } else {
            this.g.toastr.error('Failed: ' + response?.message);
          }
          this.visibleCreateOrUpdateForm = false;
        },
        error: (error) => {
          this.g.toastr.error('Error: ' + error.message);
        },
        complete: () => {
          this.isFormLoading = false;
          this.createUpdateForm.reset();
        },
      });
    } else {
      this.g.toastr.warning('Terdapat data yang belum valid.');
    }
  }

  onCancelClicked() {
    this.createUpdateForm.reset();
  }
}
