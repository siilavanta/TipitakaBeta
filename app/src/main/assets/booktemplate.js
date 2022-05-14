function setBookTemplate(bookNameKey, data) {

    var { id, chaptxt: item, chapnum, titlenum, subheadnum, isLast } = data;
    item = item.replace(/<div class="chaptxt">/gi, '')
    item = item.replace('</div>', '')

    /**
     * @temDiv = <div><p class="title">১০. পরিণতসিক্খাপদং</p></div>
     */
    var temDiv = makeElement('div', {
        innerHTML: item
    })

    if (isLast) {
        // alert('k')

        // dev.value = temDiv.outerHTML
    }

    item = temDiv.children[0].outerHTML //.setAttribute('class', ``)


    var bookdata = document.getElementById('bookdata')
    if (item.includes('chapter')) {
        bookdata.insertAdjacentHTML('beforeend', item.replace('class="chapter"', `class="ch ch${chapnum}" 
        onclick="showChapter(event)"`) + makeElement('div', {
            id: "cht" + chapnum,
            class: 'chaptxt'
        }).outerHTML)

       
    }

    if (item.includes('chaphead')) {
        document.querySelector('.ch' + chapnum).insertAdjacentHTML('beforebegin', item)
    }
    // <div><p class="chaphead">১. পারাজিককণ্ডং</p></div>
    // <div><p class="chaphead">২. সঙ্ঘাদিসেসকণ্ডং</p></div>
    // <div><p class="chaphead">৩. অনিযতকণ্ডং</p></div>
    // <div><p class="chaphead">৪. নিস্সগ্গিযকণ্ডং</p></div>



    if (item.includes('chaphead')) {
        //dev.value = dev.value + "\n" + temDiv.outerHTML
    }

    item = item.replace('class="chapter"', 'class="ch_c"')
    item = item.replace('class="title"', 'class="tl_c"')
    item = item.replace('class="subhead"', 'class="sh_c"')

    var stringToArray = item.split('|')
    //document.getElementById('tem').value = stringToArray.join('\n');
    //console.log(item)


    //  console.log(newItem)
    var newItem = replaceFn(item, chapnum, titlenum, subheadnum)

    if (item.includes('chaphead')) {
        // for chaphead 
        var tempLastChild = document.getElementById('table_of_content').lastChild
        tempLastChild.insertAdjacentHTML('beforebegin', newItem)
    } else {
        document.getElementById('table_of_content').insertAdjacentHTML('beforeend', newItem)
    }
    if (isLast) {
       // dev.value = loaddata.outerHTML
    }
}
function replaceFn(str, chapnum, titlenum, subheadnum) {
    if (str.includes("ch_")) {
        str = str.replace('_c', '_c ' + chapnum)
        str = getTxt(str)
    } else if (str.includes("tl_")) {
        str = str.replace('_c', '_c ' + split(titlenum))
        str = getTxt(str)
    } else if (str.includes("sh_")) {
        str = str.replace('_c', '_c ' + split(subheadnum))
        str = getTxt(str)
    }
    function split(str) {
        str = str.split('_')
        return str.join(' ')
    }

   

    function getTxt(str) {
        var onlyTxt = makeElement('div', {
            innerHTML: str
        })
        //console.log(onlyTxt.children[0].textContent)
        var text = onlyTxt.children[0].textContent
        onlyTxt.children[0].innerHTML = text
        return onlyTxt.children[0].outerHTML
    }

    return str;

}

function chapterOpen(id) {
    android.toast(id)
}



