// user can't select a month before selecting a year 
const monthSelect = document.querySelector('#select-month')
if (document.querySelector('#select-year').value === 'All') {
  monthSelect.value = 'All'
  monthSelect.disabled = true
  document.querySelector('#warning-text').style.visibility = 'visible'
}

// alert to confirm the deletion
const recordsTable = document.querySelector('#table-records')
recordsTable.addEventListener('click', e => {
  if (!e.target.matches('.btn-delete')) return
  e.preventDefault()
  swal({
    title: 'Delete the Expense?',
    icon: 'warning',
    text: "The deleted expense can't be recovered",
    buttons: true,
    dangerMode: true
  }).then(check => {
    if(check) {
      const id = e.target.dataset.id
      document.querySelector(`.form-${id}`).submit()
    }
  })
})