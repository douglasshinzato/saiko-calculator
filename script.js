document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons()

  const basePriceInput = document.getElementById('base-price')
  const itemsQuantity = document.getElementById('items-quantity')
  const calculateBtn = document.getElementById('calculate-button')
  const resultsDiv = document.getElementById('results')

  calculateBtn.addEventListener('click', handleCalculate)
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

  function handleCalculate() {
    const price = parseFloat(basePriceInput.value)
    const items = parseFloat(itemsQuantity.value)
    if (isNaN(price && items)) return

    const firstPrice = (price * 1.25).toFixed(2)
    const secondPrice = (firstPrice * 0.85).toFixed(2)
    const thirdPrice = (price * 1).toFixed(2)
    const tagsNumber = Math.ceil(items / 3)

    const results = [firstPrice, secondPrice, thirdPrice, tagsNumber]

    displayResults(results)
  }

  function displayResults(results) {
    resultsDiv.innerHTML = ''
    results.forEach((result, index) => {
      const resultItem = document.createElement('div')
      resultItem.classList.add('result-item')
      if (index === 0) {
        resultItem.textContent = `R$ ${result} Crédito em 6x`
      } else if (index === 1) {
        resultItem.textContent = `R$ ${result} Crédito à vista`
      } else if (index === 2) {
        resultItem.textContent = `R$ ${result} Débito`
      } else if (index === 3) {
        resultItem.textContent = `${result} Etiquetas`
      }
      resultsDiv.appendChild(resultItem)
    })
  }
})
