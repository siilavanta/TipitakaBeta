
//file:///data/data/org.kalpataruboi.siilavanta.tipitaka/tipitaka/main.html

var SRC = 'file:///data/data/org.kalpataruboi.siilavanta.tipitaka/tipitaka/'
var PCSRC = 'file:///C:/Users/siilavanta/Documents/'
var tablemain = document.getElementById('table_main')
var loaddata = document.querySelector('#loaddata')
var homepage = document.getElementById('homepage')
var cover = document.getElementById('cover')
var outclick = document.getElementById('outClick')
var swiperight = document.getElementById('swiperight')
var more = document.getElementById('more')

let compareid = document.getElementById('compareid')
let comparepanel = document.getElementById('comparepanel')
let homeid = document.getElementById('homeid')
let homemenu = document.getElementById('homemenu')
var dichead = document.getElementById('dic-head')
// compareid.addEventListener('click', ()=>{
//     comparepanel.style.display = 'block'
//     compareid.setAttribute('id', 'closecompare')
//     compareid.setAttribute('onclick', 'closecompare()')
// })
// let closecompare = ()=>{
//     compareid.setAttribute('id', 'compareid')
//     compareid.removeAttribute('onclick')
//     comparepanel.style.display = 'none'
// }

try {
    let togglecom = false;
    const toggleframe = () => {
        if (togglecom) {
            comparepanel.style.display = 'none';

        } else {
            comparepanel.style.display = 'block';
            if (!comparepanel.querySelector('#frame')) {
                comparepanel.innerHTML = '<iframe id="frame" src="./compare.html"></iframe>'
            }

        }
        togglecom = !togglecom;
    }
    compareid.addEventListener('click', toggleframe, false);

    let toggle = true;
    const togglehomemenu = () => {
        if (toggle) {
            //homemenu.style.display = 'none';
            homepage.style.display = 'block'
            loaddata.style.display = 'none'
        } else {
            // homemenu.style.display = 'block';
            homepage.style.display = 'none'
            loaddata.style.display = 'block'

        }
        toggle = !toggle;
    }
    homeid.addEventListener('click', togglehomemenu, false);
} catch (error) {

}

var palibooks = document.getElementById('palibooks')
var banglabooks = document.getElementById('banglabooks')
var englishbooks = document.getElementById('englishbooks')
var pitakaName = document.querySelectorAll('.pitakaName')
var pitakaName2 = document.querySelectorAll('.pitakaName2')

var palibooks = document.querySelector('#palibooks')
var palichild = palibooks.querySelectorAll('li')
var banglabooks = document.querySelector('#banglabooks')
var bnchild = banglabooks.querySelectorAll('li')
var englishbooks = document.querySelector('#englishbooks')
var enchild = englishbooks.querySelectorAll('li')



const homepagebooks = (booklistname) => {
    var bdbooks = booklistname.outerHTML
    bdbooks.toString()
    bdbooks = bdbooks.replace(/<hr>/gi, '')
    bdbooks = bdbooks.replace(/<br>/gi, '')

    const replaceobj = {
        bookName_panel: 'homebookName_panel',
        booklabelopen2: "homebooklabelopen2",
        pitakaName2: 'homepitakaName2'


    }
    bdbooks = bdbooks.replace(/bookName_panel|booklabelopen2|pitakaName2/gi, function (matched) {
        return replaceobj[matched];
    });
    cover.innerHTML = bdbooks
}

if (window.localStorage.getItem('homepitakaid') === null || undefined || '') {
    homepagebooks(banglabooks)
} else {
    let bookkey = window.localStorage.getItem('homepitakaid')
    if (bookkey === 'homebengali') {
        homepagebooks(banglabooks)
    }
    if (bookkey === 'homepali') {
        homepagebooks(palibooks)
    }
    if (bookkey === 'homeenglish') {
        homepagebooks(englishbooks)
    }
}

var homebookName_panel = document.querySelector('.homebookName_panel')
var homebookName_panel_child_li = homebookName_panel.querySelectorAll('li')
var homebookName_panel_child = homebookName_panel.querySelectorAll('.pitakaName, .homepitakaName2')

const setbookIcon = (elm) => {
    elm.forEach((pcl) => {
        pcl.insertAdjacentHTML('afterbegin', '<i class="material-icons"> &#xe86d; </i>')
    })
}
setbookIcon(palichild)
setbookIcon(bnchild)
setbookIcon(enchild)
setbookIcon(homebookName_panel_child_li)

const setfolderIcon = (elm) => {
    elm.forEach((pcl) => {
        pcl.insertAdjacentHTML('afterbegin', '<i class="material-icons"> &#xe2c7; </i>')
    })
}
setfolderIcon(pitakaName)
setfolderIcon(pitakaName2)
setfolderIcon(homebookName_panel_child)

