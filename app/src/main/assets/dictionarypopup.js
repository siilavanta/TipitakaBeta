
dicclose.addEventListener('click', () => {
    dicpanel.style.display = 'none'
})

function getDicView() {
    dicpanel.style.display = 'block'
    
}

var tableclick = false
var bookdata = document.getElementById('bookdata')
 function popup(event) {
    //console.log(event.target.className)
    
     if (!event.target.className.includes('ch')) {
         if (!event.target.className.includes('ftnRef')) {

             if (localStorage['wordid'] == 'show') {
                 poppuView(event)
             } else if (localStorage['wordid'] == 'none') {
                 //android.toast('')
             } else {
                 poppuView(event)
                 localStorage['wordid'] = 'show'
             }
            
         }
       
    }//

    
}

var dicsName = [
    "cepd",
    "cped",
    "pbd",
    "ped",
    "ppd"
]
function poppuView() {
    var s = window.getSelection();
    s.modify('extend', 'backward', 'word');
    var backWardText = s.toString();

    s.modify('extend', 'forward', 'word');
    var forWardText = s.toString();

    s.modify('move', 'backward', 'word');
    var finalWord = backWardText + forWardText;

    finalWord = finalWord.trim()
    finalWord = finalWord.trimEnd()

    finalWord = finalWord.replace('।', '')
    finalWord = finalWord.replace(',', '')
    finalWord = finalWord.replace(']', '')
    finalWord = finalWord.replace('[', '')
    finalWord = finalWord.replace('(', '')
    finalWord = finalWord.replace(')', '')
    finalWord = finalWord.replace(';', '')
    finalWord = finalWord.replace(':', '')
    finalWord = finalWord.replace(':-', '')
    finalWord = finalWord.replace('—', '')
    finalWord = finalWord.replace('”', '')
    finalWord = finalWord.replace('“', '')
    finalWord = finalWord.replace('’', '')
    finalWord = finalWord.replace('‘', '')
    finalWord = finalWord.replace('?', '')
    finalWord = finalWord.replace('-', '')
    finalWord = finalWord.replace('{', '')
    finalWord = finalWord.replace('}', '')

   // console.log(finalWord)
    if (finalWord.includes(' ')) {
        finalWord = finalWord.split(' ')
        finalWord = finalWord[0]
    }

    // dic(finalWord)
    try {
        myClick({}, [finalWord])
        isNextOrPrev = false
    } catch (error) {
        
    }
    var dicPanel = document.getElementById('dicPanel')
    dicPanel.style.display = "block"
    var inputid = document.getElementById('inputid')
    inputid.value = finalWord
}

var inputid = document.getElementById('inputid')

function clickHandeler(fn, delay) {
    let timeoutId;
    return function () {
    
        var context = this;
        var arg = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout( function() {
            fn.apply(context, arg);
        }, delay)
    }
}
var myClick = clickHandeler(function (c, arg) {
    var val = arg[0]
    if (val != '') {
        // console.log(arg[0])
        try {
           
            android.getDicMeaning(val)
        } catch (error) {
            
        }
       
    }
}, 400)

inputid.addEventListener('input', function () {
    var val = document.getElementById('inputid')
    myClick({}, [val.value])
    isNextOrPrev = false
    
    
})

var historyControl = clickHandeler(function (c, arg) {
    var data = arg[0]
    var query = arg[1]

    
    
}, 500)




function setDicView(dicName, data, query) {
    //console.log(data)
    // getDic(cped, 'cped_count', 'cped_details', 'cped');
    // getDic(ped, 'palldic_count', 'palldic_details', 'ped');
    // getDic(cepd, 'ealldic_count', 'ealldic_details', 'E-all');
    // getDic(pbd, 'pbdic_count', 'pbdic_details', 'Pbd');


        switch (dicName) {
            case 'cepd':
                splitByVertical(data, 'ealldic_count', 'ealldic_details', 'E-all')
                break;
            case 'cped':
                splitByVertical(data, 'cped_count', 'cped_details', 'cped')

                break;
            case 'pbd':
                splitByVertical(data, 'pbdic_count', 'pbdic_details', 'Pbd')

                break;
            case 'ped':
                splitByVertical(data, 'palldic_count', 'palldic_details', 'ped')

                break;
            case 'ppd':
                splitByVertical(data, 'ppdic_count', 'ppdic_count', 'ppd')

                break;

            default:
                break;
        }
    
    if (!isNextOrPrev && (data.length !== 0)) {
        getPopHistory.push(query)
        console.log(JSON.stringify(getPopHistory.hisWord))
        isNextOrPrev = true;
        console.log("query" + query)
    }

    function splitByVertical(data, count, ditails, dicTitle) {
        document.getElementById(`${ditails}`).innerHTML = ''
        var pakage = []
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                var eachWord = data[i].split('||')
                // console.log(eachWord[0])
                var word = eachWord[0]
                var mean = eachWord[1]
                var id = eachWord[2]

                pakage.push(makeElement('p', {
                    class: 'mean',
                    innerHTML: `<b>${word} : </b><span>${mean}</span>`
                }).outerHTML)
            }
            
            document.getElementById(`${ditails}`).innerHTML = pakage.join('')
        } else if (data.length == 0) {
            document.getElementById(`${ditails}`).innerHTML = query + ' : Not Found'
        }

        
    }

    
}

var isNextOrPrev = false;

function popHistory() {
    this.hisWord = [];
    this.push = push;
    this.hasNext = hasNext;
    this.hasPrevius = hasPrevius;
    this.current = undefined;
    this.nextPos = 0;
    this.prevPos = 0;
}

function push(word) {
    
    //  this.current++;
    // same word prevent
    if (this.hisWord[this.hisWord.length - 1] !== word) {
        this.hisWord[this.hisWord.length] = word;
    }
    getPopHistory.hisWord.forEach(function (el, i) {
        if (el !== word) {

            
            
        } else {
            console.log("already  have " + el)
        }
    })
    
        this.nextPos = (this.hisWord.length - 1);
        this.prevPos = (this.hisWord.length - 2);
    

}

function hasNext() {

    var c = this.current = this.nextPos;
    if (c < (this.hisWord.length - 1)) {
        var nextWord = this.hisWord[++this.nextPos]
        console.log(nextWord)
        // console.log(this.current)
        isNextOrPrev = true;
        myClick({}, [nextWord])
        this.prevPos = this.nextPos - 1
    } else {
        console.log('not found in next')
        android.toast('No item in next')
    }

}
function hasPrevius() {

    var c = this.current = this.prevPos;
    if (c >= 0) {
        var prevWord = this.hisWord[this.prevPos--]
        console.log(prevWord)
        //console.log(this.current)
        isNextOrPrev = true;
        myClick({}, [prevWord])
        this.nextPos = this.prevPos + 1
    } else {
        console.log('not found in previous')
        android.toast('No item in previous')
    }


}

var getPopHistory = new popHistory()

// getPopHistory.push('one')
// getPopHistory.push('two')
// getPopHistory.push('three')