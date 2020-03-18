'use strict'

$('#search-bar').autocomplete({
    appendTo: "#matches",
    //source: ['Secretariat', 'Shane', 'Buttercup', 'Allen',
    //  'Confirmation', 'show', 'shelly', 'shadowbox', 'shinnagins', 'something'],
    source: function (req, res) {
        $.ajax({
            url: "/autocomplete/",
            dataType: "jsonp",
            type: "GET",
            data: req,
            success: function (data) {
                console.log("inside autocomplete.js", data)
                res(data)
            },
            error: function (err) {
                console.log(err.status, "Error in autocomplete.js");
            }
        });
    },

    minLength: 1,
    select: function (event, ui) {
        if (ui.item) {
            $('#search-bar').text(ui.item.label);
        }
    }
})
