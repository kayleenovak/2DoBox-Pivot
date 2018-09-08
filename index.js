// var body = $('.body-input').val();
var qualityVariable = "swill";

$('.save-btn').on('click', createIdea);

function newCard(id, title, body, quality){
 return `<article class="card-container" id='${id}'>
            <h2 class="title-of-card">${title}</h2>
            <button class="delete-button"></button>
            <pclass="body-of-card">${body}</p>
            <button class="upvote"></button>
            <button class="downvote"></button>
            <p class="quality">quality: ${quality}</p>
          </article>`
}

function NewIdea(title, body) {
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
    this.id = $.now();
};

function createIdea(event) {
    event.preventDefault()
    var newIdea = new NewIdea($('.title-input').val(), $('.body-input').val());
    localStoreCard(newIdea);
    $('.card-prepend').prepend(newCard(newIdea.id, newIdea.title, newIdea.body, newIdea.quality));
}

function localStoreCard(newIdea) {
    var id = newIdea.id ;
    localStorage.setItem(id, JSON.stringify(newIdea));
}

$.each(localStorage, function(key) {
    var retrieveIdea = localStorage.getItem(key);
    var cardData = JSON.parse(retrieveIdea);
   $( ".card-prepend" ).prepend(newCard(cardData.id, cardData.title, cardData.body, cardData.quality));
});

$(".card-prepend").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var qualityVariable;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            qualityVariable = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            qualityVariable = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            qualityVariable = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            qualityVariable = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            qualityVariable = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            qualityVariable = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      