function selectLangu(evnt, langu) {
    var langucontent = document.getElementsByClassName('bookName_panel')
    for (var i = 0; i < langucontent.length; i++) {
        langucontent[i].style.display = "none";
    }
    var language = document.getElementsByClassName('language')
    for (var i = 0; i < language.length; i++) {
        language[i].className = language[i].className.replace(' languActive', '')
    }
    var selectlanguage = document.getElementsByClassName('select_language')
    document.getElementById(langu).style.display = "block";
    //selectlanguage.style.display = ''
    evnt.currentTarget.className += " languActive";
}

function booklabelopen(evt, clasname) {
    var i, pitakaName;

    pitakaName = document.getElementsByClassName("pitakaName");
    for (i = 0; i < pitakaName.length; i++) {
        pitakaName[i].className = pitakaName[i].className.replace(" active", '');
    }
    var panel = document.querySelectorAll(`.${clasname}`)
    for (var i = 0; i < panel.length; i++) {
        panel[i].classList.toggle('show')
    }
    evt.currentTarget.className += " active";
}
function booklabelopen2(evt, classname) {
    var i, pitakaName2;

    pitakaName2 = document.getElementsByClassName("pitakaName2");
    for (i = 0; i < pitakaName2.length; i++) {
        pitakaName2[i].className = pitakaName2[i].className.replace(" active2", '');
    }
    var panel = document.querySelectorAll(`.${classname}`)
    for (var i = 0; i < panel.length; i++) {
        panel[i].classList.toggle('show')
    }
    evt.currentTarget.className += " active2";
}

function homebooklabelopen2(evt, classname) {
    var i, homepitakaName2;

    homepitakaName2 = document.getElementsByClassName("homepitakaName2");
    for (i = 0; i < homepitakaName2.length; i++) {
        homepitakaName2[i].className = homepitakaName2[i].className.replace(" homepitakaName2", '');
    }
    var panel = document.querySelectorAll(`.${classname}`)
    for (var i = 0; i < panel.length; i++) {
        panel[i].classList.toggle('showhome')
    }
    evt.currentTarget.className += " homepitakaName2";
}


var some = function () {
    var dn1 = 'hey iam dn1'
    dn1 += script = `<script> just call data with argument </script>`
    return dn1
}

