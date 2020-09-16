/** js/states.js*/

/**
 * Disabled state
 * All elements with disabled atribut or data-disabled has
 * preventDefault()
 * use disabled oor buttons and inputs and data-disabled for
 * buttons.
 */
const disabled = document.querySelectorAll('*[disabled],*[data-disabled]')
disabled.forEach(elem => {
  elem.addEventListener('click', e=> {
    e.preventDefault()
  })
})