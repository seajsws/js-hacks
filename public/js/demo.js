'use strict';
document.addEventListener('DOMContentLoaded', () => {
    console.log('locked and loaded!');

// https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
// https://davidwalsh.name/documentfragment
    var docFragger = function(...args) {
        var frag = document.createDocumentFragment();
        for (let item of args) {
            var div = document.createElement('div');
            div.textContent = `${item}`;
            frag.appendChild(div);
        }
        return frag;
    };

    var dataLogger = function(selector, element) {
        document.body.getElementsByClassName(selector)[0]
            .appendChild(element)
            // TypeError (not of type element)
            // .insertAdjacentElement(position, element)
    };

    var utilityDiv = docFragger('stuff', 'something', 'something else');
    console.log(utilityDiv);

    dataLogger('page-content', utilityDiv);

    $('.jumbo-content__btn-learn-more').on('click', () => {
        $('.demo-modal').modal();
    });
});