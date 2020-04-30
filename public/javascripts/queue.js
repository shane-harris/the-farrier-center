'use strict'

/* Direct ESLint to ignore the following undefined (as far as it can tell) variable(s): */
/* global Hammer, userfname, userlname */

$(document).ready(function() {
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
      { responsivePriority: 3, targets: 2 }
    ],

    dom: '<"row"<"col"<"checkbox-area">><"col"fr>>tilpr',
    initComplete: function() {
      if (localStorage.input === 'true') {
        $.fn.dataTable.ext.search.push(function(_, data) {
          return (
            data[3].trim() === userfname.innerText.charAt(0) + '.' + userlname.innerText.charAt(0)
          )
        })
      }
    }
  })
  $('div.checkbox-area').html(
    `<input id="view-assigned" class ="form-check-input" type="checkbox" View Assigned Horses>
     <label class="form-check-label" for="checkbox">View Assigned Horses</label>`
  )

  table.draw()

  $('#view-assigned').on('change', function() {
    if ($(this).is(':checked')) {
      $.fn.dataTable.ext.search.push(function(_, data) {
        return (
          data[3].trim() === userfname.innerText.charAt(0) + '.' + userlname.innerText.charAt(0)
        )
      })
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

  function dismiss(event) {
    const url = 'http://localhost:8000/horse/dismiss/' + event.target.id
    console.log(event.target.id)
    $.post(url, function() {
      location.reload()
    })
  }

  var element = document.getElementById('queue-body')
  var hammertime = new Hammer(element)
  hammertime.on('swiperight', dismiss)
})
