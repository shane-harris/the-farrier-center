'use strict'

$('#search-bar').autocomplete({
    appendTo: "#matches",
    source: function (req, res) {
        $.ajax({
            url: "/autocomplete/",
            dataType: "jsonp",
            type: "GET",
            data: req,
            success: function (data) {
                //passing data to source for display in autocomplete window
                res(data)
            },
            error: function (err) {
                console.log(err.status, "Error in autocomplete.js");
            }
        });
    },

    minLength: 1,
    select: function (event, userInput) {
        if (userInput.item) {
            $('#search-bar').text(userInput.item.label);
        }
    }
})
