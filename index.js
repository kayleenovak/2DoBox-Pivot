$('.card-prepend').on('focusout', editBody);
$('.card-prepend').on('keyup', editBodyEnter);
$('.card-prepend').on('focusout', editIdea);
$('.card-prepend').on('keyup', editIdeaEnter);
$('.save-btn').on('click', createToDo);
$('.search-input').on('keyup', search);
$('.card-prepend').on('click', delegateClick);

function completeIdea(event) {
    event.target.parentNode.parentNode.classList.toggle('card-container-complete');
    toggleComplete(event);
}

function createToDo(event) {
    event.preventDefault()
    var newIdea = new NewIdea($('.title-input').val(), $('.body-input').val());
    var html = newCard(newIdea.id, newIdea.title, newIdea.body, newIdea.importance);
    $('.card-prepend').prepend(html);
    localStoreCard(newIdea);
    toggleCards();
}

function delegateClick() {
    if (event.target.classList.contains('upvote')) {
        upvote(event);
    } else if (event.target.classList.contains('downvote')) {
        downvote(event);
    } else if (event.target.classList.contains('delete-button')) {
        deleteToDo(event);
    } else if (event.target.classList.contains('complete-btn')) {
        completeIdea(event);
    }
}

function deleteToDo(event) {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
}

function downvote(event) {
    var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var parsedIdea = JSON.parse(localStorage.getItem($(event.target).parent().parent().attr('id')));
    if (parsedIdea.index >= 1) {
        parsedIdea.index--
        parsedIdea.importance = arrayImportance[parsedIdea.index];
        $(event.target).siblings('.importance').text(`importance: ${parsedIdea.importance}`);
    localStoreCard(parsedIdea);
    }
}

function editBody(event) {
  event.preventDefault();
  if ($(event.target).hasClass('body-of-card')) {
  var id = $(event.target).parent().attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var changeBody = event.target.innerText;
  parsedIdea.body = changeBody;
  localStoreCard(parsedIdea);
  } 
}

function editBodyEnter (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    editBody(event);
    $('.body-of-card').trigger('blur');
  }
}

function editIdea(event) {
  event.preventDefault();
  if ($(event.target).hasClass('title-of-card')) {
  var id = $(event.target).parent().parent().attr('id');
  var parsedIdea = JSON.parse(localStorage.getItem(id));
  var changeTitle = event.target.innerText;
  parsedIdea.title = changeTitle;
  localStoreCard(parsedIdea);
  }
}

function editIdeaEnter (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    editBody(event);
    $('.body-of-card').trigger('blur');
  }
}

function localStoreCard(newIdea) {
    var id = newIdea.id ;
    localStorage.setItem(id, JSON.stringify(newIdea));
}

function newCard(id, title, body, importance){
 return `<article class="card-container" id='${id}'>
            <div class="card-heading">
                <h2 class="title-of-card" contenteditable>${title}</h2>
                <button class="delete-button"></button>
            </div>
                <p class="body-of-card" contenteditable>${body}</p>
            <div class="idea-body">
                <button class="upvote"></button>
                <button class="downvote"></button>
                <p class="importance">importance: ${importance}</p>
                <button class="complete-btn">Completed</button> 
            </div>
          </article>`
}

function NewIdea(title, body) {
    this.title = title;
    this.body = body;
    this.importance = 'Normal';
    this.id = Date.now();
    this.index = 2;
    this.complete = false;
};

function onLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var html = newCard(parsedIdea.id, parsedIdea.title, parsedIdea.body, parsedIdea.importance);
    $('.card-prepend').prepend(html);
    if (parsedIdea.complete === true) {
        $('.card-container').addClass('card-container-complete');
    }
  }
}

function search() {
 var searchValue = $(this).val().toLowerCase();
 $(".card-container").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 console.log(this);
 });
}

function toggleCards() {
  var cardContainer = document.querySelectorAll('.card-container');
  console.log(cardContainer);
    $('.card-container').filter(function() {
      $(this).toggle(indexOf(cardContainer) > 10)
    })
}

function upvote(event) {
    var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var parsedIdea = JSON.parse(localStorage.getItem($(event.target).parent().parent().attr('id')));
    if (parsedIdea.index <= 3) {
        parsedIdea.index++
        parsedIdea.importance = arrayImportance[parsedIdea.index];
        $(event.target).siblings('.importance').text(`importance: ${parsedIdea.importance}`);
    localStoreCard(parsedIdea);
    }
}















// function toggleComplete(event) {
//     var id = $(event.target).parent().parent().attr('id');
//     var parsedIdea = JSON.parse(localStorage.getItem(id));
//     if (event.target.parentNode.parentNode.classList.contains('card-container-complete')) {
//         parsedIdea.complete = true;
//     } else  {
//         parsedIdea.complete = false;
//     }
//     localStoreCard(parsedIdea);
// }



// function loadItems() {
//   var counter = 0;
//     if (localStorage.length < 10) {
//         onLoad();
//     } else if (localStorage.length > 9) {
//     for (var i = (localStorage.length - 1); i > 0; i--) {
//       counter++
//     var parsedIdea = JSON.parse(localStorage.getItem(localStorage.key(i)));
//     var html = newCard(parsedIdea.id, parsedIdea.title, parsedIdea.body, parsedIdea.importance);
//     $('.card-prepend').append(html);
//     if (parsedIdea.complete === true) {
//         $('.card-container').addClass('card-container-complete');
//     }
//     if (counter === 10) {
//       break;
//     }
//   }
//     }
// }