function showChapter(event) {
    //console.log(event.target.className)
    // android.toast(event.target.className)
    var clasName = event.target.className;
    var sEvent = arguments[0]
    var sClass = arguments[1]
    var sTag = arguments[2]

    var clasNames = clasName.split(' ')
    var clasNamesLength = clasNames.length;
    clasNames = {
        class1: clasNames[0],
        chapterKey: clasNames[1],
        titleKey: clasNames[2],
        subheadKey: clasNames[3]
    }
    //android.toast()


    var parent = event.path[1].id;
    // if (clasNames.class1 == 'ss') {
    //     // for search item click event handaler
    //     parent == null ? parent = event.path[2].id : parent = event.path[1].id
    // }

    var chapterid = clasNames.chapterKey.replace('ch', '');
    switch (parent) {
        case 'bookdata':

            var chaptxtdiv = document.getElementById('cht' + chapterid)
            if (chaptxtdiv.innerHTML == '') {
                var topkey = goToTop(clasNamesLength, clasNames)
                android.openChapter(tipiEvent.tipi.currentBookKey, chapterid, topkey)
            } else if (chaptxtdiv.style.display == 'block') {
                chaptxtdiv.innerHTML = ''
                chaptxtdiv.style.display = 'none'
                //android.toast('already opened')
            } else if (chaptxtdiv.style.display == 'none') {
                var topkey = goToTop(clasNamesLength, clasNames)
                android.openChapter(tipiEvent.tipi.currentBookKey, chapterid, topkey)
            }
            break;
        case 'table_of_content':
            var chaptxtdiv = document.getElementById('cht' + chapterid)
            if (chaptxtdiv.innerHTML == '') {
                var topkey = goToTop(clasNamesLength, clasNames)
                android.openChapter(tipiEvent.tipi.currentBookKey, chapterid, topkey)
            } else if (chaptxtdiv.style.display == 'block') {
                goToTop(clasNamesLength, clasNames)
                //android.toast('already opened')
            } else if (chaptxtdiv.style.display == 'none') {
                var topkey = goToTop(clasNamesLength, clasNames)
                android.openChapter(tipiEvent.tipi.currentBookKey, chapterid, topkey)
            }
            break;



        default:
            break;
    }




}

function goToTop(classLength, classObj) {
    var { class1, chapterKey, titleKey, subheadKey } = classObj;
    var topKey;

    tableclick = false;
    switch (classLength) {
        case 2:
            topKey = "ch" + chapterKey

            try {
                clickToTop(topKey)
                document.getElementById('table_main').style.display = "none"

            } catch (error) {

            }
            return topKey
            break;
        case 3:
            topKey = "tl" + chapterKey + "_" + titleKey
            try {
                clickToTop(topKey)
                document.getElementById('table_main').style.display = "none"

            } catch (error) {

            }
            return topKey
            break;
        case 4:
            topKey = "sh" + chapterKey + "_" + titleKey + "_" + subheadKey
            try {
                clickToTop(topKey)
                document.getElementById('table_main').style.display = "none"

            } catch (error) {

            }
            return topKey
        default:
            break;
    }
}

function clickToTop(top) {


    setTimeout(() => {

        var clickTop = document.querySelector(`.${top}`)
        try {
            clickTop.scrollIntoView(true, {
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            });
            window.scrollBy(0, -70)
        } catch (error) {

        }
        document.querySelector('#outClick').style.display = "none"

    }, 50)
}

var ts = []

