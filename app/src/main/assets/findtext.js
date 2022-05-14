function getLanguage(fileName) {

    var language = 'pali'
    if (fileName.includes('mulabn')) {
        language = 'bd'
    } else if (fileName.includes('mulaen')) {
        language = 'en'
    } else if (fileName.includes('otherbn')) {
        language = 'bd'
    } else if (fileName.includes('atthbn')) {
        language = 'bd'
    }
    return language;
}

var bookKeyName = Object.keys(bookMeta)

function getPitaka(pitakaName, key, callback) {
    var arr = []
    // key is like this key[0] = ['mula', true]
    //console.log(pitakaName)
    //console.log(key)
    if (key.length !== 0) {
        for (var i = 0; i < bookKeyName.length; i++) {
            var ln = getLanguage(bookKeyName[i])
            if (ln == pitakaName) {
                if (key[0][0] == 'mula' && (key[0][1] == true)) {
                    //console.log('mula')
                    if (bookKeyName[i].includes(key[0][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[1][0] == 'atth' && (key[1][1] == true)) {
                    if (bookKeyName[i].includes(key[1][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[2][0] == 'thika' && (key[2][1] == true)) {
                    if (bookKeyName[i].includes(key[2][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[3][0] == 'anno' && (key[3][1] == true)) {

                    if (bookKeyName[i].includes(key[3][0])) {
                        arr.push(bookKeyName[i])
                    }
                }

                // bangla
                if (key[0][0] == 'mulabn' && (key[0][1] == true)) {
                    //console.log('mula')
                    if (bookKeyName[i].includes(key[0][0])) {
                        arr.push(bookKeyName[i])
                        console.log(arr)
                    }

                }
                if (key[1][0] == 'atthbn' && (key[1][1] == true)) {
                    if (bookKeyName[i].includes(key[1][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[2][0] == 'thikabn' && (key[2][1] == true)) {
                    if (bookKeyName[i].includes(key[2][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[3][0] == 'otherbn' && (key[3][1] == true)) {

                    if (bookKeyName[i].includes(key[3][0])) {
                        arr.push(bookKeyName[i])
                        console.log(arr)
                    }
                }

                // english
                if (key[0][0] == 'mulaen' && (key[0][1] == true)) {
                    //console.log('mula')
                    if (bookKeyName[i].includes(key[0][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[1][0] == 'atthen' && (key[1][1] == true)) {
                    if (bookKeyName[i].includes(key[1][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[2][0] == 'thikaen' && (key[2][1] == true)) {
                    if (bookKeyName[i].includes(key[2][0])) {
                        arr.push(bookKeyName[i])
                    }

                }
                if (key[3][0] == 'otheren' && (key[3][1] == true)) {

                    if (bookKeyName[i].includes(key[3][0])) {
                        arr.push(bookKeyName[i])
                    }
                }
                //
            }
        }
    }
    callback(arr)
    return arr
}

function getNikaya(nikaya) {
    var arr = []
    for (var i = 0; i < bookKeyName.length; i++) {
        if (bookKeyName[i].includes(nikaya)) {
            arr.push(bookKeyName[i])
        }
    }
    return arr;
}
var searchbtn = document.getElementById('searchbtn')
function stop() {
    android.findStop()
    searchbtn.setAttribute('onclick', 'search()')
    searchbtn.innerHTML = 'Search'
}

var searchAnyting = document.getElementById('searchAnyting')
searchAnyting.addEventListener('keydown', function (event) {
    var key = event.key
    if (key == 'Enter') {
        search()
        android.keyboardHideWeb()
    } else {
        //console.log(key)
    }
})

function search() {

    var searchAnyting = document.getElementById('searchAnyting')
    var query = searchAnyting.value
    //console.log(query)

    function config() {
        searchStart = new Date().getTime();
        window.sessionStorage['query'] = query;
        resultListContainer.innerHTML = '';
        searchPendding.innerHTML = '<img width="25px" height="25px" src="./loading.gif" alt="">'
        searchDone.innerHTML = "";
        itemIndex = 0;
        totalTime.innerHTML = ''
        found.innerHTML = ''
        searchbtn.setAttribute('onclick', 'stop()')
        searchbtn.innerHTML = 'Stop'
        seemore.innerHTML = ''

        hundred = 100;
        hundredCount = 0;
        isItemLast = false;
        isItemFirst100 = true;
    }
    // searchOption is global variable from app.js
    if (query !== '') {
        

        switch (searchOption) {
            case 'all':
                var all = Object.entries(allpitakaSelection[allpitakaSelectionKey])
                var booklang = all
                if (allpitakaSelectionKey == 'pali') {
                    getPitaka(allpitakaSelectionKey, booklang, function (arr) {
                        if (arr.length !== 0) {
                            // console.log(arr)
                            setTimeout(function () {
                                android.fndText(arr, query)
                                config();
                            }, 100)
                        } else {
                            alert('At least select one')
                        }
                    })

                } else if (allpitakaSelectionKey == 'bd') {
                    getPitaka(allpitakaSelectionKey, booklang, function (arr) {
                        if (arr.length !== 0) {
                            // console.log(arr)
                            setTimeout(function () {
                                android.fndText(arr, query)
                                config();
                            }, 100)
                        } else {
                            alert('At least select one')
                        }
                    })

                } else if (allpitakaSelectionKey == 'en') {
                    getPitaka(allpitakaSelectionKey, booklang, function (arr) {
                        if (arr.length !== 0) {
                            // console.log(arr)
                            setTimeout(function () {
                                android.fndText(arr, query)
                                config();
                            }, 100)
                        } else {
                            alert('At least select one')
                        }
                    })

                }



                break;
            case 'nikaya':
                var selectnikayaone = document.getElementById('selectnikayaone')
                var nikaya = selectnikayaone.getAttribute('select')
                if (nikaya !== null) {
                   // console.log(nikaya)
                    var nikayaCollection = getNikaya(nikaya)
                    // console.log(nikayaCollection)
                    try {
                        setTimeout(function () {
                            android.fndText(nikayaCollection, query)
                            config();
                        }, 100)
                    } catch (error) {

                    }
                } else {
                    alert('At least select one nikaya')
                }

                break;
            case 'book':
                // console.log(oneBook)
                var oneBooks = Object.keys(oneBook)

                var selectedBook = Object.values(oneBook)

                if (selectedBook.length !=0) {
                    android.fndText(oneBooks, query)
                    config();
                } else {
                    alert('At least select one')
                }
                break;

            default:
                break;
        }
    } else {
        alert('Please type what you want searching')
    }
}

// searching result global Fields
var resultListContainer = document.getElementById('resultListContainer')
var resultList;
var count = 0;
var searchStatus = document.getElementById('searchStatus');
var found = document.getElementById('found');
var totalTime = document.getElementById('totalTime');
var searchPendding = document.getElementById('searchPendding');
var searchDone = document.getElementById('searchDone');

var searchStart;
var searchTotalTime;
var searchEndTime;
var itemIndex = 0;
var seemorebtn = document.getElementById('seemorebtn');
var seemore = document.getElementById('seemore');
var hundred = 100;
var hundredCount = 0;
var isItemLast = false;
var isItemFirst100 = true;

// 
function searchFinished() {
    searchEndTime = new Date().getTime();
    searchTotalTime = searchEndTime - searchStart;
    totalTime.innerHTML = ' (' + (searchTotalTime / 1000) + "seconds)"
    searchDone.innerHTML = "Searching Done!";
    searchPendding.innerHTML = ''

    found.innerHTML = "Found : " + itemIndex;

    if (itemIndex < 200) {
        resultListContainer.querySelectorAll('p').forEach(function (el) {
            el.className = 'ss';
        })
    }
    count = 0;
    itemIndex = 0;
    searchbtn.setAttribute('onclick', 'search()');
    searchbtn.innerHTML = 'Search';
    isItemLast = true;


}
// function ready() {

//     resultListContainer.querySelectorAll('p').forEach(function (el) {
//         el.onclick = go;
//     })
// }

resultListContainer.onclick = gotodirect;
function gotodirect(event) {
    var key = event.target.getAttribute('go');
    key == null ? key = event.path[1].getAttribute('go') : key = key;
    //console.log(key)
    key = key.split(',')
    // console.log(typeof key)
    var keyObj = {
        filename: key[0],
        rowIndex: key[1],
        chapnum: new Number(key[2])+1,
        itemIndexSub: key[3]
    }
    var { filename, chapnum, rowIndex, itemIndexSub} = keyObj
   // console.log( " iiiiii" + rowIndex)
    try {
        //android.toast(JSON.stringify(keyObj))
       
         searchPanel.style.display = 'none'
        morehide()
        outclick.style.display = 'block'
        // window.history.back()
        book(event, filename)
        //direct call chapter
        var query = window.sessionStorage['query']
        //console.log(query)
        
        setTimeout(function () {
            android.openChapterforSearch(filename, chapnum, "ss"+itemIndexSub, rowIndex)
        }, 100)
       // showChapter(event, [key], 'search')
    } catch (error) {
        
    }

}

function searchData(tableName, rowIndex, chaptxt, paranum, chapnum, query) {
    //console.log([tableName, i, paranum, chapnum, chaptxt])


    chapnum == 0 ? chapnum = chapnum : chapnum = chapnum - 1
    chaptxt = makeElement('div', {
        innerHTML: chaptxt
    }).textContent

    // console.log(rowIndex)
    function splitLine(str, posIndex, bookName, paraNum, itemIndexSub) {
        /**
         *  query matchs position is @posIndex
         */
        var resultText;
        var preIn;
        var nxtIn;
        var isFirstShort;
        var isLastSort;
        const isTextLengthShort = (str.length < 130);

        if (isTextLengthShort) {
            resultText = str
            // console.log('string long too short'+ isTextLengthShort)
        } else {
            // console.log(str.length)
            //console.log("position index is " + posIndex)
            nxtIn = posIndex + 60;
            preIn = posIndex - 50;
            resultText = str.substring(preIn, nxtIn)


            /**
             * checking  @query is includes in @resultText as a first word?
             * checking  @query is includes in @resultText as a last word?
             *
             */
            var isFirst = resultText.startsWith(query)
            var isLast = resultText.endsWith(query)

            var firstIndex = resultText.indexOf(" ")
            var lastIndex = resultText.lastIndexOf(" ")

            isFirstShort = (preIn <= 0);
            isLastSort = (nxtIn >= str.length);

            if (isFirst || isLast) {
                if (isFirst) {
                    resultText = resultText.substring(0, lastIndex)

                } else if (isLast) {
                    resultText = resultText.substring(firstIndex + 1, resultText.length)
                }

            } else if (isFirstShort) {
                resultText = resultText.substring(0, lastIndex)
            } else if (isLastSort) {

                resultText = resultText.substring(firstIndex + 1, str.length)
            } else {
                resultText = resultText.substring(firstIndex + 1, lastIndex)
            }
        }

        if (str.includes(query)) {


            itemIndex = ++itemIndex
            if (itemIndex <= 100) {

                resultListContainer.insertAdjacentHTML('beforeend', `
                <p class="ss" go="${tableName},${rowIndex},${chapnum},${itemIndexSub}">
                <b> ${itemIndex}. ${bookName}/${bookMeta[tableName].chapter[chapnum]} :</b> 
                ${resultText.replace(query, `<mark>${query}</mark>`)} (${paraNum})</p>`)
            } else {
                resultListContainer.insertAdjacentHTML('beforeend', `
                <p class="sh" go="${tableName},${rowIndex},${chapnum},${itemIndexSub}">
                <b> ${itemIndex}.${bookName}/${bookMeta[tableName].chapter[chapnum]} :</b>
                ${resultText.replace(query, `<mark>${query}</mark>`)} (${paraNum})</p>`)
            }

            if (itemIndex == hundred) {
                if (itemIndex == 100) {
                    var temphundred = hundred + ", 'first'"
                }
                seemore.insertAdjacentHTML('beforeend', makeElement('span', {
                    onclick: `moreFn(${isItemFirst100 ? temphundred + ", event" : hundred + ", event"})`,
                    innerHTML: hundredCount,
                    class: 'stack'
                }).outerHTML)


                hundredCount++
                hundred = hundred + 100
                isItemFirst100 = false;
            }
        }
    }


    function findIndex(query, paraString, bookName, paraNum) {
        var indices = [];
        var posIndex = paraString.indexOf(query);
        var itemIndexSub = 0;
        while (posIndex != -1) {
            // indices.push(posIndex);
            splitLine(paraString, posIndex, bookName, paraNum, itemIndexSub)
            posIndex = paraString.indexOf(query, posIndex + 1);
            itemIndexSub++
        }
        // console.log(indices)

        return indices
    }

    findIndex(query, chaptxt, bookMeta[tableName].bookName, paranum)

    count++;
    //console.log(count)
}


// for (var i = 0; i < 1003; i++) {
//     (function (i) {
//         setTimeout(function () {
//             if (i == 1042) {
//                 // isItemLast = true;
//             }
//             searchData("mula_1_1", i, "1. সাধু ১. তেন সমযেন বুদ্ধো ভগৰা ৰেরঞ্জাযং ৰিহরতি নল়েরুপুচিমন্দমূলে মহতা ভিক্খুসঙ্ঘেন সদ্ধিং পঞ্চমত্তেহি ভিক্খুসতেহি। অস্সোসি খো সাধু ৰেরঞ্জো ব্রাহ্মণো – ‘‘সমণো খলু, ভো, গোতমো সক্যপুত্তো সক্যকুলা পব্বজিতো ৰেরঞ্জাযং ৰিহরতি নল়েরুপুচিমন্দমূলে মহতা ভিক্খুসঙ্ঘেন সদ্ধিং পঞ্চমত্তেহি ভিক্খুসতেহি। তং খো পন ভৰন্তং গোতমং এৰং কল্যাণো কিত্তিসদ্দো অব্ভুগ্গতো – সাধু ‘ইতিপি সো ভগৰা অরহং সম্মাসম্বুদ্ধো ৰিজ্জাচরণসম্পন্নো সুগতো লোকৰিদূ অনুত্তরো পুরিসদম্মসারথি সত্থা দেৰমনুস্সানং বুদ্ধো ভগৰা [ভগৰাতি (স্যা॰), দী॰ নি॰ ১.১৫৭, অব্ভুগ্গতাকারেন পন সমেতি]। সো ইমং লোকং সদেৰকং সমারকং সব্রহ্মকং সাধু সস্সমণব্রাহ্মণিং পজং সদেৰমনুস্সং সযং অভিঞ্ঞা সচ্ছিকত্বা পৰেদেতি। সো ধম্মং দেসেতি আদিকল্যাণং মজ্ঝেকল্যাণং পরিযোসানকল্যাণং সাত্থং সব্যঞ্জনং; কেৰলপরিপুণ্ণং পরিসুদ্ধং ব্রহ্মচরিযং পকাসেতি;  খো পন তথারূপানং সাধু অরহতং দস্সনং হোতী’’’তি।", 11, 2, 'সাধু')
//         }, i * 1)
//     })(i)
// }



function t(tableName, rowIndex, chapnum, itemIndexSub) {
    console.log('bookname : ' + tableName + ', row id: ' + rowIndex + ', chap id: ' + chapnum + 'itemIndexSub id: ' + itemIndexSub)
}

function moreFn(target) {
    var args = arguments
    //console.log(args)
    var plist = resultListContainer.querySelectorAll('p')
    var showStart = target - 101;
    var uqId = 'id' + (showStart);
    plist[showStart + 1].id = uqId

    var first = plist[0] = 'id' + 0;
    if (args[1] == 'first') {
        itemTop(first)
    }

    function stockShow(showStart, target) {
        for (var i = (showStart); i < target; i++) {
            //console.log(i)
            var opt = arguments
            var indxt = i;
            opt[2] == 'last' ? indxt : indxt + 1;
            if (plist[i + 1].getAttribute('class') == 'ss') {
                itemTop(uqId)
                break;
            } else {
                plist[i].className = 'ss'
                if (i == (target - 1)) {
                    itemTop(uqId)
                }
            }

        }
    }
    stockShow(showStart, target)

    function stockShowlast(showStart, target) {
        for (var i = (showStart); i < target; i++) {
            //console.log(i)
            var opt = arguments
            var indxt = i;
            opt[2] == 'last' ? indxt : indxt + 1;
            if (plist[i].getAttribute('class') == 'ss') {
                itemTop(uqId)
                break;
            } else {
                plist[i].className = 'ss'
                if (i == (target - 1)) {
                    itemTop(uqId)
                }
            }

        }
    }

    seemore.addEventListener('click', function (event) {
        if (seemore.lastChild.textContent == event.target.textContent) {
            //console.log(event.target.textContent)
            stockShowlast(target, plist.length, 'last')

        }
    })



}

function itemTop(allquery) {
    setTimeout(() => {
        var clickTop = document.querySelector(`#${allquery}`)
        clickTop.scrollIntoView(true);
        // clickTop.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        window.scrollBy(0, -70)
        // document.querySelector('#outClick').style.display = "none"
    }, 50)
}