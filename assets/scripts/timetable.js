const tableId = "timetable"
const saveButtonId = "saveButton"
const hasTimetable = "hasTimetable"
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
var maxClasses
var days
var timetable
var form
var table
var saveButton

function createTable(rows, cols, cellValueSupplier) {
    var table = document.createElement('table')
    table.setAttribute('id', tableId)

    headerRow = document.createElement("tr")

    for (const weekDay of weekDays.slice(0, cols)) {
        th = document.createElement("th")
        th.innerHTML = weekDay
        headerRow.appendChild(th)
    }
    table.appendChild(headerRow)


    for (let i = 0; i < rows; i++) {

        tr = document.createElement('tr')

        for (let j = 0; j < cols; j++) {
            td = document.createElement('td')

            input = document.createElement('input')
            input.setAttribute("id", i.toString() + j.toString())
            input.value = cellValueSupplier(i, j)

            td.appendChild(input)
            tr.appendChild(td)
        }

        table.appendChild(tr)
    }
    return table;
}

function saveTable() {
    timetable = {}

    timetable.maxClasses = maxClasses
    timetable.days = days
    timetable.cells = {}

    for (let i = 0; i < maxClasses; i++) {
        for (let j = 0; j < days; j++) {
            var input = document.getElementById(i.toString() + j.toString()).value
            // localStorage.setItem(i.toString() + j.toString(), input)
            let key = i.toString() + j.toString()
            timetable.cells[key] = input
        }
    }

    localStorage.setItem("timetable", JSON.stringify(timetable))

}

function localStorageSupplier(i, j) {
    if (timetable == null) {
        return ""
    }

    return timetable.cells[i.toString() + j.toString()]
}


function generateTimetable() {

    maxClasses = document.getElementById("max_classes").value
    days = document.getElementById("days").value

    table = document.getElementById(tableId)
    if (table != null) {
        $('#exampleModal').modal('show')
    }
    else {
        generateTableImpl()
    }
}

function generateTableImpl() {
    table = createTable(maxClasses, days, localStorageSupplier)
    form.appendChild(table)

    if (saveButton == null) {
        form.appendChild(createSaveButton())
    }
}

function createSaveButton() {
    saveButton = document.getElementById(saveButtonId)
    if (saveButton == null) {
        saveButton = document.createElement("input")
        saveButton.setAttribute("type", "button")
        saveButton.setAttribute("id", saveButtonId)
        saveButton.onclick = saveTable
        saveButton.value = "Save"
    }
    return saveButton
}

function generateTimetableWrapper(event) {
    event.preventDefault() // stops page from reloading on form submit
    timetable = null
    localStorage.clear()
    generateTimetable()
}

window.onload = function () {
    form = document.getElementsByClassName("timetable_form")[0]
    form.addEventListener("submit", generateTimetableWrapper)
    $("#modal-ok-button").click(function() {
        table.remove()
        saveButton.remove()
        saveButton = null
        generateTableImpl()
    })

    timetableStr = localStorage.getItem("timetable")

    if (timetableStr != null) {
        timetable = JSON.parse(timetableStr)
        document.getElementById("max_classes").value = timetable.maxClasses
        document.getElementById("days").value = timetable.days
        generateTimetable()
    }
}

