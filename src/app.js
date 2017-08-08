import React from 'react'
import ReactDOM from 'react-dom'

//  注意元件開頭第一個字母都要大寫
class App extends React.Component {
  // render 是 Class based 元件唯一必須的方法（method）
  render () {
    return (
      <div>hello</div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'))
