

var dicpanel = document.getElementById('dicPanel')
var dicclose = document.getElementById('dic-close')
var dragword = document.getElementById('drag-word')
var wordname = document.getElementById('wordname')

var fbsearch = document.getElementById('fbsearch')
var fbsearch_ic = document.getElementById('fbsearch_ic')
var search = document.getElementById('search')
var worddetails = document.getElementById('word-details')
var pbdid = document.getElementById('pbd')
var loaddata = document.getElementById('loaddata')

var onlongtouch;
var timer;
var touchduration = 1200; //length of time we want the user to touch before we do something

// function touchstart(e) {
//     try {
//         //e.preventDefault();
//         if (!timer) {
//             timer = setTimeout(onlongtouch, touchduration);
//         }
//     } catch (error) {
//         console.log('touch not support')
//     }
// }

// function touchend() {
//     //stops short touches from firing the event
//     if (timer) {
//         clearTimeout(timer);
//         timer = null;

//     }
//     fbsearch.style.display = 'none';
// }

// onlongtouch = function () {
//     timer = null;
//     fbsearch.style.display = 'flex';
// };

// document.addEventListener("DOMContentLoaded", function (event) {
//     window.addEventListener("touchstart", touchstart, false);
//     window.addEventListener("touchend", touchend, false);
// });




const dicoption = (event, id) => {
    var dicmeaning = document.querySelectorAll('.dicmeaning')
    for (var i = 0; i < dicmeaning.length; i++) {
        dicmeaning[i].style.display = "none";
        if (id === 'palldic') {
            // dicmeaning[i].style.display = 'block'
        }
    }

    var dicname = document.getElementsByClassName('dicname')
    for (var i = 0; i < dicname.length; i++) {
        dicname[i].className = dicname[i].className.replace(' dicnameactive', '')
    }
    document.getElementById(id).style.display = "block";
    event.currentTarget.className += " dicnameactive";

}
const setdic = (key, value) => {
    // window.localStorage.setItem(key, value)
}


//By settings control boolean condition : isShow true or false
// if (isShow) {
//     // By long press open dictionary panel with selected word and meaning.
//     loaddata.addEventListener('long-press', function (e) {
//         e.target.setAttribute('data-editing', 'true');
//         //console.log('document long press true')
//         var dicpanel = document.getElementById('dicPanel')
//         dicpanel.style.display = "block"
//         try {
//             var inputid = document.getElementById('inputid')
//             inputid.remove()
//         } catch (error) { }
//         selectword()
//         onlongtouch()
//     });

// }


var selectword = () => {
    if (window.getSelection) {
        var selectionRange = window.getSelection();
        var word = selectionRange.toString();
        var input = document.createElement('input')
        input.setAttribute('onkeyup', 'frominput()')
        input.setAttribute('id', 'inputid')
        input.setAttribute('value', `${word}`)
        input.setAttribute('type', 'search')
        wordname.appendChild(input)

        let isZero = (word.length === 0)
        let islength = (word.length >= 60)
        if (isZero) {
            dicpanel.style.display = 'none'
        }
        if (word) {
            setTimeout(() => {
                dic(word)
            }, 100)
        }
        if (islength) {
            dicpanel.style.display = 'none'
        }

    }
    else {

        if (document.selection.type === 0) {
            alert("No content is selected, or the selected content is not available!");
        }
        else {
            var textRange = document.selection.createRange();
            alert("The text content of the selection:\n" + textRange.text);
        }
    }
    return word
}


const frominput = () => {
    var word = inputid.value
   
    try {
       // android.getDicMeaning(word)
    } catch (error) {
        
    }
    try {
        //dic(word)
    } catch (error) {
        
    }
}
// clocse 
// Custom selected word or any charector click the search button shown meaning.
// search.addEventListener('touchstart', () => {
//     if (window.getSelection) {

//         var selectionRange = window.getSelection();
//         var word = selectionRange.toString();
//         var inputid = document.getElementById('inputid')
//         inputid.setAttribute('value', `${word}`)
//         dic(word)
//     }
// })

// try {
//     fbsearch_ic.addEventListener('touchstart', () => {
//         if (window.getSelection) {

//             var selectionRange = window.getSelection();
//             var word = selectionRange.toString();
//             var inputid = document.getElementById('inputid')
//             inputid.setAttribute('value', `${word}`)
//             dic(word)
//         }
//     })
// } catch (error) {

// }
dicclose.addEventListener('click', () => {
    dicpanel.style.display = 'none'
})


// এখান থেকে কাজ হবে

var numbers = {
    0: '০',
    1: '১',
    2: '২',
    3: '৩',
    4: '৪',
    5: '৫',
    6: '৬',
    7: '৭',
    8: '৮',
    9: '৯'
};

function replaceNumbers(input) {
    var output = [];
    for (var i = 0; i < input.length; ++i) {
        if (numbers.hasOwnProperty(input[i])) {
            output.push(numbers[input[i]]);
        } else {
            output.push(input[i]);
        }
    }
    return output.join('');
}

var roman = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]
var bn = [
    'অ',
    'আ',
    'ই',
    'ঈ',
    'উ',
    'ঊ',
    'এ',
    'ও',
    'ক',
    'খ',
    'গ',
    'ঘ',
    'ঙ',
    'চ',
    'ছ',
    'জ',
    'ঝ',
    'ঞ',
    'ট',
    'ঠ',
    'ড',
    'ঢ',
    'ণ',
    'ত',
    'থ',
    'দ',
    'ধ',
    'ন',
    'প',
    'ফ',
    'ব',
    'ভ',
    'ৰ',
    'ম',
    'য',
    'র',
    'ল',
    'ল়',
    'স',
    'হ',
]


var dic = (word) => {
    const getDic = (dicName, count, ditails, dicTitle) => {
        const isEmptyValue = (value) => {
            if (value === '' || value === null || value === undefined) {
                return true
            } else {
                document.getElementById(`${ditails}`).innerHTML = `<b>${dicTitle}</b> অভিধানে <mark> “${word}” </mark> শব্দটি পাওয়া যাচ্ছে না!`
                document.getElementById(`${count}`).innerHTML = ''
                return false
            }
        }
        var notMatch = isEmptyValue(word)

        var arr = []
        var maxlength = 3;
        for (let i = 0; i < dicName.length; i++) {
            let isMatch = dicName[i].toString().startsWith(word)
            if (notMatch) {
                // console.log('please type anything')
                //document.getElementById('word').innerHTML = 'Please type anything'
            } else {
                if (isMatch) {
                    arr.push(`</span><b>` + dicName[i].join('</b>: <span class="mean">'))
                    for (let k = 0; k < arr.length; k++) {
                        if (arr.length <= maxlength) {
                            let word_count = document.getElementById(`${count}`)
                            word_count.innerHTML = `<p class="wordlength"><b>${dicTitle}</b> অভিধানে মোট “` + replaceNumbers(`${arr.length}`) + '” টি শব্দের ফলাফল ।</p>'
                            let word_ditails = document.getElementById(`${ditails}`)
                            word_ditails.innerHTML = arr.join('<br>')
                        }
                    }
                }
            }
        }
    }
    setTimeout(() => {
        getDic(cped, 'cped_count', 'cped_details', 'cped');
        getDic(ped, 'palldic_count', 'palldic_details', 'ped');
        getDic(cepd, 'ealldic_count', 'ealldic_details', 'E-all');
        getDic(pbd, 'pbdic_count', 'pbdic_details', 'Pbd');
    }, 1000)
}
