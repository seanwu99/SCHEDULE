//== Class definition


//== Private functions

// basic demo
var demo = function () {

    var datatable = $('.m_datatable').mDatatable({
        // datasource definition
        data: {
            type: 'remote',
            source: {
                read: {
                    url: 'https://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php'
                }
            },
            // pageSize: 5, // display 20 records per page
            // serverPaging: true,
            // serverFiltering: true,
            // serverSorting: true
        },

        // layout definition
        layout: {
            theme: 'default', // datatable theme
            class: '', // custom wrapper class
            scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
            // height: 'auto', // datatable's body's fixed height
            footer: false // display/hide footer
        },

        // column sorting
        sortable: true,

        // toolbar
        toolbar: {
            // toolbar placement can be at top or bottom or both top and bottom repeated
            placement: ['bottom'],

            // toolbar items
            items: {
                // pagination
                pagination: {
                    // page size select
                    pageSizeSelect: [5, 10, 20, 30, 50] // display dropdown to select pagination size. -1 is used for "ALl" option
                },
            }
        },

        // columns definition
        columns: [
            {
                field: "RecordID",
                title: "#",
                sortable: false, // disable sort for this column
                width: 40,
                selector: {class: 'm-checkbox--solid m-checkbox--brand'}
            }
        ]
    });

};

var eventsCapture = function () {
    $('.m_datatable')
        .on('m-datatable--on-init', function () {
            eventsWriter('Datatable init');
        })
        .on('m-datatable--on-layout-updated', function () {
            eventsWriter('Layout render updated');
        })
        .on('m-datatable--on-ajax-done', function () {
            eventsWriter('Ajax data successfully updated');
        })
        .on('m-datatable--on-ajax-fail', function (e, jqXHR) {
            eventsWriter('Ajax error');
        })
        .on('m-datatable--on-goto-page', function (e, args) {
            eventsWriter('Goto to pagination: ' + args.page);
        })
        .on('m-datatable--on-update-perpage', function (e, args) {
            eventsWriter('Update page size: ' + args.perpage);
        })
        .on('m-datatable--on-reloaded', function (e) {
            eventsWriter('Datatable reloaded');
        })
        .on('m-datatable--on-check', function (e, args) {
            eventsWriter('Checkbox active: ' + args.toString());
        })
        .on('m-datatable--on-uncheck', function (e, args) {
            eventsWriter('Checkbox inactive: ' + args.toString());
        })
        .on('m-datatable--on-sort', function (e, args) {
            eventsWriter('Datatable sorted by ' + args.field + ' ' + args.sort);
        });
};

var eventsWriter = function (string) {
    console.log(string);
};




