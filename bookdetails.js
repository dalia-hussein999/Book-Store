document.addEventListener("DOMContentLoaded", function() {
  var params = new URLSearchParams(window.location.search);
  var bookId = params.get('id');

  if (!bookId) {
      alert("No book selected!");
      return;
  }

  var url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
      if (xhr.status != 200) {
          alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
          var data = JSON.parse(xhr.response);
          displayBookDetails(data.volumeInfo);
      }
  };
  xhr.send();
});

function displayBookDetails(book) {
//   var container = document.getElementById("bookDetailsContainer");
  var imgContainer = document.querySelector('.imgContainer');
  var infoContainer = document.querySelector('.infoContainer');

  if (book.imageLinks) {
      imgContainer.innerHTML = `<img src="${book.imageLinks.thumbnail}"/>`;
  }
  if (book.title) {
      infoContainer.innerHTML += `<h2>${book.title}</h2>`;
  }
  if (book.authors) {
      infoContainer.innerHTML += `<p>By ${book.authors.join(', ')}</p>`;
  }
  if (book.description) {
      infoContainer.innerHTML += `<p>${book.description}</p>`;
  }
  // ... add more details as required ...
}
