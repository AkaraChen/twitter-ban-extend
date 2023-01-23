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
      setInput((list as string[]).join(' '))
    })()
  }, [])
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }
  const handleClick = () => {
    const list = input.split(' ')
    chrome.storage.local.set({ list })
    notice({ text: '已保存' })
  }
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  return (
    <div data-bs-theme={isDarkMode ? "dark" : "light"} className="text-body bg-body">
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
        <label htmlFor="textarea">要屏蔽的内容，用空格隔开</label>
        <button onClick={handleClick} className="btn btn-primary mt-2">
          保存
        </button>
      </div>
    </div>
  )
}

export default App
