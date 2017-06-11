'use strict';
$(document).ready(() => {
    console.log('locked and loaded!');

    /**
     * documentFragment: a lightweight, performant way to build up html content
     * which can then be inserted into the DOM en masse. More efficient than using
     * innerHTML, triggers only one page reflow when the fragment is inserted.
     * @param {*} args 
     * Using rest operator we can accept an arbitrary number of arguments, loop
     * over them and attach as many elements as we need to our docFragment.
     */

    // https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
    // https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
    // https://davidwalsh.name/documentfragment
    var docFragger = function (...args) {
        var frag = document.createDocumentFragment();
        for (let item of args) {
            var div = document.createElement('div');
            div.textContent = `${item}`;
            frag.appendChild(div);
        }
        return frag;
    };

    var dataLogger = function (selector, element) {
        document.body.getElementsByClassName(selector)[0]
            .appendChild(element);
    };

    const exampleModal = $('.demo-modal');

    $('.jumbo-content__btn-learn-more').on('click', () => {
        exampleModal.modal();
    });

    /**
     * Event delegation & event object properties: the browser creates and dispatches
     * event objects automatically, so they are 'freebies' we can capture and use
     * to traverse and manipulate the DOM directly, or take different actions based
     * on stored properties like data attributes.
     */

    $('.page-content').on('click', '.card-block .btn-group button', function (event) {
        var target = event.target,
            classList = event.target.classList; /* we can do better! */
        var sendButton = exampleModal[0]
            .getElementsByClassName('demo-modal__send-data')[0];

        sendButton.classList.remove('btn-primary');
        sendButton.classList.add(target.dataset.color);
        sendButton.textContent = target.dataset.text;
        sendButton.setAttribute('data-action', target.dataset.color);
        exampleModal.modal();

        // if (classList.contains('card-block__btn-cancel')) {
        //     // handle cancel case
        //     // alert('cancel case');

        // } else if (classList.contains('card-block__btn-info')) {
        //     alert('info case');
        //     // handle cancel case
        // } else {
        //     alert('reserve case');
        //     // handle cancel case
        // }
    });

    $('.demo-modal__send-data').on('click', function (event) {
        console.log(event);
        var target = Object.keys(event.target.dataset);
        var action = event.target.dataset.action === 'btn-cancel' ? 'cancel' :
            event.target.dataset.action === 'btn-info' ? 'info' :
            'success';
        var url = `/message?action=${action}&data=${$('.demo-modal form').serialize()}`;
        fetch(url)
            .then((data) => {
                dataLogger('modal-body', docFragger(data.statusText, url, action, target));
            })
            .then(() => {
                setTimeout(() => {
                    var collection = event.target.parentElement.previousElementSibling.children;
                    console.log(collection);
                }, 200);
            })
            .catch((err) => {
                console.log(err.statusText);
            });
    });

    $(exampleModal).on('hidden.bs.modal', function () {
        console.log($(this));
        $(this)
            .find('.demo-modal__send-data')
            .replaceWith('<button type="button" class="btn btn-primary demo-modal__send-data">Send Data</button>')
            .end()
            .find('form')[0].reset();

        
    });

});