var mula_1_1 = [1, 2]
var arr = [mula_1_1]
//Click the openbook(evt, classid) to invoke bookdata filename by appenndchild a script element.
var tipiEvent
function book(event, filename) {
    tipiEvent = event
    tipiEvent['tipi'] = {
        currentBookKey: filename
    };
//console.log(event.path)
    
    //console.log(event.view['mula_1_1'])
    var namo = '';
    var table_name = '';
    var placeholder = '';

    var placeholderBn = 'সূচিপত্র খুঁজুন'
    var placeholderEn = 'Search table of content'

    var namoPali = '<p class="namo">॥ নমো তস্স ভগৰতো অরহতো সম্মাসম্বুদ্ধস্স ॥</p>';
    var namoBn = '<p class="namo">॥ সেই ভগবান অর্হৎ সম্যকসম্বুদ্ধকে বন্দনা ॥</p>';
    var namoEn = '<p class="namo">॥ Namo tassa bhagavato arahato sammāsambuddhassa ॥</p>';

    var table_namePali = '<span> সূচিপত্র</span>';
    var table_nameBn = '<span> সূচিপত্র</span>';
    var table_nameEn = '<span> Table Of Contents</span>';
    
    if (filename.includes('en')) {
        namo = namoEn;
        table_name = table_nameEn
        placeholder = placeholderEn
    } else if(filename.includes('bn')){
        namo = namoBn;
        table_name = table_nameBn
        placeholder = placeholderBn

    } else {
        namo = namoPali;
        table_name = table_namePali
        placeholder = placeholderBn

    }


    homepage.style.display = 'none'
    loaddata.style.display = 'block'
    loaddata.scrollIntoView(true)
    loaddata.innerHTML = '';
    var imprtbook = document.createElement('script')
    var useragent = navigator.userAgent.toLowerCase()
    if (useragent.indexOf('android') > -1) {
        setTimeout(() => {

            // chapopen('txt2'); subclick('txt2')
        }, 1000)

       // imprtbook.src = `${SRC}bookdata/${filename}.js`
        //loaddata.appendChild(imprtbook)
        //console.log('is android')

        // new method for databacse


        try {

            // var meta = []
            // bookMeta[filename].chapter.forEach(function (el) {
            //     loaddata.innerHTML = '';
            //     meta.push(`<p class="chapter"> ${el}</p><div class="chaptxt"></div>`)
            //     loaddata.innerHTML = meta.join('')
            // })

            // bookhelper()
            // var chapterhelper = document.createElement('script')
            // chapterhelper.src = `chaptertoggle.js`
            // loaddata.appendChild(chapterhelper)

            loaddata.innerHTML = makeElement('div', {
                id: 'table_main',
                innerHTML: makeElement('div', {
                    id: "table_name",
                    innerHTML: `${table_name}` + makeElement('div', {
                        id: 'inpuDiv',
                        innerHTML: `<input placeholder="${placeholder}" onkeyup="titlesearch('p')" id="titlesearch">`
                    }).outerHTML
                }).outerHTML + makeElement('div', {
                    id: 'table_of_content',
                    onclick: 'showChapter(event)'
                }).outerHTML 
            }).outerHTML + makeElement('div', {
                id: 'bookdata',
                book: filename,
                onclick: 'popup(event)',
                innerHTML: `${namo}` + android.zeroChapter(filename)
            }).outerHTML
            
            android.loadBookTemplate(filename)

            setTimeout(function () {
                document.getElementById('titlename').innerHTML = document.querySelector('.bookname').textContent
                document.getElementById('booknameid').innerHTML = document.querySelector('.bookname').textContent

            }, 1)

            // note ref for banglabooks

            var key = Object.keys(ref)
            var notedb = document.getElementById('notedb')
            key.forEach(function (el, i) {
                if (el === filename) {
                    notedb.innerHTML = ref[filename]
                   // console.log('ref insserted')
                }
            })

            //dataRetrive()
            // all data
            function dataRetrive() {
                var tableData = makeElement('div', {
                    id: 'table_main',
                    innerHTML: makeElement('div', {
                        id: "table_name",
                        innerHTML: `${table_name}` + makeElement('div', {
                            id: 'inpuDiv',
                            innerHTML: `<input placeholder="${placeholder}" onkeyup="titlesearch('p')" id="titlesearch">`
                        }).outerHTML
                    }).outerHTML + makeElement('div', {
                        id: 'table_of_content'
                    }).outerHTML
                }).outerHTML
                var data = android.loadBookData(filename);

                loaddata.setAttribute('book', filename)
                console.log("book" + loaddata.getAttribute('book'))
                loaddata.innerHTML = tableData + data + `<div end="ed" class="end"></div>`
                data = '';
                searchhelper()
                bookhelper()
                var chapterhelper = document.createElement('script')
                chapterhelper.src = `chaptertoggle.js`
                loaddata.appendChild(chapterhelper)
               // console.log(filename)
            }
        } catch (error) {
            
        }
    } else {

        // setTimeout(()=>{

        //   
        // },1000)


        //old method
       imprtbook.src = `./bookdata/${filename}.js`
        loaddata.appendChild(imprtbook)
        console.log('not android')

        

    }

    

    var li = document.getElementsByTagName('li')
    for (var i = 0; i < li.length; i++) {
        li[i].className = li[i].className.replace(' activebook', '')
    }
    event.currentTarget.className += ' activebook'
    sidebar.style.display = 'none'
    outclick.style.display = 'none'
    if (filename == mula_1_1) {
        //console.log(arr)
    }
}

function subBook(presentBook) {

}


var loaddata = document.querySelector('#loaddata')
loaddata.addEventListener('click', () => {
    // table_main.style.display = "none"
    morehide()
})


function searchhelper() {
    
    // insert chaphead to chapter before
    var chap = document.querySelectorAll('.chapter')
    var chaptxtt = document.querySelectorAll('.chaptxt')
    //var chaphead = document.querySelectorAll('.chaphead')

    chaptxtt.forEach(function (el, i) {
        var child = el.querySelector('.chaphead')
        if (child) {
            //console.log(child)
            chap[i].insertAdjacentHTML('beforebegin', child.outerHTML)
            child.remove()
        }
        
    })

    chaptxtt = undefined;
    chap = undefined;
   
}

