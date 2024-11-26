document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons()

  const productName = document.querySelector('.product-name')
  const basePriceInput = document.getElementById('base-price')
  const itemsQuantity = document.getElementById('items-quantity')
  const clearTextBtn = document.getElementById('clear-text-button')
  const calculateBtn = document.getElementById('calculate-button')
  const resetBtn = document.getElementById('reset-button')
  const resultsDiv = document.getElementById('results')
  const inputGroup = document.querySelector('.input-group')
  const resultsText = document.querySelector('.results-text')

  clearTextBtn.addEventListener('click', handleClearText)
  calculateBtn.addEventListener('click', handleCalculate)
  resetBtn.addEventListener('click', handleClear)

  basePriceInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleCalculate()
    }
  })
  itemsQuantity.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleCalculate()
    }
  })

  function handleClearText() {
    productName.value = ''
  }

  function handleCalculate() {
    const price = parseFloat(basePriceInput.value)
    const items = parseFloat(itemsQuantity.value)
    if (isNaN(price)) return //if (isNaN(price && items)) return

    const firstPrice = (price * 1.25).toFixed(2)
    const secondPrice = (firstPrice * 0.85).toFixed(2)
    const thirdPrice = (price * 1).toFixed(2)
    const tagsNumber = Math.ceil(items / 3)

    const results = [firstPrice, secondPrice, thirdPrice, tagsNumber]

    displayResults(results)
    inputGroup.style.display = 'none'
    resultsText.style.display = 'block'
    resetBtn.style.display = 'block'
  }

  function displayResults(results) {
    resultsDiv.innerHTML = ''
    results.forEach((result, index) => {
      if (index === 0) {
        const resultItem = document.createElement('div')
        resultItem.classList.add('result-item')
        resultItem.textContent = `R$ ${result} Crédito em 6x`
        resultsDiv.appendChild(resultItem)
      } else if (index === 1) {
        const resultItem = document.createElement('div')
        resultItem.classList.add('result-item')
        resultItem.textContent = `R$ ${result} Crédito à vista`
        resultsDiv.appendChild(resultItem)
      } else if (index === 2) {
        const resultItem = document.createElement('div')
        resultItem.classList.add('result-item')
        resultItem.textContent = `R$ ${result} Débito`
        resultsDiv.appendChild(resultItem)
      } else if (index === 3 && !isNaN(result)) {
        const resultItem = document.createElement('div')
        resultItem.classList.add('result-item')
        resultItem.textContent = `${result} Etiquetas`
        resultsDiv.appendChild(resultItem)
      }
    })
  }

  function handleClear() {
    basePriceInput.value = ''
    itemsQuantity.value = ''
    resultsDiv.innerHTML = ''
    resultsText.style.display = 'none'
    resetBtn.style.display = 'none'
    inputGroup.style.display = 'flex'
    resultsText.style.display = 'none'
  }
})
