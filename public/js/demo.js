'use strict';
document.addEventListener('DOMContentLoaded', () => {
    console.log('locked and loaded!');

    $('.jumbo-content__btn-learn-more').on('click', () => {
        $('.demo-modal').modal();
    });
});