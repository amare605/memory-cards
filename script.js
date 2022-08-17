// const
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// 追蹤現在的卡片
let currentActiveCard = 0;

// 儲存DOM CARDS
const cardsEl = [];

// 儲存卡片資訊
const cardsData = getCardsData();

// data 格式參考
// const cardsData = [
//   {
//     question: 'What must a variable begin with?',
//     answer: 'A letter, $ or _'
//   },
//   {
//     question: 'What is a variable?',
//     answer: 'Container for a piece of data'
//   },
//   {
//     question: 'Example of Case Sensitive Variable',
//     answer: 'thisIsAVariable'
//   }
// ];

// 建立所有卡片
function createCards(){
    cardsData.forEach((data, index) =>  createCard(data , index));
}

// 建立單張卡片在DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    if(index === 0) {
        card.classList.add('active');
    }

    // dom 結構
    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
             <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
             <p>${data.answer}</p>
        </div>
    </div>
    `;

    // eventlistner >> 點選顯示答案
    card.addEventListener('click', () =>card.classList.toggle('show-answer'));


    // 儲存到dom  cards
    cardsEl.push(card);
    // 新增到dom
    cardsContainer.appendChild(card);

    // 顯示目前在第幾張卡片
    updateCurrentText();
}

// 顯示目前在第幾張卡片
function updateCurrentText(){
    currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// 從local storage 取得卡片
function getCardsData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// 新增卡片到local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// event listners

// next button
nextBtn.addEventListener('click' , () =>{
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;
  
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
    }
  
    cardsEl[currentActiveCard].className = 'card active';
  
    updateCurrentText();
});


// prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
  
    currentActiveCard = currentActiveCard - 1;
  
    if (currentActiveCard < 0) {
      currentActiveCard = 0;
    }
  
    cardsEl[currentActiveCard].className = 'card active';
  
    updateCurrentText();
});

// 顯示 add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// 隱藏 add container
hideBtn.addEventListener('click', () =>addContainer.classList.remove('show'));

// 新增卡片
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    // 如果question 和 answer 都有填
    if (question.trim() && answer.trim()) {
      const newCard = { question, answer };
      // 建立新卡片
      createCard(newCard);
      // 清空 question 和 answer  欄位
      questionEl.value = '';
      answerEl.value = '';
        
      // 關閉新增視窗
      addContainer.classList.remove('show');
    
      // 新增此卡片到data dom
      cardsData.push(newCard);
      // 儲存到local storage
      setCardsData(cardsData);
    }
});

// 清除卡片button
clearBtn.addEventListener('click', () => {
    // 清除Local storage
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});
  