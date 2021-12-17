$(function () {
  ('use strict');

  var dtUserTable = $('.user-list-table-Tabla-Aperturas');

  var assetPath = 'app-assets/',
    userView = 'app-user-view-account.html';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    userView = assetPath + 'app/user/view/account';
  }

  // Users List datatable
  if (dtUserTable.length) {

    dtUserTable.DataTable({
      ajax: assetPath + 'data/grupos-aperturas.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'full_name' },
        { data: 'tipo-curso' }
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
            var $profesor = full['profesor'], 
                $nomenclatura = full['nomenclatura'],
                $dia_pago = full['dia_pago'],
                $horario = full['horario'],
                $fecha_inicio = full['fecha_inicio'],
                $fecha_fin = full['fecha_fin'];
           
            // Creates full output for row
            var $row_output =
              '<div>' +

                '<div class="d-flex mb-1">' +

                  '<div class="me-75">' +
                    '<a href="#"><b>' + $nomenclatura + '</b></a>' +
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
                    '<small class="emp_post">' + $profesor + '</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-dollar-sign me-75">' +
                    feather.icons['dollar-sign'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Pagos</small><br>' +
                    '<small class="emp_post">' + $dia_pago + '</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-clock me-75">' +
                    feather.icons['clock'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Horario</small><br>' +
                    '<small class="emp_post">' + $horario + '</small>' +
                  '</div>' +

                  '<div class="me-1">' +
                    '<span class="item-calendar me-75">' +
                    feather.icons['calendar'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Inicio</small><br>' +
                    '<small class="emp_post">' + $fecha_inicio + '</small>' +
                  '</div>' +

                  '<div class="">' +
                    '<span class="item-calendar me-75">' +
                    feather.icons['calendar'].toSvg({ class: 'font-small-4' }) +
                    '</span>'+
                    '<small class="emp_post text-muted">Fin</small><br>' +
                    '<small class="emp_post">' + $fecha_fin + '</small>' +
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
            var $role = full['tipo-curso'];
            var roleBadgeObj = {
              Intensivo: feather.icons['user'].toSvg({ class: 'font-medium-3 text-primary me-50' }),
              'Desde cero': feather.icons['settings'].toSvg({ class: 'font-medium-3 text-warning me-50' })
            };
            return "<span class='text-truncate align-middle'>" + roleBadgeObj[$role] + $role + '</span>';
          }
        }
      ],
      order: [[1, 'asc']],
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
            var label = $('<label class="form-label" for="UserRole">Tipo de curso</label>').appendTo('.TipoCurso-grupos');
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Todos </option></select>'
            )
              .appendTo('.TipoCurso-grupos')
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
       
      }
    });
  }


  
});
