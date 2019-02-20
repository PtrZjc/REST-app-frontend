document.addEventListener("DOMContentLoaded", function () {

    var top = document.querySelector("#top")
    var addBtn = document.querySelector("#add-btn")

    loadBooks()



    function loadBooks() {
        $.ajax({
            url: "http://localhost:8282/books/",
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {

            result.forEach(function (e) {
                var newBook = document.createElement("ul");
                top.appendChild(newBook)
                newBook.classList.add("bookTitle")
                newBook.dataset.id = e.id
                newBook.innerHTML = "<h3>" + e.title + "</h3>"
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

    function fillInfo(parent) {
        $.ajax({
            url: "http://localhost:8282/books/" + parent.dataset.id,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {

            var data = []
            data.push(document.createElement('li'))
            data.push(document.createElement('li'))
            data.push(document.createElement('li'))
            data.push(document.createElement('li'))
            for (const information of data) {
                parent.appendChild(information)
            }
            data[0].innerText = "Isbn: " + result.isbn
            data[1].innerText = "Author: " + result.author
            data[2].innerText = "Publisher: " + result.publisher
            data[3].innerText = "Type: " + result.type

        }).fail(function (xhr, status, err) {
        }).always(function (xhr, status) {
        });
    }

    addBtn.disable = true
    addBtn.addEventListener('click', function () {
        var title = document.querySelector("#title")
        var author = document.querySelector("#author")
        var type = document.querySelector("#type")
        var publisher = document.querySelector("#publisher")
        var isbn = document.querySelector("#isbn")
        var flag = true //tak bedziemy sprawdzac poprawność danych
        
        if (title.value.length === 0) {
            addAlert(title)
        }else{
            removeAlert(title)
        }
        if (author.value.length === 0) {
            addAlert(author)
        }else{
            removeAlert(author)
        }
        if (type.value.length === 0) {
            addAlert(type)
        }else{
            removeAlert(type)
        }
        if (publisher.value.length === 0) {
            addAlert(publisher)
        }else{
            removeAlert(publisher)
        }
        if (isbn.value.length !== 10 || isNaN(isbn.value)) {
            addAlert(isbn)
        }else{
            removeAlert(isbn)
        }

        //TODO zastanowić się, jak zaktywować przycisk
        function addAlert(input) {
            if (input.parentElement.querySelector(".alert") !== null) {
                return
            }

            document.querySelector('#author')
            var missingInput = document.createElement("div")
            missingInput.classList.add('alert','alert-danger')
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



        //     
        //     var wrongISBN


        //     <div class="">
        //     Missing input
        //   </div>

        var book = {
            "isbn": isbn,
            "title": title,
            "author": author,
            "publisher": publisher,
            "type": type
        }

        // $.ajax({
        //     url: "http://localhost:8282/books/" + parent.dataset.id,
        //     data: ,
        //     type: "POST",
        //     dataType: "json"
        // }).done(function (result) {
        // }).fail(function (xhr, status, err) {
        // }).always(function (xhr, status) {
        // });


    })

})