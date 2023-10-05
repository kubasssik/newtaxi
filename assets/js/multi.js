const $MULTI = document.querySelector('.multi')
const $INPUT = $MULTI.childNodes[1].children[1]
const $BUTTON = $MULTI.childNodes[1].children[2]
const $P = $MULTI.childNodes[1].children[3]
const $UL = $MULTI.childNodes[1].children[0]
const $LI = $MULTI.childNodes[1].children[0].children

let add

$INPUT.addEventListener('input', addTextForElement)

function addTextForElement(e) {
    add = e.target.value.trim()
    $P.classList.add('multi__p_active')//opacity: 1;
    add === '' && $P.classList.remove('multi__p_active')//opacity: 0; 
    validationHelper()//Валидация окончания слова "СИМВОЛ"
}

$BUTTON.addEventListener('click', addElement)

function addElement() {
    if (add) {
        createNewElement()//Создает елемент
        $INPUT.placeholder = 'Добавить ещё'
        $INPUT.value = ''
        removeElement()//Включает функцию - removeElement()
    }
    add = ''
    $P.classList.remove('multi__p_active')//opacity: 0; 
  
}

//Создает елемент
function createNewElement() {
    let nLi = document.createElement('li')
    nLi.textContent = add
    let nSpan = document.createElement('span')
    nSpan.classList.add('span')
    nSpan.innerHTML = ` &#10060;`
    nLi.append(nSpan)
    $UL.append(nLi)
}

//Удаляет элемент
function removeElement() {
    for (let i = 0; i < $LI.length; i++) {
        $LI[i].addEventListener('click', e => {
            if(e.target.tagName === 'SPAN'){
                e.target.parentElement.remove()
                if (!$LI.length) $INPUT.placeholder = 'Добавить'// Если список пуст, меняет placeholder
            }  
        })
    }
}

//Валидация окончания слова "СИМВОЛ"
//1 л, 21 л,  2-4 ла, 22-24 ла,  25-30 лов, 5-20 лов
function validationHelper(a = ['лов', 'ла', 'л']) {
    for (let i = 0; i < add.length; i++) {
        if (i >= 0 && i <= 4 || i >= 9 && i <= 24) $P.textContent = `${30 - add.length} симво${a[0]}`
        if (i >= 5 && i <= 7 || i >= 25 && i <= 27) $P.textContent = `${30 - add.length} симво${a[1]}`
        if (i === 8 || i === 28) $P.textContent = `${30 - add.length} симво${a[2]}`
        if (i === 29) $P.textContent = 'Максимально'
    }
}
