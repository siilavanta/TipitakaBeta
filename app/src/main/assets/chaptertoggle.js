//toggle chapter[]


function chapteropen(event, clasname) {
    var chapter = document.querySelectorAll('.chapter')
    var i, chapterName;
    //document.getElementById('loadermain').style.display = "flex"
    chapterName = chapter
    for (i = 0; i < chapterName.length; i++) {
        //chapterName[i].className = chapterName[i].className.replace(" 0active", "")
    }
    var chaptxt_content = document.querySelector(`.${clasname}`)
    chaptxt_content.classList.toggle('show')
    var parent = document.querySelector(`.${clasname}`)
    //var child_p = parent.querySelectorAll('P')
    var last = 0
    //   setTimeout(function () {
    //     if (child_p) {
    //       for (var i = 0; i < child_p.length; i++) {
    //         if (child_p[i].style.display = 'block') {
    //           last = child_p[i]
    //         }
    //       }
    //     }
    //     if (last) {
    //       //last.style.background = 'reddd';
    //       setTimeout(function () {
    //         document.getElementById('loadermain').style.display = "none"
    //       }, 200)
    //     }
    //   }, 50)
    //event.currentTarget.className += "0active";
}
//from table of content chapter open
function chapopen(clasname) {
    var chapter = document.querySelectorAll('.chapter')
    var tablemain = document.getElementById('table_main').style.display = 'none'
    var i, chapterName;
    //document.getElementById('loadermain').style.display = "flex"
    chapterName = chapter
    for (i = 0; i < chapterName.length; i++) {
        // chapterName[i].className = chapterName[i].className.replace(" active", "")
    }
    var chaptxt_content = document.querySelector(`.${clasname}`)
    chaptxt_content.classList.add('show')
    var parent = document.querySelector(`.${clasname}`)
    //var child_p = parent.querySelectorAll('P')
    var last = 0
    //   setTimeout(function () {
    //     if (child_p) {
    //       for (var i = 0; i < child_p.length; i++) {
    //         if (child_p[i].style.display = 'block') {
    //           last = child_p[i]
    //         }
    //       }
    //     }
    //     if (last) {
    //       // last.style.background = 'reddd';
    //       setTimeout(function () {
    //         document.getElementById('loadermain').style.display = "none"
    //       }, 200)
    //     }
    //   }, 50)
    //event.currentTarget.className += " 0active";
}

function subclick(allquery) {
    setTimeout(() => {
        var clickTop = document.querySelector(`.${allquery}`)
        clickTop.scrollIntoView(true);
       clickTop.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        window.scrollBy(0, -70)
        document.querySelector('#outClick').style.display = "none"
    }, 50)
}