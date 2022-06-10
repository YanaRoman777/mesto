class Card{
    constructor(data, userId, {handleCardClick, handleDelCard, handleLikeClick}, cardSelector/* , {addLike, deleteLike} */){
    // constructor({data, handleCardClick}, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardClick= this._handleCardClick.bind(this);
        this._userId = userId;        
        this._data = data;
        this._handleDelCard = handleDelCard;
        this._handleDelCard=this._handleDelCard.bind(this);
        this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
        this._handleLikeClick= handleLikeClick;
        this._handleLikeClick = this._handleLikeClick.bind(this);
        this._handleLikeIcon = this._handleLikeIcon.bind(this);


        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__like');
        
        this._likeNumber = this._element.querySelector('.cards__like-number');
        this._closeButton = this._element.querySelector('.cards__close');
        this._cardImage = this._element.querySelector('.cards__image');
        this._cardName = this._element.querySelector('.cards__title');
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardTemplate;
    }
    _handleLikeIcon(evt) {
        // this._likeButton.classList.toggle('cards__like-active');
        this._handleLikeClick(evt.target, this._elementId, this._element);
    }
    _removeCard() {
        this._element.remove();
    }
    // Добавление обработчиков
    _setEventListeners() {
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        
        this._closeButton.addEventListener('click', this._deleteButtonHandler);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }
    generateCard() {
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
        this._elementId = this._data._id;
        if (!(this._userId === this._data.owner._id)) {
            this._closeButton.style.display = "none";
        }
        this._data.likes.forEach(elm =>{
            if(elm._id === this._userId){
                this._likeButton.classList.add('cards__like-active');
            }
        });
        this._likeNumber.textContent = this._likes.length;
    
        return this._element;
    }

    _deleteButtonHandler() {
        this._handleDelCard(this._element, this._elementId, this.deleteCard);
      }

    deleteCard() {
        this._element.remove();
    }

    isLiked(){
        if(this._likeButton.classList.contains('cards__like-active')){
            return true;
        } else{
            return false;
        }
    }

    updateLikes(post, likes){

        this._likeButton.classList.toggle('cards__like-active');
        this._likeNumber.textContent=likes.length;
        
    }
};
export {Card};