function bookhelper() {
    
    var booknameid = document.getElementById('booknameid')
    //var nikaya = document.querySelector('.nikaya')
    var bookname = document.querySelector('.bookname')
    //var content = document.getElementById('content')
    var chapter = document.querySelectorAll('.chapter')
    var title = document.querySelectorAll('.title')
    var subhead = document.querySelectorAll('.subhead')
    var subsubhead = document.querySelectorAll('.subsubhead')
    //var chapTossubhead = document.querySelectorAll('.chapter, .title ')
    var chaptxt = document.querySelectorAll('.chaptxt')
    //var allcontent = document.querySelectorAll('.chapter, .subhead, .title, .subsubhead')

    var allchild = loaddata.querySelectorAll('.chapter, .chaptxt, .title, .subhead, .subsubhead, .end')
    // css property set margin-top 50px programaticaly
    var centered = document.querySelectorAll('.centered')
    try {
        if (document.querySelector('.namo').getAttribute('class') === 'namo') {
            centered[0].setAttribute('class', 'centered')
        } else {
            centered[0].setAttribute('id', 'namo')
        }
    } catch (error) {

    }
    // setup custom attribute
    function setcustomatt(selector, att, attvalue) {
        for (var i = 0; i < selector.length; i++) {
            selector[i].setAttribute(`${att}`, `${attvalue}`)
        }
    }
    setcustomatt(chapter, "chapter", "ct")
    setcustomatt(title, "title", "tt")
    setcustomatt(chaptxt, "chaptxt", "ctt")
    setcustomatt(subhead, "subhead", "sh")
    setcustomatt(subsubhead, "subsubhead", "ssh")

    var filter = []; // filter item set in table of content and set onclick attribute for eyetaggle()
    for (var i = 0; i < allchild.length; i++) {
        if (allchild[i].getAttribute('chapter')) {
            allchild[i].classList.add('txt' + (i + 1))
            allchild[i].setAttribute('id', `txt${i}`)
            allchild[i].setAttribute('onclick', `chapteropen(event, "txt${i}"), subclick('txt${i}'), 
      toggleeye("visblid${i}", "visblidoff${i}") `)

            filter.push(`</section><li name='txt${i}' class="content_chapter" onclick="chapopen('txt${i}'), 
      subclick('txt${i}')">` + allchild[i].textContent + `</li>`)

            allchild[i].insertAdjacentHTML("beforeend", `<i id=visblid${i} class="material-icons visible">visibility</i> 
      <i id=visblidoff${i} class="material-icons visibleoff">visibility_off</i>`)

        }
        if (allchild[i].getAttribute('chaptxt')) {
            allchild[i].classList.add('txt' + (i - 1))
            var txt = allchild[i].textContent
            var substr = txt.substring(0, 200)
            //console.log(substr)// for summary testing
            // summary.push(substr)
            // filter.push(` <a style="display: none;">` + allchild[i].getAttributeNames('chaptxt') + "</a>")
            filter.push(`<section class="content_chaptxt" onclick="chapopen('txt${(i - 1)}')">`)
        }
        if (allchild[i].getAttribute('title')) {
            allchild[i].classList.add('txt' + i)
            allchild[i].addEventListener('click', function () {

            })
            filter.push(`<li class="content_title" onclick="subclick('txt${i}')">` + allchild[i].textContent + `</li>`)
        }
        if (allchild[i].getAttribute('subhead')) {
            allchild[i].classList.add('txt' + i)
            allchild[i].addEventListener('click', function () {

            })
            filter.push(`<li class="content_subhead" onclick="subclick('txt${i}')">` + allchild[i].textContent + `</li>`)
        }
        if (allchild[i].getAttribute('end')) {
            filter.push(`</section>`)
        }
        if (allchild[i].getAttribute('chapter')) {
            // do somthing
        } else {
            //console.log('normal : ' + allchild[i].textContent)
        }
    }

    var tablemain = document.getElementById('table_main')
    //console.log(tablemain)
    var table_name = document.getElementById('table_name')

    var inputdiv = document.createElement('div')
    inputdiv.setAttribute('id', 'inputdiv')
    var inputbox = document.createElement('input')
    inputbox.setAttribute('id', 'titlesearch')
    inputbox.setAttribute('onkeyup', 'titlesearch()')
    inputbox.setAttribute('placeholder', 'Search...')
    inputdiv.appendChild(inputbox)
    table_name.insertAdjacentElement('beforeend', inputdiv)

    var createtablecontent = document.createElement('div')
    var createnode = document.createTextNode(' ')
    createtablecontent.setAttribute('id', 'table_of_content')
    createtablecontent.appendChild(createnode)
    tablemain.appendChild(createtablecontent)
    var table_of_content = document.getElementById('table_of_content')
    setTimeout(() => {
        table_of_content.innerHTML = filter.join('')
    }, 200)
    setTimeout(() => {
        let tablechap = table_of_content.querySelectorAll('li')
        for (var i = 0; i < tablechap.length; i++) {
            if (tablechap[i].getAttribute('class') === "content_chapter") {
                //tablechap[i].setAttribute('onclick', `${tablechap[i].getAttribute('onclick')}, toggleeye("visblid${i}", "visblidoff${i}")` )
            }
        }
    }, 1000)

    setTimeout(() => {
        try {
            //'<i class=" material-icons">chevron_right</i>' +
            booknameid.innerHTML = bookname.textContent
            document.getElementById('titlename').innerHTML = bookname.textContent
            //console.log(bookname.textContent)
        } catch (error) {
            console.log('error')
        }
    }, 100)

    //bangla set att onclick for fnote
    var noteref = document.querySelectorAll('.ftnRef')
    for (var i = 0; i < noteref.length; i++) {
        noteref[i].setAttribute('onclick', `fnote("ftn${i + 1}")`)
    }
    getsetting('applanguid', 'applangu')
    getsetting('themeid', 'theme')
    getsetting('wordid', 'word')
    

    setTimeout(function () {
        chaptxt = undefined
        allchild = [];
        filter = [];
        chapter = undefined;
        title = undefined;
        subhead = undefined;

    }, 2000)
    

}// bookhelper end

