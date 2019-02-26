document.addEventListener("DOMContentLoaded", function () {

    var top = document.querySelector("#top")
    var addBtn = document.querySelector("#add-btn")

    loadBooks()

    function loadBooks(id) {
        $.ajax({
            url: "http://localhost:8282/books/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {
            result.forEach(function (e) {
                appendBookEl(e.id, e.title)
            });

            var newBookEls = document.querySelectorAll('.bookTitle')

            newBookEls.forEach(function (e) {

                e.addEventListener('click', function e() {
                    fillInfo(this)
                    this.removeEventListener('click', e)
                })
            })
        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        })
    }

    addBtn.addEventListener('click', function () {
        var title = document.querySelector("#title")
        var author = document.querySelector("#author")
        var type = document.querySelector("#type")
        var publisher = document.querySelector("#publisher")
        var isbn = document.querySelector("#isbn")
        var flag = true //tak bedziemy sprawdzac poprawność danych

        if (title.value.length === 0) {
            addAlert(title)
            flag = false
        } else {
            removeAlert(title)
        }
        if (author.value.length === 0) {
            addAlert(author)
            flag = false
        } else {
            removeAlert(author)
        }
        if (type.value.length === 0) {
            addAlert(type)
            flag = false
        } else {
            removeAlert(type)
        }
        if (publisher.value.length === 0) {
            addAlert(publisher)
            flag = false
        } else {
            removeAlert(publisher)
        }
        if (isbn.value.length !== 10 || isNaN(isbn.value)) {
            addAlert(isbn)
            flag = false
        } else {
            removeAlert(isbn)
        }

        if (flag) {

            var dock = document.querySelector('.clearfix')
            var successAlert = document.createElement("div")
            successAlert.classList.add('alert', 'alert-success', 'alert-dismissible')
            dock.parentElement.insertBefore(successAlert, dock)
            successAlert.innerHTML = '<button type="button" class="close" data-dismiss="alert">&times;</button>            <strong>Success!</strong> Book added to the collection.'

            var book = {
                "isbn": isbn.value,
                "title": title.value,
                "author": author.value,
                "publisher": publisher.value,
                "type": type.value
            }

            $.ajax({
                url: "http://localhost:8282/books/",
                data: JSON.stringify(book),
                type: "POST",
                dataType: "json",
                contentType: "application/json"
            }).done(function (result) {
                document.querySelectorAll("input").forEach(function (el) {
                    el.value = ""
                })

                appendBookEl(result.id, result.title)
                var newBook = document.querySelector('[data-id="' + result.id + '"]')

                newBook.addEventListener('click', function e() {
                    fillInfo(this)
                    this.removeEventListener('click', e)
                })


            }).fail(function (xhr, status, err) {
            }).always(function (xhr, status) {
            });
        }

        function addAlert(input) {
            if (input.parentElement.querySelector(".alert") !== null) {
                return
            }

            document.querySelector('#author')
            var missingInput = document.createElement("div")
            missingInput.classList.add('alert', 'alert-danger')
            input.parentElement.insertBefore(missingInput, input)
            input.classList.add("border-danger")
            if (input !== isbn) {
                missingInput.innerText = "Missing input"
            } else {
                missingInput.innerText = "Wrong ISBN. It should consist of 10 digits."
            }
        }

        function removeAlert(input) {
            if (input.parentElement.querySelector(".alert") === null) {
                return
            }
            var toDelete = input.parentElement.querySelector('.alert')
            toDelete.parentElement.removeChild(toDelete);
            input.classList.remove('border-danger')
        }
    })

    function appendBookEl(id, title) {
        var newBook = document.createElement("ul");
        top.appendChild(newBook)
        newBook.classList.add("bookTitle")
        newBook.dataset.id = id
        var title = "<h3>" + title + "</h3>"
        var deleteButton = '<button type="button" class="btn btn-danger" id=>Delete</button>'
        var layout = '<div class="row"><div class="col">' + title +
            '</div><div class="col">' + deleteButton + '</div></div>'
        newBook.innerHTML = layout
        deleteButton = document.querySelector('[data-id="' + id + '"]').querySelector("button")
        deleteButton.addEventListener('click', function () {
            deleteBook(id)
        })
    }

    function deleteBook(id) {
        $.ajax({
            url: "http://localhost:8282/books/" + id,
            data: {},
            type: "DELETE",
            dataType: "json"
        }).done(function (result) {
            var toDelete = document.querySelector('[data-id="' + id + '"]')
            toDelete.parentElement.removeChild(toDelete)
        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        })
    }

    function fillInfo(parent) {
        $.ajax({
            url: "http://localhost:8282/books/" + parent.dataset.id,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {

            var data = []
            for (let i = 0; i < 4; i++) {
            data.push(document.createElement('li'))
            parent.appendChild(data[i])
            }

            data[0].innerText = "Isbn: " + result.isbn
            data[1].innerText = "Author: " + result.author
            data[2].innerText = "Publisher: " + result.publisher
            data[3].innerText = "Type: " + result.type

        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    }


})