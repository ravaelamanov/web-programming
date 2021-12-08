const url = "https://jsonplaceholder.typicode.com/posts"
const posts_table = "posts-table"
const preloaderClass = "lds-dual-ring"

const controller = new AbortController()

// 5 second timeout:
const timeoutId = setTimeout(() => controller.abort(), 5000)


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function hidePreloader() {
    document.getElementsByClassName(preloaderClass)[0].style.display = 'none';
  }

function renderResponse(data) {

    hidePreloader()

    table = document.getElementsByClassName(posts_table)[0]
    tableHeaders = Object.keys(data[0])

    let remainder = getRandomInt(2)
    data = data.filter(post => post.userId % 2 == remainder)

    headerRow = document.createElement("tr")
    table.appendChild(headerRow)

    
    for (const columnHeader of tableHeaders) {
        th = document.createElement("th")
        th.innerHTML = columnHeader
        headerRow.appendChild(th)
    }

    for (const post of data) {
        tr = document.createElement('tr')
        for (const header of tableHeaders) {
            td = document.createElement('td')
            td.innerHTML = post[header]
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}

function displayError() {
    hidePreloader()
    p_error = document.getElementsByClassName("p_error")[0]
    p_error.innerHTML = "Error occured while fetching posts"
}


fetch(url, { signal: controller.signal })
    .then(response => response.json())
    .then(data => renderResponse(data))
    .catch((error) => {
        displayError()
    })   