// toggle visivilty chapter eye icon.
const toggleeye = (eyeopenid, eyecloseid) => {
    document.querySelector(`#${eyeopenid}`).classList.toggle('off')
    document.querySelector(`#${eyecloseid}`).classList.toggle('on')
}

function titlesearch() {
    var arg = arguments[0]
    var input, filter, ul, li, a, i, div;
    var el;
   console.log(arg)
    arg == undefined ? el = 'li' : el = arg;
    
    input = document.getElementById("titlesearch");
    filter = input.value.toUpperCase();
    div = document.getElementById("table_of_content");
    li = div.getElementsByTagName(el);
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
           
        } else {
            li[i].style.display = "none";
        }
    }
}

function user() {
    
    var useragent = navigator.userAgent.toLowerCase()
    if (useragent.indexOf('android') > -1) {
        //menuid.style.display = 'none'
        //contentMenu.style.display = 'none'
    }
}
user()
// from android control
outclick.addEventListener('click', function () {
    try {
        tableclick = false;
        sidebar.style.display = 'none'
        this.style.display = 'none'
        morehide(); tablehide()
    } catch (error) { }
})
function menushow() {
    sidebar.style.display = 'block'
    outclick.style.display = 'block'
    
    try {
        // console.log(chapter[0].textContent)
        morehide(); tablehide()
    } catch (error) {

    }
}
function tableshow() {
    tableclick = true
    sidebar.style.display = 'none'
    outclick.style.display = 'block'
    try {
        document.getElementById('table_main').style.display = "block"

    } catch (error) {
        //alert('Hey dear i am Table of content button! Please open any book.')
        outclick.style.display = 'none'
    }
}
function moreshow() {
    try {
        menuhide(),
        more.style.display = 'block'
        outclick.style.display = 'block'
        
    } catch (error) {
        console.log(error)

    }
}
function menuhide() {
    sidebar.style.display = 'none'
    outclick.style.display = 'none'

}
function tablehide() {
    document.getElementById('table_main').style.display = 'none'

}
function morehide() {
    more.style.display = 'none'

}
function settingPanelhide() {
    document.getElementById('settingPanel').style.display = 'none'
}
function tpsearchhide() {
    document.getElementById('searchPanel').style.display = 'none'
}


