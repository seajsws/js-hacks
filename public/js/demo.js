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
     *     https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
     *     https://coderwall.com/p/o9ws2g/why-you-should-always-append-dom-elements-using-documentfragments
     *     https://davidwalsh.name/documentfragment
     */

    var docFragger = function (...args) {
        var frag = document.createDocumentFragment();
        for (let item of args) {
            var p = document.createElement('p');
            p.style.display = 'inline-block';
            p.textContent = `${item}`;
            frag.appendChild(p);
        }
        return frag;
    };

    var dataLogger = function (selector, element) {
        document.body.getElementsByClassName(selector)[0]
            .appendChild(element);
    };

    fetch('http://localhost:3000/fortune')
        .then((response) => {
            return response.json();
        })
        .then((j) => {
            var fortuneCookie = docFragger(j.fortune);
            /**
             * getElementsByClassName and getElementsByTagName are much
             * faster than $() or querySelector methods. They return an HTML
             * Collection though so you need to access specific elements by 
             * index.
             */
            var fortuneDiv = document.getElementsByTagName('footer')[0]
                .getElementsByClassName('col-sm-6')[1];
            fortuneDiv.append(fortuneCookie);
            var dateSpan = ` | <span>${new Date(Date.now()).toLocaleString('en-US')}</span>`;
            /** insertAdjacentHTML: Allows us to insert HTML at specified points within
            existing elements, rather than overwriting the contents of the element.
            https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
            https://davidwalsh.name/insertadjacenthtml-beforeend
            */
            fortuneDiv.insertAdjacentHTML('beforeend', dateSpan);
        })
        .catch((err) => {
            console.log(err);
        });

    const exampleModal = $('.demo-modal');

    $('.jumbo-content__btn-learn-more').on('click', () => {
        exampleModal.modal();
    });

    exampleModal.on('shown.bs.modal', () => {
        exampleModal[0].querySelector('.form-control-label+input')
            .focus();
    });

    // Always make sure to reset the modal so we can call it multiple times
    exampleModal.on('hidden.bs.modal', () => {
        $(this)
            .find('.demo-modal__send-data')
            .replaceWith('<button type="button" class="btn btn-primary demo-modal__send-data">Send Data</button>')
            .end()
            .find('form')[0].reset();
    });

    /**
     * Event delegation & event object properties: the browser creates and dispatches
     * event objects automatically, so they are 'freebies' we can capture and use
     * to traverse and manipulate the DOM directly, or take different actions based
     * on stored properties like data attributes.
     * https://www.w3.org/TR/DOM-Level-3-Events/#dom-event-architecture
     * ** Especially propagation path
     */

    $('.page-content').on('click', '.card-block .btn-group button', function (event) {
        var target = event.target,
            classList = event.target.classList;
        var sendButton = exampleModal[0]
            .getElementsByClassName('demo-modal__send-data')[0];

        /* Rather than this: */
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
        /* Do this */
        sendButton.classList.remove('btn-primary');
        sendButton.classList.add(target.dataset.color);
        sendButton.textContent = target.dataset.text;
        sendButton.setAttribute('data-action', target.dataset.color);
        exampleModal.modal();

    });

    $('.demo-modal__send-data').on('click', function (event) {
        var target = Object.keys(event.target.dataset);
        var action = event.target.dataset.action === 'btn-cancel' ? 'cancel' :
            event.target.dataset.action === 'btn-info' ? 'info' :
            'success';
        var url = `/message?action=${action}&data=${$('.demo-modal form').serialize()}`;
        fetch(url)
            .then((data) => {
                /** Log the request information to the modal so we can see what we're 
                sending, and the status of the request
                */
                dataLogger('modal-body', docFragger(data.statusText, url, action, target));
            })
            .then(() => {
                setTimeout(() => {
                    /** Clear the log from the modal body, but don't obliterate
                    the form. previousElementSibling.children is a LIVE nodeList 
                    which is array-like; it does have a forEach method, but since 
                    we don't want to remove the first element of .children (it's 
                    our form), we need to use a for loop. However, because the 
                    nodeList is live, we should use the native Array.slice method
                    to iterate as if we were using a real, fixed-length array.
                    */
                    var collection = Array.prototype.slice
                        .call(event.target.parentElement.previousElementSibling.children);
                    console.log(collection);
                    for (let i = 1; i < collection.length; i++) {
                        collection[i].remove();
                    }
                }, 5000);
            })
            .catch((err) => {
                console.log(err.statusText);
            });
    });

});