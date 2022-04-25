

var dictioNary = document.getElementById('dictionary')
const androidback = () => {
    var alldata = dictioNary.outerHTML.toString()
    window.localStorage.setItem('savedata', alldata)
    window.localStorage.setItem('saveState', true)
}

var getdata = window.localStorage.getItem('saveState')
if (getdata) {
    dictioNary.innerHTML = window.localStorage.getItem('savedata')
} else {

}

var backbtn = document.getElementById('backbtn')
backbtn.addEventListener('click', () => {
    // var alldata = dictioNary.outerHTML.toString()
    // 	window.localStorage.setItem('savedata', alldata)
    // 	window.localStorage.setItem('saveState', true)
    try {
        android.backpress();
    } catch (error) {
        console.log('i am not android')
    }

})

var script_tag = document.querySelectorAll('.script_tag')


var dicmain = document.getElementById('dicmain')
var dicitem = document.querySelectorAll('.dicitem')
var dic_pbd = document.getElementById('dic_pbd')
var dic_ped = document.getElementById('dic_ped')
var dic_epd = document.getElementById('dic_epd')

var inputbar_item = document.querySelectorAll('.inputbar_item')
var palidic_option = document.getElementById('palidic_option')
var endicfilter = document.getElementById('endicfilter')
var pdic_item = document.querySelectorAll('.pdic_item')

var inputpbd = document.getElementById('inputpbd')
var valpbd = inputpbd.value
var inputped = document.getElementById('inputped')
var valped = inputped.value
var inputepd = document.getElementById('inputepd')
var valepd = inputepd.value


var result_list_pbd = document.getElementById('result_list_pbd')
var result_list_ped = document.getElementById('result_list_ped')
var result_list_epd = document.getElementById('result_list_epd')


var result_pi_en_list = document.getElementById('result_pi_en_list')

var result_detail_pbd = document.getElementById('result_detail_pbd')
var result_detail_ped = document.getElementById('result_detail_ped')
var result_detail_epd = document.getElementById('result_detail_epd')

var title_name = document.querySelectorAll('.p_en_name, .dicTile')

const showTitle = () => {
    for (var i = 0; i < title_name.length; i++) {
        title_name[i].style.display = 'block'
    }
}

const dicactive = (event, id, result) => {

    var dic = document.querySelectorAll('.dic')
    var result_bar = document.querySelectorAll('.result_bar')
    for (var i = 0; i < dic.length; i++) {
        dic[i].style.display = "none";
        if (id === 'palldic') {
            // dicmeaning[i].style.display = 'block'
        }
    }
    for (var i = 0; i < result_bar.length; i++) {
        result_bar[i].style.display = "none";
    }
    for (var i = 0; i < dicitem.length; i++) {
        dicitem[i].className = dicitem[i].className.replace(' dicActive', '')
    }
    document.getElementById(id).style.display = "block";
    document.getElementById(result).style.display = "block";

    event.currentTarget.className += " dicActive";

}

const pdic_itemSet = (key) => {

    for (var i = 0; i < pdic_item.length; i++) {
        pdic_item[i].addEventListener('click', (e) => {
            localStorage.setItem(`${key}`, e.target.getAttribute('id'))
        })
    }
}

pdic_itemSet('pdic')

