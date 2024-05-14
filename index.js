$(document).ready(() => {
    var tableIndex = 0
    var data = []

    function tabIndex() {
        $('#tableBody tr').each(function (index) {
            $(this).find('td:first').text(index + 1)
        })

        tableIndex = $('#tableBody tr').length + 1
    }

    function refreshTable() {
        $('#tableBody tr').each(function (index, row) {
            var rowData = data[index]
            if (rowData) {
                $(row).find('td:eq(1)').text(rowData.name.toUpperCase())
                $(row).find('td:eq(2)').text(rowData.lastName.toUpperCase())
                $(row).find('td:eq(3)').text(rowData.age)
            }
        })
        tabIndex()
    }

    function insertNewRows() {
        for (var i = $('#tableBody tr').length; i < data.length; i++) {
            var rowData = data[i]
            var rowId = 'row' + (rowData.id + 1)
            var removeBtn = '<td><button type="button" class="btn btn-primary remove-btn"><i class="bi bi-dash"></i></button></td>'
            var row = '<tr id=' + rowId + '><td>' + (rowData.id + 1) + '</td><td>' + rowData.name.toUpperCase() + '</td><td>' + rowData.lastName.toUpperCase() + '</td><td>' + rowData.age + '</td>' + removeBtn
            $('#tableBody').append(row)
        }
    }

    $('#submit-btn').click(() => {
        var name = $('#nameInput').val()
        var lastName = $('#lastNameInput').val()
        var age = $('#ageInput').val()

        if (name === '' || age === '' || lastName === '') {
            alert('debe llenar todos los campos')
        } else {
            data.push({
                'id': tableIndex,
                'name': name,
                'lastName': lastName,
                'age': age
            })

            insertNewRows()
            tabIndex()

            $('#nameInput').val('')
            $('#lastNameInput').val('')
            $('#ageInput').val('')
        }
    })

    $(document).on('click', '.btn.btn-primary.remove-btn', (event) => {
        var filaID = $(event.target).closest('tr').attr('id')
        $('#' + filaID).remove()

        var i = 0
        var position = 0

        for (x of data) {
            if ('row' + (x.id + 1) === filaID) {
                position = i;
            }
            i++
        }

        data.splice(position, 1)

        tabIndex()
    })

    const buttonSortAgeAscendant = '<button type="button" id="sortAgeAscendant" class="btn btn-primary"><i class="bi bi-sort-numeric-up"></i></i></button>'
    const buttonSortAgeDescendant = '<button type="button" id="sortAgeDescendant" class="btn btn-primary"><i class="bi bi-sort-numeric-down"></button>'
    const ageFilter = '<div class="age-filter container"><p>EDAD</p>' + buttonSortAgeAscendant + buttonSortAgeDescendant + '</div>'

    const buttonSortNameAscendant = '<button type="button" id="sortNameAscendant" class="btn btn-primary"><i class="bi bi-sort-alpha-up"></i></button>'
    const buttonSortNameDescendant = '<button type="button" id="sortNameDescendant" class="btn btn-primary"><i class="bi bi-sort-alpha-down"></i></button>'
    const nameFilter = '<div class="name-filter container"><p>NOMBRE</p>' + buttonSortNameAscendant + buttonSortNameDescendant + '</div>'

    $('#popover-btn').popover()

    $('#popover-btn').on('shown.bs.popover', () => {
        $('.popover-body').append(ageFilter, nameFilter)
    })

    $(document).on('click', '#sortAgeAscendant', function (e) {
        e.preventDefault()
        data.sort((a, b) => a.age - b.age)
        refreshTable()
    })

    $(document).on('click', '#sortAgeDescendant', function (e) {
        e.preventDefault()
        data.sort((a, b) => b.age - a.age)
        refreshTable()
    })

    $(document).on('click', '#sortNameAscendant', function (e) {
        e.preventDefault()

        data.sort((a, b) => {
            const nameA = (a.name + a.lastName).toUpperCase()
            const nameB = (b.name + b.lastName).toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        })
        refreshTable()
    })

    $(document).on('click', '#sortNameDescendant', function (e) {
        e.preventDefault()

        data.sort((a, b) => {
            const nameA = (a.name + a.lastName).toUpperCase()
            const nameB = (b.name + b.lastName).toUpperCase()
            if (nameA > nameB) {
                return -1
            }
            if (nameA < nameB) {
                return 1
            }
            return 0
        })
        refreshTable()
    })
})