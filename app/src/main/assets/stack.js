

//spreed oparator 
function bar(a, c, ...b) {
   // console.log(a, c, b)
    
}

bar(1, 2, 4, 5, 6)

function Stack() {
    this.stackContent = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.getTop = pop;
    this.remove = remove;
}
function push(elem) {
    this.stackContent[this.top++] = elem;
}
function pop() {
    return this.stackContent[--this.top];
}
function getTop() {
    return this.stackContent[this.top - 1];
}

function remove() {
    console.log(arguments[0])
    this.top--
    delete this.stackContent[this.top]
    this.stackContent.length--
}
var stack = new Stack()
// stack.push({
//     oldUrl: 'https://sdmisdf/sdmcd/',
//     path: 'page1'
// })

// stack.push({
//     oldUrl: 'https://sdmisdf/sdmcd/page1',
//     path: 'page2'
// })

