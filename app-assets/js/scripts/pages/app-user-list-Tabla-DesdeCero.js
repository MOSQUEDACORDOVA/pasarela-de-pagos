/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  ('use strict');

  var dtUserTable = $('.user-list-table-Tabla-DesdeCero'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      1: { title: 'Pending', class: 'badge-light-warning' },
      2: { title: 'Active', class: 'badge-light-success' },
      3: { title: 'Inactive', class: 'badge-light-secondary' }
    };

  var assetPath = 'app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: assetPath + 'data/user-list.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'role' }
      ],
      columnDefs: [
        {
          // For Responsive
          visible: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['full_name'],
              $email = full['email'],
              $image = full['avatar'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" height="32" width="32">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }
            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div>' +

                '<div class="d-flex mb-1">' +

                  '<div class="me-75">' +
                    '<a href="#"><b>C21101-1</b></a>' +
                  '</div>' +

                  '<div>' +
                    '<div class="d-flex">' +
                      '<div class="badge rounded-pill badge-light-success me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Activos">10</div>' +
                      '<div class="badge rounded-pill badge-light-info me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Incorporados">6</div>' +
                      '<div style="color:#999 !important; background-color:#ff0;" class="badge rounded-pill badge-light-warning me-1" data-bs-toggle="tooltip" data-popup="tooltip-De otro grupo" data-bs-placement="top" data-bs-original-title="Inscritos">3</div>' +
                      '<div class="badge rounded-pill badge-light-warning me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Fusionados">7</div>' +
                      '<div class="badge rounded-pill badge-light-danger me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Congelados">1</div>' +
                      '<div class="badge rounded-pill badge-light-secondary me-1" data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" data-bs-original-title="Total">11</div>' +

                    '</div>' +
                  '</div>' +

                '</div>' +

                '<div class="d-flex">' +

                  '<div class="me-1">' +
                    '<span class="item-user me-75">' +
                    feather.icons['user'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Profesor</small><br>' +
                    '<small class="emp_post">Isaac M.</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-dollar-sign me-75">' +
                    feather.icons['dollar-sign'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Pagos</small><br>' +
                    '<small class="emp_post">01 del mes</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-clock me-75">' +
                    feather.icons['clock'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Horario</small><br>' +
                    '<small class="emp_post">Lunes: 6:30pm a 9pm</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-calendar me-75">' +
                    feather.icons['calendar'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Inicio</small><br>' +
                    '<small class="emp_post">01/01/2021</small>' +
                  '</div>' +

                  '<div class="">' +
                    '<span class="item-calendar me-75">' +
                    feather.icons['calendar'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Fin</small><br>' +
                    '<small class="emp_post">22/04/2021</small>' +
                  '</div>' +
                  
                '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role
          targets: 2,
          visible: false,
          render: function (data, type, full, meta) {
            var $role = full['role'];
            var roleBadgeObj = {
              Principiante: feather.icons['user'].toSvg({ class: 'font-medium-3 text-primary me-50' }),
              Básico: feather.icons['settings'].toSvg({ class: 'font-medium-3 text-warning me-50' }),
              Intermedio: feather.icons['database'].toSvg({ class: 'font-medium-3 text-success me-50' }),
              Avanzado: feather.icons['slack'].toSvg({ class: 'font-medium-3 text-danger me-50' })
            };
            return "<span class='text-truncate align-middle'>" + roleBadgeObj[$role] + $role + '</span>';
          }
        }
      ],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-none justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-none align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-outline-secondary dropdown-toggle me-2',
          text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          buttons: [
            {
              extend: 'print',
              text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'csv',
              text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'excel',
              text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'pdf',
              text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            },
            {
              extend: 'copy',
              text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
              className: 'dropdown-item',
              exportOptions: { columns: [1, 2, 3, 4, 5] }
            }
          ],
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
            $(node).parent().removeClass('btn-group');
            setTimeout(function () {
              $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
            }, 50);
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      pageLength: 4,
      initComplete: function () {
        // Adding role filter once table initialized
        this.api()
          .columns(2)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="UserRole">Niveles</label>').appendTo('.niveles-grupos');
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Todos </option></select>'
            )
              .appendTo('.niveles-grupos')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
              });
          });
        // Adding plan filter once table initialized
        this.api()
          .columns(1)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="UserPlan">Profesor</label>').appendTo('.profesor-grupos');
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Todos </option></select>'
            )
              .appendTo('.profesor-grupos')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
              });
          });
        // Adding status filter once table initialized
        this.api()
          .columns(1)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="FilterTransaction">Fecha de pago</label>').appendTo('.pagos-grupos');
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize mb-md-0 mb-2xx"><option value="">  </option></select>'
            )
              .appendTo('.pagos-grupos')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    statusObj[d].title +
                    '" class="text-capitalize">' +
                    statusObj[d].title +
                    '</option>'
                );
              });
          });
      }
    });
  }


  
});
