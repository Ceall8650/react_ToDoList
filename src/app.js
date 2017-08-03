import {groupBy} from 'lodash/collection'
import people from './people'
import './style.scss'
import imageUrl from './code.png'

// 為了讓我們的模組也支援 HMR 我們需要在 app.js 的最上面補上下面這段程式碼，好讓 webpack 知道我們模組的邊界以及更新底下相依的元件。
if (module.hot) {
  module.hot.accept()
}

// 不使用相對路徑的例如 lodash/collection 模組將會從 /node_modules 載入，我們自定義的模組通常使用相對路徑。

const managerGroups = groupBy(people, 'manager')
const root = document.querySelector('#app')
const img = document.createElement('img')

img.src = imageUrl
img.style = 'background: #2B3A4F; padding: 15px;'

root.innerHTML = `
  <pre>${JSON.stringify(managerGroups, null, 2)}</pre>
  <input type='text'>
`

document.body.append(img)

function gotoDashboard () {
  // body...
  // 在線上的情況下會變成 http://example.com/dashboard.js 這樣的路徑是錯誤的。所以需要在webpack加上 output.publicPath 的設定
  System.import('./dashboard').then(function (dashboard) {
    console.log(dashboard)
    dashboard.draw()
  })
  .catch(err => {
    console.log(err, 'Chunk loading failed')
  })
}

setTimeout(gotoDashboard, 5000)