function onlyOne(checkbox) {
    var checkboxes = document.querySelectorAll('.pdic_item')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

const pdic_itemGet = () => {
    var val = localStorage.getItem(`pdic`)
    if (val === null || undefined || '') {
        pdic_item[3].checked = true //default checked Zero number index
    } else {
        for (var i = 0; i < pdic_item.length; i++) {
            if (pdic_item[i].getAttribute('id') === val) {
                pdic_item[i].checked = true;
            }
        }
    }

}

pdic_itemGet()

for (var i = 0; i < inputbar_item.length; i++) {
    var id = inputbar_item[i].getAttribute('id')

}

let toggleen = false;
const toggleenFilter = () => {
    if (toggleen) {
        palidic_option.style.display = 'none';
    } else {
        palidic_option.style.display = 'block';

    }
    toggleen = !toggleen;
}
endicfilter.addEventListener('click', toggleenFilter, false);


const pbdfun = () => {
    dictionary('pbd', 'result_list_pbd', inputpbd, 'showpbd')
    inputpbd.setAttribute('value', inputpbd.value)

}


const pedfun = (e) => {
    var key = window.localStorage.getItem('pdic')
    if (key === 'option_ped') {
        dictionary('ped', 'result_list_ped', inputped, 'showped')

    } else if (key === 'option_cped') {
        dictionary('cped', 'result_list_cped', inputped, 'showcped')

    } else if (key === 'option_ppd') {
        dictionary('ppd', 'result_list_ppd', inputped, 'showppd')


    } else if (key === 'option_All') {
        dictionary('ped', 'result_list_ped', inputped, 'showped')
        dictionary('cped', 'result_list_cped', inputped, 'showcped')
        dictionary('ppd', 'result_list_ppd', inputped, 'showppd')

    } else {
        //default dictionary active 3 number index
        dictionary('ped', 'result_list_ped', inputped, 'showped')
        dictionary('cped', 'result_list_cped', inputped, 'showcped')
        dictionary('ppd', 'result_list_ppd', inputped, 'showppd')
    }
    //inputped.setAttribute('value', inputped.value)
    getEvnt(e)

}
const epdfun = () => {
    dictionary('cepd', 'result_list_epd', inputepd, 'showepd')
    inputepd.setAttribute('value', inputepd.value)


}
//console.log(ppd[39][1])
function getEvnt(e) {
    return e
}
const isEmptyValue = (value) => {
    if (value === '' || value === null || value === undefined) {
        return true
    } else {
        return false
    }
}

const dictionary = (dicName, listid, inputval, fun) => {
    inputval = inputval.value
    function webdic(dicName, listid, inputval, fun) {
        dicName = window[dicName]
        console.log(dicName)
        var word = inputval;
        let isZero = (word === '');
        let isLong = (word.length >= 20)
        let list_id = document.getElementById(`${listid}`)
        list_id.style.display = 'block'

        var notMatch = isEmptyValue(word)

        var arr = []
        var maxlength = 5;
        for (let i = 0; i < dicName.length; i++) {
            let isMatch = dicName[i][0].toString().startsWith(word)

            if (notMatch) {
                // console.log('please type anything')
            } else {
                if (isMatch) {
                    arr.push(`<li class="wordlist" onclick="${fun}(${i}, '${fun + i}')">` + dicName[i][0] + `</li>`)
                    for (let k = 0; k < arr.length; k++) {
                        if (arr.length <= maxlength) {
                            list_id.innerHTML = arr.join('')
                        }
                    }
                }
            }
        }

        if (isZero) {
            //list_id.innerHTML = '<button>Go to history.</button>'
        }
        if (isLong) {
            list_id.innerHTML = 'Your type too long.....' + word.length
        }
    }

    if (localStorage['divice'] == undefined) {
        webdic(dicName, listid, inputval, fun)
    } else {
        //console.log(dicName.constructor.name)
        myClick({
            dicName: dicName,
            listid: listid,
            inputval: inputval,
            fun: fun
        }, [])
        
    }

    
    
    //return getallView(word, isZero, isZero)
}

function clickHandeler(fn, delay) {
    let timeoutId;
    return function () {

        var context = this;
        var arg = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            fn.apply(context, arg);
        }, delay)
    }
}

var myClick = clickHandeler(function (context, arg) {
   
    var { dicName, listid, inputval, fun} = context
    if (inputval != '') {
        // console.log(arg[0])
        try {
            var key = window.localStorage.getItem('pdic')
            
            if (key === 'option_All') {
                dicName = 'pAll'
            }
            android.mDictionary(dicName, listid, inputval, fun)
            console.log(dicName, listid, inputval, fun)
        } catch (error) {

        }

    }
}, 400)



const showpbd = (index, idName) => {
    // result_list_pbd.style.display = 'none'
    result_detail_pbd.style.display = 'block'
    result_detail_pbd.innerHTML = `<div class="details_word" id="${idName}" > ${pbd[index][0]} </div>` + ` <div class="meaning">${pbd[index][1]} </div>`
    clicktoTop(`${idName}`)
}
const showped = (index, idName) => {
    //result_list_ped.style.display = 'none'
    result_detail_ped.style.display = 'block'
    result_detail_ped.innerHTML = `<div class="details_word" id="${idName}" > ${ped[index][0]} </div>` + ` <div class="meaning">${ped[index][1]} </div>`
    clicktoTop(`${idName}`)
}
const showcped = (index, idName) => {
    //result_list_cped.style.display = 'none'
    result_detail_cped.style.display = 'block'
    result_detail_cped.innerHTML = `<div class="details_word" id="${idName}" > ${cped[index][0]} </div>` + ` <div class="meaning">${cped[index][1]} </div>`
    clicktoTop(`${idName}`)
}
const showppd = (index, idName) => {
    //result_list_ppd.style.display = 'none'
    result_detail_ppd.style.display = 'block'
    result_detail_ppd.innerHTML = `<div class="details_word" id="${idName}" > ${ppd[index][0]} </div>` + ` <div class="meaning"> ${ppd[index][1]} </div>`
    clicktoTop(`${idName}`)
}
const showepd = (index, idName) => {
    // result_list_epd.style.display = 'none'
    result_detail_epd.style.display = 'block'
    result_detail_epd.innerHTML = `<div class="details_word" id="${idName}"> ${cepd[index][0]} </div>` + ` <div class="meaning"> ${cepd[index][1]} </div>`
    clicktoTop(`${idName}`)
}

