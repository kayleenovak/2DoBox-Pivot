$('.card-prepend').on('click', delegateClick);
$('.card-prepend').on('focusout', editBody);
$('.card-prepend').on('focusout', editToDo);
$('.card-prepend').on('keydown', editToDoEnter);
$('.card-prepend').on('keyup', editBodyEnter);
$('.body-input').on('keyup', enableSaveBtn);
$('.save-btn').on('click', createToDo);
$('.search-input').on('keydown', search);
$('.title-input').on('keyup', enableSaveBtn);

onLoad();

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.save-btn').prop('disabled', true);
}

function completeToDo(event) {
    event.target.parentNode.parentNode.classList.toggle('card-container-complete');
    toggleComplete(event);
}

function createToDo(event) {
    event.preventDefault()
    var newToDo = new NewToDo($('.title-input').val(), $('.body-input').val());
    var html = newCard(newToDo.id, newToDo.title, newToDo.body, newToDo.importance);
    $('.card-prepend').prepend(html);
    localStoreCard(newToDo);
    clearInputs();
}

function delegateClick() {
  if (event.target.classList.contains('upvote')) {
    upvote(event);
  } else if (event.target.classList.contains('downvote')) {
    downvote(event);
  } else if (event.target.classList.contains('delete-button')) {
    deleteToDo(event);
  } else if (event.target.classList.contains('complete-btn')) {
    completeToDo(event);
  }
}

function deleteToDo(event) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  var cardHTMLId = cardHTML[0].id;
  localStorage.removeItem(cardHTMLId);
}

function downvote(event) {
  var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var parsedToDo = JSON.parse(localStorage.getItem($(event.target).parent().parent().attr('id')));
  if (parsedToDo.index >= 1) {
    parsedToDo.index--
    parsedToDo.importance = arrayImportance[parsedToDo.index];
    $(event.target).siblings('.importance').text(`importance: ${parsedToDo.importance}`);
  localStoreCard(parsedToDo);
  }
}

function editBody(event) {
  event.preventDefault();
  if ($(event.target).hasClass('body-of-card')) {
    var id = $(event.target).parent().attr('id');
    var parsedToDo = JSON.parse(localStorage.getItem(id));
    var changeBody = event.target.innerText;
    parsedToDo.body = changeBody;
    localStoreCard(parsedToDo);
  } 
}

function editBodyEnter (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    editBody(event);
    $('.body-of-card').trigger('blur');
  }
}

function editToDo(event) {
  event.preventDefault();
  if ($(event.target).hasClass('title-of-card')) {
    var id = $(event.target).parent().parent().attr('id');
    var parsedToDo = JSON.parse(localStorage.getItem(id));
    var changeTitle = event.target.innerText;
    parsedToDo.title = changeTitle;
    localStoreCard(parsedToDo);
  }
}

function editToDoEnter (event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    editBody(event);
    $('.title-of-card').trigger('blur');
  }
}

function enableSaveBtn() {
  if ($('.title-input').val() === '' || $('.body-input').val() === '') {
    $('.save-btn').prop('disabled', true);
  } else {
    $('.save-btn').prop('disabled', false);
  }
}

function localStoreCard(newToDo) {
  var id = newToDo.id ;
  localStorage.setItem(id, JSON.stringify(newToDo));
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

function NewToDo(title, body) {
  this.title = title;
  this.body = body;
  this.importance = 'Normal';
  this.id = Date.now();
  this.index = 2;
  this.complete = false;
};

function onLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    var parsedToDo = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var html = newCard(parsedToDo.id, parsedToDo.title, parsedToDo.body, parsedToDo.importance);
    $('.card-prepend').prepend(html);
    if (parsedToDo.complete === true) {
        $('.card-container').addClass('card-container-complete');
    }
  }
}

function saveToDo() {
  if ($('.title-input') === '' || $('.body-input') === '') {
    $
  }
}

function search() {
 var searchValue = $(this).val().toLowerCase();
 $(".card-container").filter(function() {
   $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1)
 });
}

function toggleComplete(event) {
    var id = $(event.target).parent().parent().attr('id');
    var parsedToDo = JSON.parse(localStorage.getItem(id));
    if (event.target.parentNode.parentNode.classList.contains('card-container-complete')) {
        parsedToDo.complete = true;
    } else  {
        parsedToDo.complete = false;
    }
    localStoreCard(parsedToDo);
}

function upvote(event) {
    var arrayImportance = ['None', 'Low', 'Normal', 'High', 'Critical'];
    var parsedToDo = JSON.parse(localStorage.getItem($(event.target).parent().parent().attr('id')));
    if (parsedToDo.index <= 3) {
        parsedToDo.index++
        parsedToDo.importance = arrayImportance[parsedToDo.index];
        $(event.target).siblings('.importance').text(`importance: ${parsedToDo.importance}`);
    localStoreCard(parsedToDo);
    }
}















// function toggleCards() {
//   var cardContainer = document.querySelectorAll('.card-container');
//   console.log(cardContainer);
//     $('.card-container').filter(function() {
//       $(this).toggle(indexOf(cardContainer) > 10)
//     })
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