const themefun = (header, headtxt, panel, booktxt) => {
    var allpanel = document.querySelectorAll('body, #cover, .pitakasum, .bookName_panel, .bookName_panel2, .pitakaName,  #table_main, #inputdiv, #loaddata, #dicPanel, #more, #settingPanel, #homemenu')
    for (var i = 0; i < allpanel.length; i++) {
        allpanel[i].style.background = panel
        allpanel[i].style.color = booktxt
    }
    var allheader = document.querySelectorAll('#main-navbar, #appname, a, .navleft, .navright, #compareid, #tableid, #moreid, #setting_title, #dic-head, .select_language, #table_name')
    for (var i = 0; i < allheader.length; i++) {
        allheader[i].style.background = header
        allheader[i].style.color = headtxt
    }
}
let isShow = true
function setsetting(key, query) {
    var radios = document.querySelectorAll(`.${query}`)
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', () => {
            localStorage.setItem(`${key}`, event.target.value)

        })
        var attval = radios[i].getAttribute('value')
        if (attval === 'day-light') {
            radios[i].addEventListener('click', () => {
                themefun(themename.default, txtcolor.default, themename.default, txtcolor.default)
            })
        }

        if (attval === 'night') {
            radios[i].addEventListener('click', () => {
                themefun(themename.night, txtcolor.night, themename.night_lite, txtcolor.night_lite)
            })
        }
        if (attval === 'chocolate') {
            radios[i].addEventListener('click', () => {
                themefun(themename.chocolate, txtcolor.default, themename.chocolate_lite, txtcolor.default)
            })
        }
        if (attval === 'orange') {
            radios[i].addEventListener('click', () => {
                themefun(themename.orange, txtcolor.default, themename.orange_lite, txtcolor.default)
            })
        }
        if (attval === 'teal') {
            radios[i].addEventListener('click', () => {
                themefun(themename.teal, txtcolor.default, themename.teal_lite, txtcolor.default)
            })
        }
        if (attval === 'brown') {
            radios[i].addEventListener('click', () => {
                themefun(themename.brown, txtcolor.default, themename.brown_lite, txtcolor.default)
            })
        }
        if (attval === 'show') {
            radios[i].addEventListener('click', () => {
                isShow = true
                // console.log(isShow)
            })
        }
        if (attval === 'none') {
            radios[i].addEventListener('click', () => {
                isShow = false
                //console.log(isShow)
            })
        }

        if (attval === 'pali') {
            radios[i].addEventListener('click', () => {
                console.log('pl')
                selectLangu(event, 'palibooks')
                document.querySelectorAll('.language')[0].classList.add('languActive')

            })
        }
        if (attval === 'bengali') {
            radios[i].addEventListener('click', () => {
                console.log('bn')
                selectLangu(event, 'banglabooks')
                document.querySelectorAll('.language')[1].classList.add('languActive')

            })
        }
        if (attval === 'english') {
            radios[i].addEventListener('click', () => {
                console.log('en')
                selectLangu(event, 'englishbooks')
                document.querySelectorAll('.language')[2].classList.add('languActive')

            })
        }

        if (attval === 'homebengali') {
            radios[i].addEventListener('click', () => {
                homepagebooks(banglabooks)
            })

        }
        if (attval === 'homepali') {
            radios[i].addEventListener('click', () => {
                homepagebooks(palibooks)
            })
        }
        if (attval === 'homeenglish') {
            radios[i].addEventListener('click', () => {
                homepagebooks(englishbooks)
            })
        }
        if (attval === 'appbengali') {
            radios[i].addEventListener('click', () => {
                languagechange(0)
            })
        }
        if (attval === 'appenglish') {
            radios[i].addEventListener('click', () => {
                languagechange(1)

            })
        }
    }
}
setsetting('applanguid', 'applangu')
setsetting('themeid', 'theme')
setsetting('wordid', 'word')
setsetting('pitakaid', 'pitaka')
setsetting('homepitakaid', 'homepitaka')
//console.log(window.localStorage.getItem('homepitakaid'))

function getsetting(key, query) {
    var radio = document.querySelectorAll(`.${query}`)
    var val = localStorage.getItem(`${key}`)
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].value == val) {
            radio[i].checked = true;
        }
    }

    var id = window.localStorage.getItem(`${key}`)
    if (id == "day-light") {
        // console.log('day-light')
        localStorage.removeItem(`${id}`)
    }
    if (id == "night") {
        themefun(themename.night, txtcolor.night, themename.night_lite, txtcolor.night_lite)
    }
    if (id == 'chocolate') {

        themefun(themename.chocolate, txtcolor.default, themename.chocolate_lite, txtcolor.default)
    }
    if (id == 'orange') {
        themefun(themename.orange, txtcolor.default, themename.orange_lite, txtcolor.default)
    }
    if (id == 'teal') {
        themefun(themename.teal, txtcolor.default, themename.teal_lite, txtcolor.default)
    }
    if (id == 'brown') {
        themefun(themename.brown, txtcolor.default, themename.brown_lite, txtcolor.default)
    }

    if (id == "show") {
        isShow = true
    }
    if (id == "none") {
        isShow = false
    }
    if (id == "pali") {
        //console.log('pali')
        document.querySelectorAll('.language')[0].classList.add('languActive')
        document.getElementById('palibooks').style.display = "block"
    }
    if (id == "bengali") {
        //console.log('bengali')
        document.querySelectorAll('.languActive')[0].setAttribute('class', 'language')
        document.querySelectorAll('.language')[1].classList.add('languActive')
        document.getElementById('banglabooks').style.display = "block"


    }
    if (id == "english") {
        //console.log('english')
        document.querySelectorAll('.languActive')[0].setAttribute('class', 'language')
        document.querySelectorAll('.language')[2].classList.add('languActive')
        document.getElementById('englishbooks').style.display = "block"
    }


}
getsetting('applanguid', 'applangu')
getsetting('themeid', 'theme')
getsetting('wordid', 'word')
getsetting('pitakaid', 'pitaka')
getsetting('homepitakaid', 'homepitaka')


var save = document.getElementById('save')
save.addEventListener('click', () => {
    var fontval = document.getElementById('font').value

    if (fontval <= 30 && fontval >= 10) {
        localStorage.setItem('fontid', fontval)
        var body = document.querySelector('body')
        body.style.fontSize = `${fontval}px`
    } else {
        alert('Font size range is mim=10px to max=30px require.')
    }
})

