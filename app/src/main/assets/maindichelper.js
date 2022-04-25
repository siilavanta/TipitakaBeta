

function setMainDicView(dicName, listHolder, data, funName) {
    var listHolder = document.getElementById(`${listHolder}`)
    listHolder.style.display = 'block'

    var pakage = []
    if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
            var eachWord = data[i].split('||')
            // console.log(eachWord[0])
            var word = eachWord[0]
            var mean = eachWord[1]
            var id = eachWord[2]

            pakage.push(makeElement('li', {
                class: 'wordlist',
                onclick: `${funName}(${id}, '${funName + id}')`,
                innerHTML: `${word}`
            }).outerHTML)
        }
        console.log(listHolder)
        listHolder.innerHTML = pakage.join('')
    } else if (data.length == 0) {
       // document.getElementById(`${ditails}`).innerHTML = query + ' : Not Found'
    }


}