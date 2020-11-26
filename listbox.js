// 工具函数
const log = console.log.bind(console)
const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)
const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        // log('classname', className, e)
        e.classList.remove(className)
    }
}
const appendHtml = function(element, html) {
    log(element)
    element.insertAdjacentHTML('beforeend', html)
}


// 点击元素高亮
const clickFunc1 = (self) => {
    removeClassAll('active')
    self.classList.toggle('active')
}

// 点击左按钮的元素，转移到右边
const clickFunc2 = (self, rightbox, leftbox) => {
    let a = rightbox.querySelector('.active')
    if (a !== null) {
        a.remove()
        let html = `<div class="li li-left active" data-action="li" data-position="left">${a.innerHTML}</div>`
        appendHtml(leftbox, html)
    }
}

// 点击右按钮的元素，转移到左边
const clickFunc3 = (self, rightbox, leftbox) => {
    let a = leftbox.querySelector('.active')
    if (a !== null) {
        a.remove()
        let html = `<div class="li li-right active" data-action="li" data-position="right">${a.innerHTML}</div>`
        appendHtml(rightbox, html)
    }
}

// 点击 OK 显示右边栏的 内容
const clickFunc4 = (self, rightbox, leftbox, textbox) => {
    textbox.innerHTML = ''
    for (let i = 0; i < rightbox.children.length; i++) {
        let cell = rightbox.children[i]
        let text = cell.innerHTML

        let index = data.findIndex(e => text === e.content)
        let textHtml = data[index][text]

        let html = `<div>${textHtml}</div>`
        appendHtml(textbox, html)
    }
}

// 双击左侧的元素，转移到右边
const dblclickFunc1 = (self, rightbox) => {
    let html = `<div class="li li-right active" data-action="li" data-position="right">${self.innerHTML}</div>`
    self.remove()
    appendHtml(rightbox, html)
}

// 双击右侧的元素，转移到右边
const dblclickFunc2 = (self, rightbox, leftbox) => {
    let html = `<div class="li li-left active" data-action="li" data-position="left">${self.innerHTML}</div>`
    self.remove()
    appendHtml(leftbox, html)
}

// 事件函数合集
const bindEvents = (box, leftbox, rightbox, textbox, menu1, menu2) => {
    box.addEventListener('click', (event) => {
        let self = event.target
        let action = self.dataset.action
        if (Object.keys(menu1).includes(action)) {
            // f 这个时候是一个函数
            let f = menu1[action]
            f(self, rightbox, leftbox, textbox)
        }
    })

    box.addEventListener('dblclick', (event) => {
        log('dblclick')
        let self = event.target
        let position = self.dataset.position
        if (Object.keys(menu2).includes(position)) {
            // f 这个时候是一个函数
            let f = menu2[position]
            f(self, rightbox, leftbox)
        }
    })

}

//初始化数据
const inthtml = () => {
    let div = e('.left-listbox')
    for (let i = 0; i < data.length; i++) {
        let d = data[i]
        let html = `<div class="li li-left" data-action="li" data-position="left">${d.content}</div>`
        appendHtml(div, html)
    }

}

// 提前绑定 DOM 元素 事件函数入口
const bindAll = () => {
    let box = e('.container')
    let leftbox = e('.left-listbox')
    let rightbox = e('.right-listbox')

    let textbox = e('.text-box')

    let menu1 = {
        'li': clickFunc1,
        'button-left': clickFunc2,
        'button-right': clickFunc3,
        'button-ok': clickFunc4,
    }

    let menu2 = {
        'left': dblclickFunc1,
        'right': dblclickFunc2,
    }

    bindEvents(box, leftbox, rightbox, textbox, menu1, menu2)
}

// 全局静态数据
let data = [
    {
        'A': 'This is Para A',
        content: 'A',
    },

    {
        'B': 'This is Para B',
        content: 'B',
    },

    {
        'C': 'This is Para C',
        content: 'C',
    },

    {
        'D': 'This is Para D',
        content: 'D',
    },
]

// 入口函数
const _main = () => {
    inthtml()
    bindAll()
}

_main()
