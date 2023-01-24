chrome.storage.local.get('list').then(({ list }) => {
  const styles = (list as string[])
    .map((item) => {
      return `
      [data-testid="cellInnerDiv"]:has([data-testid="User-Names"] [alt="${item}"]),
      [data-testid="cellInnerDiv"]:has([data-testid="socialContext"] [alt="${item}"]) {
        display: none
      }
      `
    })
    .join('')
  const style = document.createElement('style')
  style.textContent = styles
  const head = document.querySelector('head')!
  head.append(style)
}).catch()
