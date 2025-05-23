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

    const firstPrice = (price * 1.25).toFixed(2).replace('.', ',')
    const secondPrice = (firstPrice.replace(',', '.') * 0.85)
      .toFixed(2)
      .replace('.', ',')
    const thirdPrice = (price * 1).toFixed(2).replace('.', ',')
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
      const resultItem = document.createElement('div')
      resultItem.classList.add('result-item')

      let label = ''
      let isCopyable = true
      if (index === 0) {
        label = `R$ ${result} Crédito em 6x`
      } else if (index === 1) {
        label = `R$ ${result} Crédito à vista`
      } else if (index === 2) {
        label = `R$ ${result} Débito`
      } else if (index === 3 && !isNaN(result)) {
        label = `${result} Etiqueta(s)`
        isCopyable = false // aqui desabilita o clique
      } else {
        return
      }

      resultItem.textContent = label

      // Evento de clique
      if (isCopyable) {
        resultItem.addEventListener('click', () => {
          navigator.clipboard.writeText(result.toString())
            .then(() => {
              showCopiedMessage(resultItem)
            })
            .catch(err => {
              console.error('Erro ao copiar: ', err)
            })
        })
      } else {
        resultItem.classList.add('not-copyable') // pra estilizar diferente, se quiser
      }

      resultsDiv.appendChild(resultItem)
    })
  }

  function showCopiedMessage(targetElement) {
    const copiedMsg = document.createElement('span')
    copiedMsg.textContent = 'Copiado!'
    copiedMsg.classList.add('copied-msg')

    targetElement.appendChild(copiedMsg)

    // Remove a mensagem depois de 1.5 segundos
    setTimeout(() => {
      copiedMsg.remove()
    }, 1500)
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
