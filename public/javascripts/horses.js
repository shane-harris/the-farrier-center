'use strict'

function resizeHorseProfiles() {
  $('.horse-profile').each(function() {
    $(this).height($(this).width() * 1.05)
  })
}

resizeHorseProfiles()

$(window).resize(function() {
  resizeHorseProfiles()
})
