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

  window.addEventListener('resize', debounce(() => {
    visibleCards = getVisibleCardValue();
    activeVisibleCards = visibleCards;
    cardToOpen = visibleCards / 2;
  }, 200));

  loadMoreProductCards.addEventListener('click', function() {
    if (activeVisibleCards < productCards.length) {
      showCards();
    } else {
      hideCards();
    }
  });
});