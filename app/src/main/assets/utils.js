var bToe = {
    "০": 0,
    "১": 1,
    "২": 2,
    "৩": 3,
    "৪": 4,
    "৫": 5,
    "৬": 6,
    "৭": 7,
    "৮": 8,
    "৯": 9
}
var eToB = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯"
}

function numberReplace(option, txtNum) {

    var replaceNumber = [];
    for (var i = 0; i < txtNum.length; ++i) {
        if (option.hasOwnProperty(txtNum[i])) {
            replaceNumber.push(option[txtNum[i]]);
        } else {
            replaceNumber.push(txtNum[i]);
        }
    }

    //console.log(replaceNumber)
    return replaceNumber.join('')
}