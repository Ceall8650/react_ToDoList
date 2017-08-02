import {groupBy} from 'lodash/collection'
import people from './people'
import './style.scss'
import imageUrl from './code.png'

// 不使用相對路徑的例如 lodash/collection 模組將會從 /node_modules 載入，我們自定義的模組通常使用相對路徑。

const managerGroups = groupBy(people, 'manager')
const root = document.querySelector('#app')
const img = document.createElement('img')

img.src = imageUrl
img.style = 'background: #2B3A4F; padding: 15px;'

root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`
document.body.append(img)
