'use strict'

$(function () {

    $("#search-bar").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/autocomplete",
                type: "GET",
                data: request,  // request is the value of search input
                success: function (allHorses) {
                    // Map response values to fiedl label and value
                    response($.map(allHorses, function (horses) {
                        return {
                            name: horses.name,
                            owner: horses.owner
                        };
                    }));
                }
            });
        },

        // The minimum number of characters a user must type before a search is performed.
        minLength: 1,

        // set an onFocus event to show the result on input field when result is focused
        focus: function (event, input) {
            this.value = input.item.name;
            // Prevent other event from not being execute
            event.preventDefault();
        },
        select: function (event, input) {
            // Prevent value from being put in the input:
            this.value = input.item.name;
            // Set the id to the next input hidden field
            $(this).next("input").val(input.item.name);
            // Prevent other event from not being execute            
            event.preventDefault();
        }
    });

});
