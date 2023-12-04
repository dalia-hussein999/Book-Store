var dataContainer = document.querySelector(".bookcontainer");
var counterValue = document.querySelector(".counter");
var counter = 0;

var xhr = new XMLHttpRequest();
  xhr.open("GET", 'https://www.googleapis.com/books/v1/volumes?q=software+development');
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      var data = JSON.parse(xhr.response);
      showBooks(data);
    }
  };
  xhr.send();



function showBooks(data) {
  //var dataContainer = document.querySelector(".bookcontainer");

  data.items.forEach((item) => {
    // Create a div for each book
    var book = document.createElement("div");
    book.className = "book";
    dataContainer.append(book);

    // Display book thumbnail, if available
    if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
      var image = document.createElement("img");
      image.src = item.volumeInfo.imageLinks.thumbnail;
      book.appendChild(image);
    }

    // Display book title
    var title = document.createElement("h2");
    title.textContent = item.volumeInfo.title;
    book.appendChild(title);

    // Display book authors
    if (item.volumeInfo.authors) {
      var authors = document.createElement("p");
      authors.textContent = "By " + item.volumeInfo.authors.join(", ");
      book.appendChild(authors);
    }

    // Add "More Details" button
    var detailsButton = document.createElement("button");
    detailsButton.innerText = "Show Details";
    detailsButton.addEventListener("click", function () {
      // Navigate to bookDetails.html with the book's ID as a query parameter
      window.location.href = `book_details.html?id=${item.id}`;
    });
    book.appendChild(detailsButton);
    // add to cart button
    var addButton = document.createElement("button");
    addButton.innerText = "Add To Cart";
    addButton.addEventListener("click", function () {
      counter++;
      counterValue.innerHTML = counter;
    });
    book.appendChild(addButton);

    // Append the book to the container
    dataContainer.appendChild(book);
    
  });
 
}

function makeAPIRequest(searchVal) {
  var url = `https://www.googleapis.com/books/v1/volumes?q=${searchVal}`;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      var data = JSON.parse(xhr.response);
      showBooks(data);
    }
  };
  xhr.send();
}

var searchBar = document.getElementById("searchbar");
var searchBtn = document.getElementById("searchbtn");

searchBtn.addEventListener("click", function () {
  dataContainer.innerHTML = ""; // Clear previous search results

  var searchVal = searchBar.value.trim();

  // Fetch data based on user's input
  if (searchVal !== "") {
    makeAPIRequest(searchVal);
  } else {
    alert("Please enter a valid search term.");
  }
});