const getfontsize = () => {
    var ls = window.localStorage.getItem('fontid')
    var fontinput = document.getElementById('font')
    fontinput.setAttribute('value', `${ls}`)
    if (ls === null || undefined || '') {
        fontinput.setAttribute('value', '16')
    }
    document.querySelector('body').style.fontSize = ls + "px"
}
getfontsize()

var defaultfont = document.getElementById('defaultfont')
defaultfont.addEventListener('click', () => {
    localStorage.setItem('fontid', '16')
    var body = document.querySelector('body')
    body.style.fontSize = `16px`
    var fontinput = document.getElementById('font')
    fontinput.setAttribute('value', '16')
})

var more = document.getElementById('more')
var morechild = more.querySelectorAll(".more_item")
var settingPanel = document.getElementById('settingPanel')
var searchPanel = document.getElementById('searchPanel')
for (var i = 0; i < morechild.length; i++) {
    var id = morechild[i].getAttribute('id')
    if (id === 'setting')
        morechild[i].addEventListener('click', () => {
            settingPanel.style.display = 'block'
        })
    if (id === 'dictionary')
        morechild[i].addEventListener('click', () => {
            android.dictionary()
            // window.open("./dictionarynew.html");
            // console.log( window.innerHeight)
            // var height = 250;
            // var width = 550;
            // var top = window.innerHeight - height;
            // var left = window.innerHeight - width;
            // window.open(
            //   './dictionarynew.html',
            //   '_blank',
            //   'location=yes,height=' + height + ',width=' + width + ',top=' + top + ',left=' + left + ',scrollbars=yes,status=yes'
            // );
            //window.open(`./dictionarynew.html`, '_blank', "left=550, toolbar=no, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=600")
        })
    if (id === 'tpsearch')
        morechild[i].addEventListener('click', () => {
            searchPanel.style.display = 'block'
        })
    if (id === 'bookmark')
        morechild[i].addEventListener('click', () => {
            alert('bookmark Coming soon!')
        })
    if (id === 'note')
        morechild[i].addEventListener('click', () => {
            alert('note Coming soon!')
        })
    if (id === 'help')
        morechild[i].addEventListener('click', () => {
            android.help();
        })
    if (id === 'update')
        morechild[i].addEventListener('click', () => {
            android.updateapp();

        })
    if (id === 'share')
        morechild[i].addEventListener('click', () => {
            android.share();
        })
    if (id === 'rate')
        morechild[i].addEventListener('click', () => {
            android.rate();
        })
    if (id === 'ourapp')
        morechild[i].addEventListener('click', () => {
            android.ourapp();
        })
    if (id === 'notification')
        morechild[i].addEventListener('click', () => {
            android.notification();
        })
    if (id === 'about')
        morechild[i].addEventListener('click', () => {
            android.about();
        })
}

var setback = document.querySelectorAll('#setback')

for (var i = 0; i < setback.length; i++) {
    setback[i].addEventListener('click', () => {
        settingPanel.style.display = 'none'
        searchPanel.style.display = 'none'
        sidebar.style.display = 'none'

    })
}


function fnote(id) {
    var footnote = document.querySelectorAll('.ftn')
    var notetxt = document.querySelectorAll('.notetxt')
    var notehead = document.querySelectorAll('.notehead')
    var targetid = document.getElementById(`${id}`)
    for (var i = 0; i < notehead.length; i++) {
        notehead[i].remove()
    }
    for (var i = 0; i < footnote.length; i++) {
        footnote[i].style.display = "none"
    }
    targetid.insertAdjacentHTML("afterbegin", `<p class="notehead"> টীকা <span onclick="noteclose()" ><i id="noteclose" class="material-icons">close</i></span></p>`)
    targetid.style.display = "block"

}
function noteclose() {
    var footnote = document.querySelectorAll('.ftn')
    for (var i = 0; i < footnote.length; i++) {
        footnote[i].style.display = "none"
    }
}


let toggledicpanel = false;
const toggledic = () => {
    if (toggledicpanel) {
        var dicpanel = document.getElementById('dicPanel')
        dicpanel.style.display = 'none'
    } else {
        var dicpanel = document.getElementById('dicPanel')
        dicpanel.style.display = 'block'

    }
    toggledicpanel = !toggledicpanel;
}

//loaddata.addEventListener('dblclick', toggledic, false);

//From Tipitaka activity on distoryed
function back() {
    dictionarydataclear()

}
function dictionarydataclear() {
    window.localStorage.removeItem('savedata')
    window.localStorage.removeItem('saveState')
}


