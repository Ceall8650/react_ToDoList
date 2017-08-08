import people from './people'
const root = document.querySelector('#app')

root.innerHTML = `<p>There are ${people.length} people.</p>`
