import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service'
import { Subject, finalize } from 'rxjs';
import { FORM_STATUS } from '../../../constants/libraries/form-status';
import { DataTableDirective } from 'angular-datatables';
import { Page } from 'src/app/models/page';
import { ACTION } from 'src/app/constants/libraries/action';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  title: string = 'Master Recipe';

  visibleFilter: boolean = false;
  loading: boolean = false;
  dataItems: any[] = [];
  createUpdateForm: FormGroup;
  formStatus: string;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  selectedRowData: any;
  dtColumns: any = [];
  page = new Page();

  constructor(
    private formBuilder: FormBuilder,
    private appSvc: AppService
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
    //todo, init your filter
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
        // dataTablesParameters['status'] = this.selectedStatus ?? '';
        this.appSvc
          .doPost('/recipe/dt', dataTablesParameters)
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
          data: 'recipeCode',
          title: 'RECIPE CODE',
          orderable: true,
          searchable: true,
        },
        {
          data: 'recipeRemark',
          title: 'REMARK',
          orderable: true,
          searchable: true,
        },
        { data: 'mpcsGroup', title: 'MPCS Group', orderable: true, searchable: true },
        {
          data: 'description',
          title: 'DESCRIPTION',
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
        [5, 'asc'],
        [1, 'asc']
      ],
      rowCallback: (row: Node, data: any, index: number) => {
        const self = this;
        // select row
        $('td', row).off('click');
        $('td', row).on('click', () => {
          $('td').removeClass('bg-info text-white fw-bold');
          if (self.selectedRowData !== data) {
            self.selectedRowData = data;
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
    this.initTable();
  }

  getModalTitle(): string {
    return (this.formStatus == FORM_STATUS.CREATE ? 'Create New' : 'Update') + ' ' + this.title;
  }

  onSubmitForm() {
    const valid = this.createUpdateForm.valid;
    if (valid) {
      const body = this.createUpdateForm.getRawValue();
      // todo, create data;
    } else {
      alert('Terdapat data yang belum valid');
    }
  }

  onCancelClicked() {
    this.createUpdateForm.reset();
  }

  dtPageChange(event: any) {
    this.selectedRowData = undefined;
    $.fn['dataTable'].ext.search.pop();
  }
}