let getbook = []
const getbookfun = (query) => {
    for (let i = 0; i < query.length; i++) {
        if (query[i].getAttribute('onclick')) {
            getbook.push(query[i].getAttribute('onclick'))
        }
    }
    //console.log(getbook.join(', '))
}


var elb = document.querySelectorAll('.pitakaName, li')

function make(el, cb) {
    var elarr = []
    for (var i = 0; i < el.length; i++) {
        var ar = el[i].textContent.split(' ')
        //var t = cb()
        ar.splice(0, 3)
        elarr.push(ar)
    }
    //console.log(elarr)
    window.localStorage.setItem('book', JSON.stringify(elarr))
    return elarr;
}


var searchOption = 'all'
var option = document.querySelectorAll('.option')
option.forEach(function (el, i) {

    el.addEventListener('click', function () {
        option.forEach(function (el) {
            el.checked = false;
            
        })
        el.checked = true;
        itemShow(el.value)
        optionTopHide()
    })
})

function itemShow(value) {
    document.querySelectorAll('.selectionItem').forEach(function (el) {
        el.style.display = 'none'
    })
    document.getElementById(value).style.display = 'flex'
    
    searchOption = value
    console.log(searchOption)
}


var allpitakaoption = document.querySelectorAll('.allpitakaoption')

// allpitakaoption.forEach(function (el, i) {
//     el.addEventListener('click', function () {
//         console.log(el.selected)
//     })
    
// })
var allpitaka = document.querySelectorAll('.allpitaka')
var select = document.querySelector('select')


const allpitakaSelection = {
    
    'pali': {
        'mula': true,
        'atth': true,
        'thika': true,
        'anno': true,
    },
    'bd': {
        'mulabn': true,
        'atthbn': true,
        'thikabn': false,
        'otherbn': true,
    },
    'en': {
        'mulaen': true,
        'atthen': false,
        'thikaen': false,
        'otheren': false
       
    }
}

function setPitakaItem(event) {
    var key = event.target.id
    var checked = event.target.checked
    
    allpitakaSelection[allpitakaSelectionKey][key] = checked;
}

let allpitakaSelectionKey = 'pali'
function allpitakaDiv(context, value) {
    allpitaka.forEach(function (el) {
        el.style.display = "none"
    })
    var val = value
    if (val.includes('pali')) {
        document.getElementById('_'+val).style.display = 'block'
    } else {
        document.getElementById(val).style.display = 'block'
    }
    allpitakaSelectionKey = val;
    
}

var nikayadiv = document.getElementById('nikayadiv')
function optionTopHide() {
    var slt = nikayadiv.querySelectorAll('select')
    slt.forEach(function (el) {
        el.querySelectorAll('option').forEach(function (el) {
            if (el.value == '') {
                el.style.display = 'none'
            }
        })
    })
}
function nikayaOne(context, startkey) {

    var selectnikayaone = document.getElementById('selectnikayaone')
    var current
    var slt = nikayadiv.querySelectorAll('select')
    slt.forEach(function (el) {
        var opt = el.querySelectorAll('option')
        //console.log(opt)
            opt.forEach(function (el, i) {
                
               
                if (el.value == startkey) {
                    
                if (startkey !== '') {
                    selectnikayaone.innerHTML = el.textContent
                    selectnikayaone.setAttribute('select', startkey)
                    current = startkey
                    el.setAttribute('selected', '')
                   
                        removeBeforeSelected(current)
                    
                } 
            }
            
            
        })
    })

   
    function removeBeforeSelected(current) {
        //console.log(current)
        slt.forEach(function (el) {
            var opt = el.querySelectorAll('option')
            
            opt.forEach(function (el, i) {


                if (i == 0) {
                    //console.log(el)
                    el.setAttribute('selected', '')
                    //el.style.display = 'block'
                } else {
                    if (el.value !== current) {
                        el.removeAttribute('selected')
                       // console.log(el)
                    }
                }
            })
        })
    }

    var temp = nikayadiv.innerHTML
    nikayadiv.innerHTML = ''
    nikayadiv.innerHTML = temp
   
}

var bookDiv = document.getElementById('bookDiv')
var oneBook = {}
function setBookSearch() {
    var key = Object.keys(bookMeta)
    var bookCollection = []
    for (var i = 0; i < key.length; i++){
        bookCollection.push(`<input type="checkbox" id="${key[i]}">${bookMeta[key[i]].bookName}<br>`)
    }
    bookDiv.innerHTML = bookCollection.join('')
    key = []
    bookCollection = [];
}
setBookSearch();

bookDiv.onclick = bookOne;
function bookOne(event) {
    //console.log(event.target.checked)
    var key = event.target.id
    if (event.target.checked) {
        oneBook[key] = true;
    } else {
        delete oneBook[key];
    }
    
    
    console.log(oneBook)
}

