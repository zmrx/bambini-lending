$(document).ready(function(){
    function burgerMenuToggle(){
        $('.burger-menu').toggleClass('open');
		$('.menu-mobile').slideToggle();
	}
	$('.burger-menu').on('click', burgerMenuToggle);

    //плавный скролл
    $('nav ul a , .footer-menu ul a').on( 'click', function(){
        var el = $(this);
        var dest = el.attr('href'); // получаем направление
        if(dest !== undefined && dest !== '') { // проверяем существование
            $('html').animate({
                scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
            }, 500 // скорость прокрутки
            );
        }
        return false;
    });
    $('.nav-mobile ul a').on( 'click', function(){
        var el = $(this);
        var dest = el.attr('href'); // получаем направление
        if(dest !== undefined && dest !== '') { // проверяем существование
            $('html').animate({
                scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
            }, 500 // скорость прокрутки
            );
        }
        return false;
    });
});



//открытие модалки
function modalOpener(e) {
    console.log(e.target);
    const triggerBtn = e.target;
    if(!!triggerBtn.dataset.modalname){
        const targetModal = triggerBtn.dataset.modalname;//определяем какое модальное окно нужно открыть
        if(document.querySelectorAll('#' + targetModal).length > 0){
            const modal = document.querySelector('#' + targetModal);
            const body = document.querySelector('body');
            const modalBg = modal.querySelector('.background');
            const modalCloseBtn = modal.querySelector('.close-btn');

            const open = ()=>{//анимация открытия модалки
                modal.classList.add('preshow');
                body.classList.add('modal-show');
                setTimeout(()=>{
                    modal.classList.remove('preshow');
                    modal.classList.add('show');
                },10);
            }
            const close = ()=>{//анимация закрытия модалки
                modal.classList.remove('show');
                modal.classList.add('preshow');
                setTimeout(()=>{
                    modal.classList.remove('preshow');
                    body.classList.remove('modal-show');
                },300);
            }

            modalBg.addEventListener('click', close);
            modalCloseBtn.addEventListener('click', close);

            if(!modal.classList.contains('show')){
                open();
            }else{
                close();
            }
        }else{
            console.log('не найдена форма с индефикатором: '+ targetModal);
        }
    }else{
        console.log('на кнопке не задан дата атрибут с целевым модальным окном.');
    }
}

const modalWindowFuncBox = ()=>{
    //функция нахождения элементов, запускающих открытие модальных окон
    if(document.querySelectorAll('[data-modalname]').length > 0){

        modalWindow_openBtns = document.querySelectorAll('[data-modalname]');
        // console.log(modalWindow_openBtns);
        modalWindow_openBtns.forEach( (item) => {//вешаем на все найденные кнопки событие открытия модалки
            item.addEventListener('click', modalOpener);
            // console.log(item);
        });
    }
}
document.addEventListener('DOMContentLoaded', modalWindowFuncBox);
