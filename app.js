
$(document).ready(function() {
	var item, title, author, publisher, booklink, bookImg
	var outputList = document.getElementById("list-output");
	var bookUrl = "https://www.googleapis.com/books/v1/volumes?q="
	var placeholder = '<img src="https://via.placeholder.com/150">'
	var extra = '&maxResults=36'
	var searchData;

	$("#search").click(function() {
		outputList.innerHTML = "";
		document.body.style.backgroundImage ="url('')";
		searchData = $("#search-box").val();
		if(searchData === "" || searchData === null) {
			displayError();
		}
		else {
			$.ajax({
				url: bookUrl + searchData + '&maxResults=18',
				dataType: "json",
				success: function(response) {
					console.log(response);
					if(response.totalItems === 0){
						alert("no result... try again")
					}
					else{
						$("title").animate({'margin-top': '5px'}, 1000);
						$(".book-list").css("visibility", "visible");
						displayResults(response);
					}
				},
				error: function(){
					alert("something went wong...");
				}
			});

		}
		$("#search-box").val("");
	});
	function displayResults(res) {
		for(var i = 0; i< res.items.length-1; i+=3) {
			item = res.items[i];
			title1 = item.volumeInfo.title;
			author1 = item.volumeInfo.authors;
			description1= item.volumeInfo.description;
			bookImg1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeholder

			item = res.items[i+1];
			title2 = item.volumeInfo.title;
			author2 = item.volumeInfo.author;
			description2 = item.volumeInfo.description;
			bookImg2 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeholder

			item = res.items[i+2];
			title3 = item.volumeInfo.title;
			author3 = item.volumeInfo.author;
			description3 = item.volumeInfo.description;
			bookImg3 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : placeholder

			outputList.innerHTML += '<div class="row">' +
									formatOutput(bookImg1, title1, author1, description1)+
									formatOutput(bookImg2, title2, author2, description2)+
									formatOutput(bookImg3, title3, author3, description3)
									'</div>'
		}
	}

/*  <div class="card" style="width:400px">
    <img class=" card-img-top" src="img_avatar1.png" alt="Card image" style="width:100%">
    <div class="card-body">
      <h4 class="card-title">John Doe</h4>
      <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
      <a href="#" class="btn btn-primary">See Profile</a>
    </div>
  </div>
 */
 /*
 `<div class="col-lg-6">
							<div class="row no-gutters">
								<div class=" col-md-4">
									<img src="${bookImg}" class="card-img" alt="...">
								</div>
								<div class="col-md-8">
									<div class="body-card">
										<h5 class="card-title">${title}</h5>
										<p class="card-text">Author: ${author}</p>
										<p class="card-text">Discription: ${discription}</p>
									</div>
								</div>
							</div>
						</div>`
 */

	function formatOutput(bookImg, title, author, discription){
		var htmlCard = `<div class="card col-lg-4 col-md-12 col-sm-12  thumbnail">
							<div class="row no-gutters col-md-12  col-sm-12 col-12">
							    <div class="col-md-4 col-lg-4 col-sm-4 col-4">
							      <img src="${bookImg}" class="card-img img-fluid" alt="...">
							    </div>
							    <div class="col-md-8 col-lg-8 col-sm-8 col-8 pl-sm-3 pl-2">
							      <div class="card-body">
							        <h5 class="card-title">${title}</h5>
							        <p class="card-text">Author: ${author}</p>
							        <p class="card-text line"><small class="text-muted">Discription: ${discription}</small></p>
							      </div>
							    </div>
							</div>
						</div>`
		return htmlCard;
	}
	function displayError() {
		alert("search item cannot be empty")
	}

})


//"https://www.googleapis.com/books/v1/volumes?q="