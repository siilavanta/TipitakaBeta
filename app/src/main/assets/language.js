const languagechange = (language) => {
    var set_title = document.getElementById('set-title')

    let setting_container = document.querySelector('#setting_container')
    let set_iemtxt = setting_container.querySelectorAll('.set_iemtxt')
    let sett_txt = setting_container.querySelectorAll('.sett_txt')

    var sTitle = [
        [`সেটিংস`, `Settings`]
    ]
    set_title.innerHTML = sTitle[0][language]
    
    const morebn = [
        [`সেটিংস`, `Settings`],
        [`অভিধান`, `Dictionary`],
        [`ত্রিপিটক সার্চ`, `Tipitaka Searach`],
        [`বুকমার্ক`, `Bookmark`],
        [`নোট সংগ্রহ`, `Note`],
        [`সাহায্য`, `Help`],
        [`আপডেইট অ্যাপ`, `Update App`],
        [`শেয়ার`, `Share`],
        [`রেটিং দিন`, `Rate`],
        [`আমাদের অ্যাপ সমূহ`, `Our Apps`],
        [`নোটিফিকেশন`, `Notification`],
        [`আমাদের সম্পর্কে`, `About`]

    ]
    const morebn_ic = [
        `&#xe8b8;`,
        `&#xe8e2;`,
        `&#xe8b6;`,
        `&#xe54e;`,
        `&#xe22b;`,
        `&#xe0c6;`,
        `&#xe923;`,
        `&#xe80d;`,
        `&#xe838;`,
        `&#xe8c9;`,
        `&#xe7f7;`,
        `&#xe88e;`
    ]

    for (let i = 0; i < morechild.length; i++) {
        morechild[i].innerHTML = `<i class="more_item_ic material-icons">${morebn_ic[i]}</i> ` + morebn[i][language]
        //console.log(morechild[i].textContent)
    }
    const settingbn = [
        [`ব্যবহারের ভাষা নির্ধারণ করুন`, `Select the language to use`],
        [`ফন্ট সাইজ পরিবর্তন করুন`, `Select the text font size`],
        [`পছন্দের থিম বাছাই করুন`, `Choice the theme one`],
        [`সিলেক্টেট শব্দের অর্থ পেতে চান ?`, `Show hitting the word meaning`],
        [`সাইডবারে ডিফল্ট ত্রিপিটক`, `Default sidebar Tipitaka`],
        [`হোম পাতায় ডিফল্ট ত্রিপিটক`, `Default home page Tipitaka`]

    ]


    const settingbntxt = [
        [`বাংলা`, `Bengali`],
        [`ইংরেজি`, `English`],
        [`পিক্সেল`, `Pixel`],
        [`সেইভ করুন`, `Save`],
        [`ডিফল্ট`, `Default`],
        [`ডিফল্ট`, `Default`],
        [`নাইট`, `Night`],
        [`চকোলেট`, `Chocolate`],
        [`কমলা`, `Orange`],
        [`টীল`, `Teal`],
        [`বাদামী`, `Brown`],
        [`হ্যাঁ`, `Yes`],
        [`না`, `No`],
        [`পালি`, `Pāli`],
        [`বাংলা`, `Bengali`],
        [`ইংরেজি`, `English`],
        [`পালি`, `Pāli`],
        [`বাংলা`, `Bengali`],
        [`ইংরেজি`, `English`]
    ]

    const singletxt = (element, newtxt) => {
        for (let i = 0; i < element.length; i++) {
            element[i].innerHTML = newtxt[i][language]
        }
    }
    singletxt(set_iemtxt, settingbn)
    singletxt(sett_txt, settingbntxt)
    

}

var language = window.localStorage.getItem('applanguid')
if (language === 'appbengali') {
    languagechange(0)
}
if (language === 'appenglish') {
    languagechange(1)
}

// dictionary language setting

const dicLangguage = ()=>{

}

