// set date default value
function setDateDefaultValue () {
  const today = new Date()
  const dateToday = today.toISOString().slice(0, 10)
  document.querySelector('#date').value = dateToday
}

// add 'back to homepage' alert
const backBtn = document.querySelector('.btn-back')
backBtn.addEventListener("click", e => {
  e.preventDefault()
  swal({
    title: "Back to Homepage?",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(check => {
    if(check) {
      window.location = 'http://localhost:3000/'
    }
  })
})