function makeElement(elName, obj) {
    var el = makeAtt(elName, obj)
    return el;
}

function makeAtt(elName, obj) {
    var el = document.createElement(elName)
    var attNames = Object.keys(obj);
    var txt;
    for (var i = 0; i < attNames.length; i++) {
        if (!(attNames[i] == 'innerHTML' || attNames[i] == 'innerText' || attNames[i] == 'textContent')) {
            el.setAttribute(attNames[i], obj[attNames[i]]);
        } else {
            txt = attNames[i]
            // console.log(txt)
        }
        //  console.log(el)
    }

    switch (txt) {
        case "innerHTML":
            el.innerHTML = obj.innerHTML;
            break;
        case "innerText":
            el.innerText = obj.innerText;
            break;
        case "textContent":
            el.textContent = obj.textContent;
            break;
        default:
            el.textContent = '';
            break;
    }



    return el;
}