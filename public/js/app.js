const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

const getForecast = (location) => {
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
}

weatherForm.addEventListener('submit', (e) => {
  // prevent page refresh
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  getForecast(location)
  
})