function setChapter(data, topKey) {
    //document.getElementById('tem').value = JSON.stringify(arguments[0])
    //var { chaptxt: item, chapnum, titlenum, subheadnum, isFirst, isLast } = arguments[0];
    document.getElementById('loadermain').style.display = "flex"


    //android.toast( "db f" + query)
    var id = data[0]
    var item = data[1]
    var paranum = data[2]
    var chapnum = data[3]
    var titlenum = data[4]
    var subheadnum = data[5]

    var isFirst = data[6]
    var isLast = data[7]
    item = item.replace(/<div class="chaptxt">/gi, '')
    item = item.replace('</div>', '')
    var chaptxtdiv = document.getElementById('cht' + chapnum)
    var canReplace = false;
    if (!isFirst) {


        if (item.includes(`"title"`)) {
            item = item.replace('"title"', '"title tl' + titlenum + '"')
            // ts.push(item)
        } else if (item.includes(`"subhead"`)) {
            item = item.replace('"subhead"', '"subhead sh' + subheadnum + '"')
            //ts.push(item)
        }
        // for searching item detating
        if (item.includes('<p')) {
            var rowIndex = arguments[2]

            if (id === rowIndex) {

                //console.log(rowIndex)
                item = markByQuery(item, rowIndex)
            } else {
                // item = item.replace('<p', `<p i="${id}"`)
            }

        }
        // item = item.replace('<p', `<p i="${id}"`)
        //console.log(arguments[2] + " = " + id)
        //console.log(topKey)
        //console.log(chapnum)

        chaptxtdiv.insertAdjacentHTML('beforeend', item)
        //  document.getElementById('tem').value = "arg: " + arguments[2] + ", id: " + id + "pa" + item;
        //  console.log(item)
    }
    if (isLast == true) {
        chaptxtdiv.style.display = 'block'

        setTimeout(function () {
            document.getElementById('loadermain').style.display = "none"
            console.log(chaptxtdiv.id)
            ftnRefSet(chaptxtdiv)
            
        }, 500)
        //console.log(isLast)
        //document.getElementById('tem').value = JSON.stringify(ts)
        clickToTop(topKey)
        chapheadControl(chaptxtdiv)
    }


    if (isLast) {
        //dev.value = loaddata.outerHTML
    }


}

function chapheadControl(parent) {
    var child = parent.querySelector('.chaphead')
    if (child) {
        //console.log(child)
        // parent.insertAdjacentHTML('beforebegin', child.outerHTML)
        child.remove()
    }
}

function ftnRefSet(parent) {
    var noteref = parent.querySelectorAll('.ftnRef')
    console.log(noteref[0])
    if (noteref) {
        // console.log("ref found")
        for (var i = 0; i < noteref.length; i++) {
            var ftnTextId = noteref[i].textContent
            ftnTextId = ftnTextId.replace(']', '')
            ftnTextId = ftnTextId.replace('[', '')
            ftnTextId = ftnTextId.replace('[', '')
            ftnTextId = ftnTextId.trim()
            ftnTextId = ftnTextId.trimEnd()
            noteref[i].setAttribute('onclick', `fnote("ftn${ftnTextId}")`)
        }
    } else {
        // console.log("no ref")
    }
}
// D / OpenGLRenderer: endAllActiveAnimators on 0x8bf74280(RippleDrawable) with handle 0x8d3c90d0
// I / Timeline: Timeline: Activity_launch_request time: 53972272
// I / Timeline: Timeline: Activity_launch_request time: 53972280
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
// I / OpenGLRenderer: Initialized EGL, version 1.4
// D / OpenGLRenderer: Swap behavior 2
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
// W / cr_ChildProcessConn: onServiceDisconnected(crash or killed by oom): pid = 5282
// V / ActivityThread: handleTrimMemory: org.kalpataruboi.siilavanta.tipitaka
//E/chromium: [ERROR:aw_browser_terminator.cc(125)] Renderer process (5282) crash detected (code -1).
//E/chromium: [ERROR:aw_browser_terminator.cc(90)] Render process (5282) kill (OOM or update) wasn't handed by all associated webviews, killing application.


function markByQuery(para, index) {
    var query = window.sessionStorage['query']
    var reg = new RegExp(query, 'gi')
    para = para.replace(reg, `<mark>${query}</mark>`)
    //para = para.replace('<p', `<p i="${index}"`)

    var divinpara = makeElement('div', {
        innerHTML: para
    })
    var mark = divinpara.querySelectorAll('mark')
    mark.forEach(function (el, i) {
        el.setAttribute('class', 'ss' + i)
    });
    // console.log(JSON.stringify(divinpara.outerHTML))
    //android.toast(JSON.stringify(divinpara.outerHTML))
    return divinpara.children[0].outerHTML;
}


// window.addEventListener('book', function (event) {
//     //console.log(event.detail.chaptxt)
//     // document.getElementById('list').insertAdjacentHTML('beforeend', event.detail.chaptxt)
//     // document.getElementById('tem').value = document.getElementById('tem').value + JSON.stringify(event.detail)
//     setBookTemplate('', event.detail, '')

// })
