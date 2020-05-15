'use strict'

$('.checkbox')
  .change(function() {
    $('#all-report-button').prop('disabled', !this.checked)
  })
  .change()
