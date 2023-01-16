import { ChangeEvent, useEffect, useState } from 'react'
import './Popup.css'
import 'bootstrap/dist/css/bootstrap.css'
import { notice } from '@akrc/ringo'
import '@akrc/ringo/style/notice/ant.css'

function App() {
  const [input, setInput] = useState<string>('')
  useEffect(() => {
    ;(async () => {
      const { list } = await chrome.storage.local.get('list')
      setInput((list as string[]).join('\n'))
    })()
  }, [])
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    const list = input.split('\n')
    chrome.storage.local.set({ list })
    notice({ text: '已保存' })
  }
  return (
    <>
      <h2>Ban</h2>
      <div className="form-floating">
        <textarea
          id="textarea"
          className="form-control"
          onChange={handleInput}
          placeholder="一行一个"
          value={input}
          style={{
            height: '100px',
          }}
        />
        <label htmlFor="textarea">要屏蔽的内容，一行一个</label>
        <button onClick={handleClick} className="btn btn-primary mt-2">
          保存
        </button>
      </div>
    </>
  )
}

export default App
