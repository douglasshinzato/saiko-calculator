document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons()

  const basePriceInput = document.getElementById('base-price')
  const itemsQuantity = document.getElementById('items-quantity')
  const calculateBtn = document.getElementById('calculate-button')
  const clearBtn = document.getElementById('clear-button')
  const resultsDiv = document.getElementById('results')
  const inputGroup = document.querySelector('.input-group')
  const resultsText = document.querySelector('.results-text')

  calculateBtn.addEventListener('click', handleCalculate)
  clearBtn.addEventListener('click', handleClear)

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
    if (isNaN(price)) return //if (isNaN(price && items)) return

    const firstPrice = (price * 1.25).toFixed(2)
    const secondPrice = (firstPrice * 0.85).toFixed(2)
    const thirdPrice = (price * 1).toFixed(2)
    const tagsNumber = Math.ceil(items / 3)

    const results = [firstPrice, secondPrice, thirdPrice, tagsNumber]

    displayResults(results)
    inputGroup.style.display = 'none'
    resultsText.style.display = 'block'
    clearBtn.style.display = 'block'
    console.log(resultsText)
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
    clearBtn.style.display = 'none'
    inputGroup.style.display = 'flex'
    resultsText.style.display = 'none'
  }
})