//viewAll method
const viewAll = () => {

}
//when repeat click on input box search result word list-item hide
var input = document.querySelectorAll('.input')
for (var i = 0; i < input.length; i++) {
    var id = input[i].getAttribute('id')

    if (id === 'inputpbd') {
        input[i].addEventListener('click', () => {
            //	result_list_pbd.style.display = 'block'
            //result_detail_pbd.style.display = 'none'
            clicktoTop(`result_list_pbd`)
        })
    }
    if (id === 'inputped') {
        input[i].addEventListener('click', () => {
            //result_list_ped.style.display = 'block'
            //result_detail_ped.style.display = 'none'
            clicktoTop(`result_list_ped`)
        })
    }
    if (id === 'inputepd') {
        input[i].addEventListener('click', () => {
            //result_list_epd.style.display = 'block'
            //result_detail_epd.style.display = 'none'
            //result_detail_epd.style.zoom = '200%'
            clicktoTop(`result_list_epd`)

        })
    }
}
const clicktoTop = (id) => {
    var clickTop = document.querySelector(`#${id}`)
    clickTop.scrollIntoView(true);
    clickTop.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    window.scrollBy(0, -250)
}

var actionbar = document.getElementById('actionbar')
var body = document.querySelectorAll('body, #dictab, #dicoutput, #palidic_option')

const themefun = (hbg, bg, color) => {
    // actionbar.style.background = `${hbg}`
    // actionbar.style.color = `${color}`
    // body.forEach((el) =>{
    // 	el.style.background = `${bg}`
    // 	el.style.color = `${color}`
    // })

}
var theme = window.localStorage.getItem('themeid')
switch (theme) {
    case 'day-light':
        themefun(themenname.night, 'red', 'white')
        break;
    case 'night':
        themefun('black', 'rgb(63, 62, 62)', 'white')
        break;
    case 'chocolate':
        themefun('chocolate', 'rgb(244 227 207)', '')
        break;
    case 'orange':
        themefun('orange', 'rgb(255 252 228)', '')
        break;
    case 'teal':
        themefun('teal', '#e2f5f5', '')
        break;
    case 'brown':
        themefun('brown', '#f5d6e2', '')
}


function softkey(letter) {
    if (letter !== "shift") {
        inputped.setRangeText(
            letter,
            inputped.selectionStart,
            inputped.selectionEnd,
            'end',

        )



        inputpbd.setRangeText(
            letter,
            inputpbd.selectionStart,
            inputpbd.selectionEnd,
            'end',

        )

        inputped.focus()
        pbdfun();
        pedfun()
        epdfun()

        cb(letter)
    }
}

var soroSign = ['া', 'ি', 'ী', 'ু', 'ূ', 'ে', 'ো', 'ৈ', 'ৌ', '্']

console.log(soroSign)
function cb(l) {
    var soroSign_letter = []
    for (var i = 0; i < soroSign.length; i++) {
        soroSign_letter.push(`<span class='key' onclick="softkeysoroSign('${soroSign[i]}', event)">${l + soroSign[i]}</span>`)
    }

    document.getElementById('sign_div').innerHTML = soroSign_letter.join(' ')
}

function softkeysoroSign(letter, e) {
    if (inputped.value !== '') {
        inputped.setRangeText(
            letter,
            inputpbd.selectionStart,
            inputpbd.selectionEnd,
            'end',

        )
        inputpbd.setRangeText(
            letter,
            inputpbd.selectionStart,
            inputpbd.selectionEnd,
            'end',

        )

    } else {
        inputped.setRangeText(
            e.target.textContent,
            inputpbd.selectionStart,
            inputpbd.selectionEnd,
            'end',

        )
        inputpbd.setRangeText(
            e.target.textContent,
            inputpbd.selectionStart,
            inputpbd.selectionEnd,
            'end',

        )
    }






    inputped.focus()
    pbdfun();
    pedfun()
    epdfun()

}


function backspace() {
    textbox = inputped
    var inp = [inputped, inputpbd]
    for (var i = 0; i < inp.length; i++) {
        del(inp[i])
    }
    
    function del(textbox){
        var ss = textbox.selectionStart;
        var se = textbox.selectionEnd;
        var ln = textbox.value.length;

        console.log(ss, se)
    
        var textbefore = textbox.value.substring(0, ss);    //text in front of selected text
        var textselected = textbox.value.substring(ss, se); //selected text
        var textafter = textbox.value.substring(se, ln);    //text following selected text
        console.log(textbefore)
        console.log(textafter)
        if (ss == se) // if no text is selected
        {
            textbox.value = textbox.value.substring(0, ss - 1) + textbox.value.substring(se, ln);
            textbox.focus();
            textbox.selectionStart = ss - 1;
            textbox.selectionEnd = ss - 1;
        }
        else // if some text is selected
        {
            textbox.value = textbefore + textafter;
            textbox.focus();
            textbox.selectionStart = ss;
            textbox.selectionEnd = ss;
        }
    }
    //https://stackoverflow.com/questions/32863823/simulate-backspace-button-js
}