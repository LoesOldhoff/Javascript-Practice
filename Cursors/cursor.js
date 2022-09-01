// Cool for later: https://codepen.io/ntenebruso/pen/QWLzVjY (double cursor, change color when hover over element)

// rotate cursor followup: https://www.youtube.com/watch?v=_WJSH7NxtRc

const FL1 = document.querySelector('#follower1');
const FL2 = document.querySelector('#follower2');
const FL3 = document.querySelector('#follower3');


document.addEventListener('mousemove', e => {
    FL1.setAttribute('style', 'top: ' + (e.pageY) + 'px; left: ' + (e.pageX) + 'px;');
    FL2.setAttribute('style', 'top: ' + (e.pageY + 3) + 'px; left: ' + (e.pageX + 3) + 'px;');
    FL3.setAttribute('style', 'top: ' + (e.pageY + 6) + 'px; left: ' + (e.pageX + 6) + 'px;');
})