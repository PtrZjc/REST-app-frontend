document.addEventListener("DOMContentLoaded", function () {

    var top = document.querySelector("#top")

    function fillInfo(parent){
        console.log(parent.target.blah)
        console.log()
        $.ajax({
            url: "http://localhost:8282/books/"+parent.dataset.id,
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
            newBook.innerHTML = "<h1>"+e.title+"</h1>"
        });

        var newBookEls = document.querySelectorAll('.bookTitle')

        newBookEls.forEach(function(e){

            $(e).one('click',function(event){
                fillInfo(this)
            })


    }).fail(function (xhr, status, err) {
    }).always(function (xhr, status) {
    });

})