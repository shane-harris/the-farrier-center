'use strict'
/* Direct ESLint to ignore the following undefined (as far as it can tell) variable(s): */
/* global horse */

function getSelectedShoeings() {
  return $('.checkbox')
    .filter(function() {
      return $(this).prop('checked')
    })
    .map(function() {
      return $(this).prop('id')
    })
    .toArray()
}

function viewReport() {
  $.ajax({
    url: '/horse/' + horse.id + '/view-report',
    type: 'GET',
    contentType: 'application/json',
    data: {
      shoeings: getSelectedShoeings()
    }
  })
}

$('.checkbox')
  .change(function() {
    $('#all-report-button').prop('disabled', !this.checked)
  })
  .change()
