
onLoad()

$('.save-btn').on('click', createIdea);

function newCard(id, title, body, importance){
 return `<article class="card-container" id='${id}'>
            <div class="card-heading">
                <h2 class="title-of-card">${title}</h2>
                <button class="delete-button"></button>
            </div>
                <p class="body-of-card">${body}</p>
            <div class="idea-body">
                <button class="upvote"></button>
                <button class="downvote"></button>
                <p class="importance">importance: ${importance}</p>
            </div>
          </article>`
}

function NewIdea(title, body) {
    this.title = title;
    this.body = body;
    this.importance = 'Normal';
    this.id = Date.now();
    this.index = 2;
};

function createIdea(event) {
    event.preventDefault()
    var newIdea = new NewIdea($('.title-input').val(), $('.body-input').val());
    localStoreCard(newIdea);
    $('.card-prepend').prepend(newCard(newIdea.id, newIdea.title, newIdea.body, newIdea.importance));
}

function localStoreCard(newIdea) {
    var id = newIdea.id ;
    localStorage.setItem(id, JSON.stringify(newIdea));
}

function onLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var html = newCard(parsedIdea.id, parsedIdea.title, parsedIdea.body, parsedIdea.importance);
    $('.card-prepend').prepend(html);
  }
}



$('.card-prepend').on('click', delegateClick);

function delegateClick() {
    if (event.target.classList.contains('upvote')) {
        upvote(event)
    } else if (event.target.classList.contains('downvote')) {
        downvote(event)
    } else if (event.target.classList.contains('delete-button')) {
        deleteStuff(event)
    }
}


function upvote(event) {
    var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var id = $(event.target).parent().parent().attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    if (parsedIdea.index <= 3) {
        parsedIdea.index++
        parsedIdea.importance = arrayImportance[parsedIdea.index];
        $(event.target).siblings('.importance').text(`importance: ${parsedIdea.importance}`);
    localStoreCard(parsedIdea);
    }
}

function downvote(event) {
    var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var id = $(event.target).parent().parent().attr('id');
    var parsedIdea = JSON.parse(localStorage.getItem(id));
    if (parsedIdea.index >= 1) {
        parsedIdea.index--
        parsedIdea.importance = arrayImportance[parsedIdea.index];
        $(event.target).siblings('.importance').text(`importance: ${parsedIdea.importance}`);
    localStoreCard(parsedIdea);
    }
}

function deleteStuff(event) {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
}


$('.search-input').on('keyup', search)

function search() {
 var searchValue = $(this).val().toLowerCase();
 $(".card-container").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 });
}

      










