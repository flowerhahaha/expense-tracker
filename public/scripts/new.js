// set date default value 
const today = new Date()
const dateToday = today.toISOString().slice(0, 10)
document.querySelector('#date').value = dateToday

// add 'back to homepage' alert
const backBtn = document.querySelector('.btn-back')
const saveBtn = document.querySelector('.btn-save')
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