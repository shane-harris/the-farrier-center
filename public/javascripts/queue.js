'use strict'

/* Direct ESLint to ignore the following undefined (as far as it can tell) variable(s): */
/* global Hammer, horses, user */

/**
 * Filters the queue to show only the horses assigned to the current user.
 * Uses a custom DataTable search to filter down the list.
 */
function filterAssigned() {
  // In order to filter by "Assigned To Me", we effectively do a custom search for all horses
  // assigned to the logged in user. queueRow[3] is the part of the table row that containst
  // the horse's id.
  $.fn.dataTable.ext.search.push((_, __, ___, queueRow) => {
    // queueRow[3] is the raw html text of the "Assigned To" column of the current row.
    // Extract the horse's id number from the html:
    const horseId = Number(queueRow[3].match(/id="([0-9]+)-farrier"/)[1])
    // Get the horse with that id.
    const horse = horses.find(horse => horseId === horse.id)
    // Return true if this horse is assigned to the logged in user.
    // (Returning true adds this row to the "search results").
    return user._id === horse.assignedFarrier
  })
}

$(document).ready(function() {
  $.fn.dataTable.moment('M/D/YYYY')
  var table = $('#queue').DataTable({
    responsive: {
      details: true
    },
    order: [[2, 'asc']],
    bPaginate: false,
    stateSave: true,

    //rowReorder: true,
    columnDefs: [
      { responsivePriority: 1, targets: 0 },
      { responsivePriority: 2, targets: -1 },
      { responsivePriority: 3, targets: 3 }
    ],

    dom: '<"row"<"col"<"checkbox-area">><"col"fr>>tilpr',
    initComplete: function() {
      if (localStorage.input === 'true') {
        filterAssigned()
      }
    }
  })
  $('div.checkbox-area').html(
    `<input id="view-assigned" class ="form-check-input" type="checkbox">
     <label class="form-check-label" for="checkbox">My Queue</label>`
  )

  table.draw()

  $('#view-assigned').on('change', function() {
    if ($(this).is(':checked')) {
      filterAssigned()
    } else {
      $.fn.dataTable.ext.search.pop()
    }
    table.draw()
  })
  $(function() {
    var test = localStorage.input === 'true' ? true : false
    $('#view-assigned').prop('checked', test || false)
  })

  $('#view-assigned').on('change', function() {
    localStorage.input = $(this).is(':checked')
  })

  /**
   * Handles the submitting of the drop down boxes and sends the
   * horse id and farrier id to the route. The Page is not reloaded
   * and this results in a snappier interface.
   *
   * @param {string} horse: horse id retrieved from queue-item.ejs form
   */
  function changeFarrier(horse) {
    const farrier = document.getElementById(horse + '-farrier').value
    $.post('/horse/assign/' + horse + '/' + farrier)
  }
})
