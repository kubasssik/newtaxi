import { $BUTTON } from "./index.js"
import { showWindowHelp } from "./index.js"
const $calendar = document.querySelector('.calendar')

const monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',]

//Полная дата//Дата между стрелками переключателя
function addFullDate(d = '') {
    for (let i = 0; i < monthName.length; i++) {
        $calendar.children[0].children[1].textContent = `${d} ${monthName[MM]} ${YY}`
    }
}

let date = new Date()//2023, 0, 1

let DD
let MM
let YY

//Получит дату раздельно
function getDateSeparately(date) {
    DD = date.getDate()//Получил день месяца от 1 до 28-31
    MM = date.getMonth()//Получил месяц от 0 до  11
    YY = date.getFullYear()//Получил год
}
getDateSeparately(date)

let curentDate = new Date().getMonth()
let curentYear = new Date().getFullYear()

function nextMonth(e) {
    let c = document.querySelectorAll('.calender__num')

    if (e.target.classList[0] === 'calendar__left') {
        c.forEach(el => el.remove())//Удаляет все ячейки с числами
        date = new Date(YY, MM - 1, DD)

        getDateSeparately(date)//Получит дату раздельно
        calendar(date)
        startDateTransfer()
    }

    if (e.target.classList[0] === 'calendar__right') {
        c.forEach(el => el.remove())//Удаляет все ячейки с числами
        date = new Date(YY, MM + 1, DD)

        getDateSeparately(date)//Получит дату раздельно
        calendar(date)
        startDateTransfer()
    }


    //Если месяц или год, не совпадает с текущим, удаляет выделение 
    if (date.getMonth() !== curentDate || date.getFullYear() !== curentYear) {
        const $d = document.querySelectorAll('.d')
        $d.forEach((e) => e.classList.remove('date'))//Удаляет выделиную дату

        addFullDate() //Полная дата, между стрелками - без числа
    }
}

//рисует календарь
function calendar() {
    const firstDayMonth = new Date(YY, MM, 1)//Получил число  первого дня текущего месяца
    const firstDay = firstDayMonth.getDay()//Получил день недели  первого дня текущего месяца
    let fD = firstDay// Перезаписал для изменений
    if (firstDay === 0) fD = 7 // Если день недели 0, меняем на  7
    const lastDay = 33 - new Date(YY, MM, 33).getDate()//Получаю количество дней текущего месяца

    //Создал ящейки с числами
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < 42; i++) {
        let newElement = document.createElement('div')
        newElement.classList.add('calender__num')
        fragment.appendChild(newElement)
    }
    $calendar.children[1].appendChild(fragment)

    addFullDate(DD) //Полная дата, между стрелками 

    const $days = document.querySelectorAll('.calender__num')
    let numDay = 1

    for (let i = 0; i < $days.length; i++) {
        const e = $days[i]
        if (i < fD - 1) continue // если i === первый день - 1
        if (i >= fD - 1) {
            e.textContent = numDay
            e.classList.add('d')
            numDay++
            if (numDay >= lastDay + 1) break
        }
    }

    const $d = document.querySelectorAll('.d')
    $d.forEach((e, i) => i === DD - 1 && e.classList.add('date'))//Выдeлил дату

    $days.forEach(e => {
        if (e.classList.length === 1) {
            e.textContent = '0'
            e.style.color = 'rgba(0, 0, 0, 0)'
        }
    })
}
calendar()

//Клик по стрелкам
$calendar.addEventListener('click', nextMonth)

// Дата и время поездки
function startDateTransfer($d = document.querySelectorAll('.d')) {
    $d.forEach(d => {
        d.addEventListener('click', setDateTransfer)
    });
}
startDateTransfer()

const $time = document.querySelector('.calendar__time')

function setDateTransfer() {
    let day = document.querySelector('.calendar__date')
    let m = monthName.indexOf(day.textContent.replace(/[0-9]/g, '').trim()) + 1// получет месяц по индексу 
    let d = this.textContent

    //валидация месяца на 0 перед цифрой
    let vM = `${m}`
    if (m < 10) vM = `0${m}`
    //валидация день на 0 перед цифрой
    let vD = `${d}`
    if (d < 10) vD = `0${d}`
    // получет месяц в ф дд.мм.гггг
    let date = `${vD}.${vM}.${day.textContent.slice(-4)} `
    //перезапись кнопки
    $BUTTON[1].textContent = `${date} --:--`
    //скрывает календарь
    $calendar.classList.toggle('d_n')
    //Открывает инпут с временем
    $time.children[0].value = ''
    $time.classList.remove('d_n')
    showWindowHelp('Установите вреям поездки')
}

//Записывает время поездки
$time.addEventListener('input', setTimeTransfer)

function setTimeTransfer(e) {
    //Записывает текст кнопки без времени
    let d = $BUTTON[1].textContent.slice(0, -6)
    //Записывает текст полностью
    let fullD = `${d} ${e.target.value}`
    //Перезаписывает кнопку даты + value из input time
    $BUTTON[1].textContent = fullD

    let firstDay = new Date()
    let secondDay = new Date(+fullD.slice(6, 10), fullD.slice(3, 5) - 1, +fullD.slice(0, 2))
    



    if (firstDay >= secondDay) {
        $BUTTON[1].textContent = 'дд-мм-гг --:--'
        showWindowHelp('Трансфер только предварительно, минимум за сутки')
    }
}
