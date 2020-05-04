'use strict'
/* Direct ESLint to ignore the following undefined (as far as it can tell) variable(s): */
/* global horse */

function getSelectedShoeings() {
  const selectedShoeings = $('.checkbox')
    .filter(function() {
      return $(this).prop('checked')
    })
    .map(function() {
      return $(this).prop('id')
    })
    .toArray()
  console.log(selectedShoeings)

  return selectedShoeings
}

function viewReport() {
  const selectedShoeings = getSelectedShoeings()
  console.log('I SCREAM INTO THE VOID')
  console.log('This horse is amazing ', horse)
  $.ajax({
    url: '/horse/' + horse.id + '/view-report',
    type: 'GET',
    contentType: 'application/json',
    data: {
      shoeings: selectedShoeings
    },
    success: function(data) {
      console.log('form submitted.' + data)
    }
  })
}
