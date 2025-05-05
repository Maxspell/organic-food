document.addEventListener('DOMContentLoaded', function() {

  const burgerBtn = document.querySelector('header button.burger');
  const burgerBtnIcons = document.querySelectorAll('header button.burger img');

  burgerBtn.addEventListener('click', function() {
    burgerBtnIcons.forEach((icon) => {
      icon.classList.toggle('hidden');
    });

    document.querySelector('header .mobile-menu .nav').classList.toggle('visible');
  })

  const searchBtn = document.querySelector('header button.search-btn');

  searchBtn.addEventListener('click', function() {
    document.querySelector('header .mobile-menu .features .search').classList.toggle('expanded');
  })

  new Glide('.sec5-cards', {
    type: 'carousel',
    startAt: 0,
    perView: 1
  }).mount();

  const btnIdsToOpenModal = ['sec-8-card-1-btn', 'sec-8-card-2-btn'];
  const generalModalWrapper = document.querySelector('.modals-wrapper');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');

  btnIdsToOpenModal.forEach((btnId) => {
    const btnEl = document.getElementById(btnId);
    const modalId = btnEl.getAttribute('data-modal-id');
    const modalEl = document.getElementById(modalId);

    btnEl.addEventListener('click', function() {
      generalModalWrapper.classList.add('visible');
      modalEl.classList.add('visible');
      document.querySelector('body').classList.add('overflow');
    });
  })

  closeModalBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', function() {
      generalModalWrapper.classList.remove('visible');
      this.parentElement.classList.remove('visible');
      document.querySelector('body').classList.remove('overflow');
    })
  });

  const loadMoreProductCards = document.getElementById('load-more-cards');
  const productCards = document.querySelectorAll('.sec-4-card');
  let visibleCards = getVisibleCardValue();
  let activeVisibleCards = visibleCards;
  let cardToOpen = visibleCards / 2;

  function getVisibleCardValue() {
    return Array.from(productCards).filter(card => getComputedStyle(card).display !== 'none').length
  }

  function debounce(func, wait = 100) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, arguments);
        }, wait);
    };
  }

  window.addEventListener('resize', debounce(() => {
    visibleCards = getVisibleCardValue();
    activeVisibleCards = visibleCards;
    cardToOpen = visibleCards / 2;
  }, 200));

  function showCards() {
    const remainingCards = productCards.length - activeVisibleCards;
    const cardsToShow = Math.min(cardToOpen, remainingCards);
  
    for (let i = activeVisibleCards; i < activeVisibleCards + cardsToShow && i < productCards.length; i++) {
      productCards[i].style.display = 'block';
    }
  
    activeVisibleCards += cardsToShow;

    if (activeVisibleCards >= productCards.length) {
      loadMoreProductCards.querySelector('span').textContent = 'Load Less';
    }
  }

  function hideCards() {
    activeVisibleCards = visibleCards;
  
    for (let i = productCards.length - 1; i >= visibleCards; i--) {
      productCards[i].style.display = 'none';
    }

    loadMoreProductCards.querySelector('span').textContent = 'Load More';

    const offset = 60;
    const section = document.querySelector('.sec-4');
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionPosition + offset,
      behavior: 'smooth'
    });
  }

  loadMoreProductCards.addEventListener('click', function() {
    if (activeVisibleCards < productCards.length) {
      showCards();
    } else {
      hideCards();
    }
  });

  // function isEmailValid(value) {
  //   const emailValidateRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    
  //   return emailValidateRegExp.test(value);
  // }

  // (function() {
  //   emailjs.init({
  //     publicKey: "YOUR_PUBLIC_KEY",
  //   });
  // })();

  // const formBtn = document.getElementById('form-submit');
  // const emailField = document.getElementById('email-input');

  // formBtn.addEventListener('click', function(event) {
  //   event.preventDefault();

  //   const currentEmail = emailField.value;
  //   const isCurrentEmailValid = isEmailValid(currentEmail);

  //   if (isCurrentEmailValid) {
  //     emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
  //       user_email: currentEmail,
  //     });
  //     emailField.value = ''; //clear form after submiting
  //   } else {
  //     console.log('Please type correct email adress!')
  //   }
  // })
});