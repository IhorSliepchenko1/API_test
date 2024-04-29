const url = 'https://dummyjson.com/products'

const sortingFunc = (sorts, tbody, headTitle) => {

     const sortSelect = document.getElementById('sort')
     const arrSortParametrs = ['--sort-default--', 'price z-a', 'price a-z', 'rating z-a', 'rating a-z', 'discountPercentage z-a', 'discountPercentage a-z', 'title z-a', 'title a-z', 'brand z-a', 'brand a-z']

     arrSortParametrs.map((item) => {
          const optionCreate = document.createElement('option')
          sortSelect.appendChild(optionCreate)
          optionCreate.innerText = item
          optionCreate.value = item
     })


     const objSort = {
          '--sort-default--': () => sorts.sort((a, b) => a.id - b.id),
          "price z-a": () => sorts.sort((a, b) => b.price - a.price),
          "price a-z": () => sorts.sort((a, b) => a.price - b.price),

          "rating z-a": () => sorts.sort((a, b) => b.rating - a.rating),
          "rating a-z": () => sorts.sort((a, b) => a.rating - b.rating),

          "discountPercentage z-a": () => sorts.sort((a, b) => b.discountPercentage - a.discountPercentage),
          "discountPercentage a-z": () => sorts.sort((a, b) => a.discountPercentage - b.discountPercentage),

          "stock z-a": () => sorts.sort((a, b) => b.stock - a.stock),
          "stock a-z": () => sorts.sort((a, b) => a.stock - b.stock),

          "title z-a": () => sorts.sort((a, b) => b.title.localeCompare(a.title)),
          "title a-z": () => sorts.sort((a, b) => a.title.localeCompare(b.title)),

          "brand z-a": () => sorts.sort((a, b) => b.brand.localeCompare(a.brand)),
          "brand a-z": () => sorts.sort((a, b) => a.brand.localeCompare(b.brand)),
     }


     sortSelect.addEventListener('change', (e) => {
          tbody.innerHTML = ''
          sorts = objSort[e.target.value]()
          renderTable(sorts, tbody, headTitle);
     })

}


const renderTable = (data, tbody, headTitle) => {


     for (let i = 0; i < data.length; i++) {

          const trBody = document.createElement('tr')
          tbody.append(trBody)

          for (let j = 0; j < headTitle.length; j++) {
               const td = document.createElement('td')
               trBody.append(td)

               if (headTitle[j] === 'images') {
                    td.style.overflow = 'scroll'
                    td.style.width = '200px'

                    data[i][headTitle[j]].map((item) => {
                         const img = document.createElement('img')
                         img.src = item
                         img.width = 150
                         img.height = 200
                         td.append(img)
                         td.style.display = 'flex'
                         td.style.gap = '20px'
                    })
               }

               else if (headTitle[j] === 'description') {
                    const p = document.createElement('p')
                    td.append(p)
                    p.style.maxWidth = '250px'
                    p.innerText = data[i][headTitle[j]]
               }

               else if (headTitle[j] === 'price') {
                    td.innerText = `${data[i][headTitle[j]]} $`
               }

               else if (headTitle[j] === 'title') {
                    const h = document.createElement('h3')
                    td.append(h)
                    h.innerText = data[i][headTitle[j]]
               }

               else if (headTitle[j] === 'thumbnail') {
                    const img = document.createElement('img')
                    img.src = data[i][headTitle[j]]
                    img.width = 200
                    img.height = 150
                    td.append(img)
               }

               else {
                    td.innerText = data[i][headTitle[j]]
               }
          }
     }
}



fetch(url)
     .then((json) => json.json())
     .then((res) => {

          const mainObj = res.products

          const arrContainer = []
          const slotBtn = document.getElementById('slotBtn')

          const container = document.getElementById('container')

          const table = document.createElement('table')
          container.append(table)

          const thead = document.createElement('thead')
          table.append(thead)

          const tr = document.createElement('tr')
          thead.append(tr)

          const headTitle = Object.keys(res.products[0])

          headTitle.map((item) => {
               const th = document.createElement('th')
               tr.append(th)
               th.innerText = item
          })

          const tbody = document.createElement('tbody')
          table.append(tbody)


          let btn
          let start = 0
          let stop = 4
          let numberPage = 1

          const btnPrev = document.createElement('button')
          slotBtn.append(btnPrev)
          btnPrev.innerText = '<'
          btnPrev.disabled = true

          for (let i = 0; i < mainObj.length / 5; i++) {
               let arrTestSlot = []
               btn = document.createElement('button')
               btn.innerText = numberPage
               slotBtn.append(btn)

               for (let j = start; j <= stop; j++) {
                    arrTestSlot.push(mainObj[j])
               }

               start += 5
               stop += 5
               numberPage++
               arrContainer.push(arrTestSlot)
          }

          const btnNext = document.createElement('button')
          slotBtn.append(btnNext)
          btnNext.innerText = '>'


          const renderPagination = (val, index) => {
               tbody.innerHTML = ''

               renderTable(arrContainer[val], tbody, headTitle);

               btnAll.forEach(btn => btn.classList.remove('active_btn'));
               btnAll[index].classList.toggle('active_btn')
          }


          const btnAll = document.querySelectorAll('button')
          let slotNumPag
          for (let k = 0; k < btnAll.length; k++) {

               btnAll[k].addEventListener('click', (e) => {
                    slotNumPag = +btnAll[k].innerText - 1

                    if (slotNumPag >= 1) {
                         btnPrev.disabled = false
                    } else {
                         btnPrev.disabled = true
                    }

                    if (slotNumPag === 5) {
                         btnNext.disabled = true
                    } else {
                         btnNext.disabled = false
                    }
                    renderPagination(slotNumPag, k)

               })
          }


          btnPrev.addEventListener('click', () => {
               const active = document.querySelector('.active_btn')
               let prevNum = +active.textContent - 1

               if (prevNum <= 1) {
                    btnPrev.disabled = true
               } else {
                    btnPrev.disabled = false
               }

               if (prevNum === 5) {
                    btnNext.disabled = true
               } else {
                    btnNext.disabled = false
               }
               renderPagination(prevNum - 1, prevNum)
          })



          btnNext.addEventListener('click', () => {
               const active = document.querySelector('.active_btn')
               let prevNum = +active.textContent

               prevNum += 1

               if (prevNum <= 1) {
                    btnPrev.disabled = true
               } else {
                    btnPrev.disabled = false
               }

               if (prevNum === 6) {
                    btnNext.disabled = true
               } else {
                    btnNext.disabled = false
               }
               renderPagination(prevNum - 1, prevNum)


          })

          btnAll[1].classList.toggle('active_btn')
          renderTable(arrContainer[0], tbody, headTitle);
          sortingFunc(arrContainer[0], tbody, headTitle)

     })