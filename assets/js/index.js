const $LABEL = document.querySelectorAll('label')
export const $BUTTON = document.querySelectorAll('button')
const $BURGER = document.querySelector('.burger')
const $BURGER_MENU = document.querySelector('.burger__menu')


//Окно помощи открыть/Окно помощи закрыть
export function showWindowHelp(p, h = document.querySelector('.help__window')) {
    h.children[1].textContent = p
    h.classList.add('help__window_position')
    h.children[0].addEventListener('click', ()=>{
        h.classList.remove('help__window_position')
    })
}





console.log($LABEL);

//Обработка input телефон
//$LABEL[0].children



//открыть - закрыть Животное/ПРОМО/Табличка
$LABEL[12].addEventListener('change', () => $LABEL[13].classList.toggle('d_n'))
$LABEL[14].addEventListener('change', () => $LABEL[15].classList.toggle('d_n'))
$LABEL[16].addEventListener('change', () => $LABEL[17].classList.toggle('d_n'))


// addRemoveCalendar Календарь

$BUTTON[1].addEventListener('click', addRemoveCalendar)

let btnDate = $BUTTON[1].textContent
function addRemoveCalendar(e){
    document.querySelector('.help__window').classList.remove('help__window_position')
    document.querySelector('.calendar').classList.toggle('d_n')
    document.querySelector('.calendar__time').classList.add('d_n')
    
    e.target.textContent = btnDate
    
}



$LABEL[2].addEventListener('input', (ev) => {
    const arrFlight = ['А', 'Б', 'В',]
    arrFlight.forEach(e => {
        ev.target.value.toLowerCase().trim() === e.toLowerCase() && $LABEL[3].classList.remove('d_n')
        ev.target.value === "" && $LABEL[3].classList.add('d_n')
    })
})

//BURGER + MENU
$BURGER.addEventListener('click', function(){
for (let i = 0; i < this.children.length; i++) this.children[i].classList.toggle(`burger_active_b${i}`)
$BURGER_MENU.classList.toggle('burger__menu_active')
})


//ТАРИФФЫ
const $tariff = document.getElementsByName('tariff')
const $passengers = document.querySelectorAll('.pass')

//Скрывает кнопку указать
$passengers.forEach(passengers => {
    passengers.addEventListener('click', e=>{
        e.target.classList.add('d_n')
        e.target.nextElementSibling.classList.remove('d_n')
    })
})


//Отключает/Включает label 'Дети'
$tariff.forEach( tariff => {
    tariff.addEventListener('change' , e =>{
        $LABEL[10].classList.remove('d_n')
        if(e.target.id === 's' || e.target.id === 'b') {
            $LABEL[10].classList.add('d_n') 
            showWindowHelp('Отсутствует детское кресло')
        }   
        e.target.id === 'c' && showWindowHelp('2 детских кресла, 1 бесплатно')  
        e.target.id === 'm' && showWindowHelp('От 3 до 5 детских кресел, 3 бесплатно')     
    })
});




const $cookie = document.querySelector('.cookie')
console.log($cookie);
$cookie.children[1].addEventListener('click', e => $cookie.style.top = '-100%')



//FOOTER COPY
document.querySelector('.footer__company').innerHTML = `Трансфер "КрымОк"&copy; 2020-${new Date().getFullYear()}`