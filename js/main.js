'use strict';
window.addEventListener('DOMContentLoaded', ()=>{
    const headerBtnConnect = document.querySelector('.header__right-block button');

    const preview = document.querySelector('.preview'),
        tabHeaders = preview.querySelectorAll(".tabheader__item"),
        tabContent = preview.querySelectorAll(".tabcontent");
    
    const offerBtnConnect = document.querySelector('.offer__action button'),
        offerSliders = document.querySelector('.offer__slider'),
        sliderCount = offerSliders.querySelector('.offer__slider-counter'),
        sliderCountCurrent = sliderCount.querySelector('#current'),
        sliderCountTotal = sliderCount.querySelector('#total'),
        sliderPrev = sliderCount.querySelector('.offer__slider-prev'),
        sliderNext = sliderCount.querySelector('.offer__slider-next'),
        sliders = offerSliders.querySelectorAll('.offer__slide');

    const calculatorForm = document.querySelector('.calculating__field'),
        btnsGender = calculatorForm.querySelector('#gender').children,
        btnsActive = [
            calculatorForm.querySelector('#low'),
            calculatorForm.querySelector('#small'),
            calculatorForm.querySelector('#medium'),
            calculatorForm.querySelector('#high'),
        ],
        inputsCharacter = {
            inputHeight: calculatorForm.querySelector('input[id="height"]'),
            inputWeight: calculatorForm.querySelector('input[id="weight"]'),
            inputAge: calculatorForm.querySelector('input[id="age"]'),
        },
        calculatorResult = calculatorForm.querySelector('.calculating__result span');

    const timer = {
        days: document.querySelector('.timer__block span[id="days"]'),
        hours: document.querySelector('.timer__block span[id="hours"]'),
        minutes: document.querySelector('.timer__block span[id="minutes"]'),
        seconds: document.querySelector('.timer__block span[id="seconds"]'),
    }

    const modal = document.querySelector('.modal'),
        modalClose = modal.querySelector('.modal__close');
    const forms = document.querySelectorAll('form'); 
    let boolGender, userActive;   

    function resetTabHeaders(){
        tabHeaders.forEach((tabElem, tabIndex)=>{
            tabElem.classList.remove("tabheader__item_active");
        });
        tabContent.forEach((tabElem, tabIndex)=>{
            tabElem.classList.add("tabcontent_hidden");
        });
    }

    function tabHeader(page = 0){
        tabHeaders.forEach((tabElem, tabIndex)=>{
            tabHeaders[page].classList.add("tabheader__item_active");
            tabContent[page].classList.remove("tabcontent_hidden");

            tabElem.addEventListener('click', ()=>{
                resetTabHeaders();
                tabElem.classList.add('tabheader__item_active');
                tabContent[tabIndex].classList.remove("tabcontent_hidden");
            })
        });
    }

    function currentSlide(count){
        sliders.forEach((slideElem)=>{
            slideElem.classList.add('offer__slide_hidden');
        }) // "Очищаем" слайдер - прячем все изображения
        
        sliders[count].classList.remove('offer__slide_hidden');
        sliderCountCurrent.textContent = count+1 < 10 ? `0${count+1}` : count+1;
    }

    function switcherSlider(){
        let countSlides = 0;
        let totalCount = sliders.length < 10 ? `0${sliders.length}` : sliders.length;
        sliderCountTotal.textContent = totalCount;

        currentSlide(countSlides);

        sliderPrev.addEventListener('click', ()=>{
            countSlides--;
            if(countSlides < 0) {
                countSlides = sliders.length - 1;
                return currentSlide(countSlides);
            }
            return currentSlide(countSlides);
        });

        sliderNext.addEventListener('click', ()=>{
            countSlides++;
            if(countSlides >= sliders.length) {
                countSlides = 0;
                return currentSlide(countSlides);
            }
            return currentSlide(countSlides);
        });
    }

    function resetBtnsGender(){
        Object.values(btnsGender).forEach(elem => {
            elem.classList.remove('calculating__choose-item_active');
        });
    }

    function resetBtnsActive(){
        btnsActive.forEach(elem => {
            elem.classList.remove('calculating__choose-item_active');
        });
    }

    function calorieCalculationFormula(){
        let base = (10 * inputsCharacter.inputWeight.value) + (6.25 * inputsCharacter.inputHeight.value) - (5 * inputsCharacter.inputAge.value), 
            man = Math.round((base + 5) * userActive) || 0,
            woman = Math.round((base - 161) * userActive) || 0;

        if(boolGender == null || boolGender == undefined && userActive == null || userActive == undefined){
            return '0';
        }
        else if(boolGender){
            return man;
        }
        else{
            return woman;
        }
    }

    function calculateCalorie(){
        resetBtnsGender();
        resetBtnsActive();

        calculatorResult.textContent = calorieCalculationFormula();

        Object.values(btnsGender).forEach((elem, index) => {
            elem.addEventListener('click', ()=>{
                resetBtnsGender();
                elem.classList.add('calculating__choose-item_active');
                boolGender = index;
                calculatorResult.textContent = calorieCalculationFormula();
            });
        })

        btnsActive.forEach((elem, index)=>{
            elem.addEventListener('click', ()=>{
                resetBtnsActive();
                elem.classList.add('calculating__choose-item_active');
                userActive = elem.dataset.active;
                calculatorResult.textContent = calorieCalculationFormula();
            });
        });

        Object.values(inputsCharacter).forEach((elem, index)=>{
            elem.addEventListener('input', ()=>{
                calculatorResult.textContent = calorieCalculationFormula();
            })
        });
    }

    function calculateTime(){
        const dateNow = new Date();
        const dateEnd = new Date(2025, 11, 25);
        const untilEnd = Date.parse(dateEnd) - Date.parse(dateNow);

        if(untilEnd <= 0){
            timer.days.textContent = '00';
            timer.hours.textContent = '00';
            timer.minutes.textContent = '00';
            timer.seconds.textContent = '00';
        }
        else{
            const day = Math.floor(untilEnd / (1000*60*60*24));
            const hours = Math.floor((untilEnd / (1000*60*60)) % 24);
            const minute = Math.floor((untilEnd / (1000*60)) % 60);
            const second = Math.floor((untilEnd / (1000)) % 60);

            timer.days.textContent = day < 10 ? `0${day}` : day;
            timer.hours.textContent = hours < 10 ? `0${hours}` : hours;
            timer.minutes.textContent = minute < 10 ? `0${minute}` : minute;
            timer.seconds.textContent = second < 10 ? `0${second}` : second;
        }
    }

    function timePromotion(){
        calculateTime();
        setInterval(calculateTime, 1000);
    }

    function modalView(){
        modal.style.display = 'block';
        document.body.classList.add('overflow__forbiden');

        modal.addEventListener('click', (event)=>{
            if(event.target == modal){
                modal.style.display = 'none';
                document.body.classList.remove('overflow__forbiden');
            }
        });

        modalClose.addEventListener('click', ()=>{
            modal.style.display = 'none';
            document.body.classList.remove('overflow__forbiden');
        });
    }

    function modalSetTime(){
        setTimeout(modalView, 2000);
    }

    function modalHeaderBtnConnect(){
        headerBtnConnect.addEventListener('click', ()=>{
            modalView();
        });
    }

    function modalOfferBtnConnect(){
        offerBtnConnect.addEventListener('click', ()=>{
            modalView();
        });
    }

    function validateName(userName, elem){
        if(userName.trim() == ''){
            elem.style.border = '1px solid red';
            return false;
        }

        if(userName.trim().length < 2){
            elem.style.border = '1px solid red';
            return false;
        }

        elem.style.border = 'none';
        return true;
    }

    function validatePhone(numberPhone, elem){
        const rulePhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if(numberPhone.trim() == ''){
            elem.style.border = '1px solid red';
            return false;
        }

        if(numberPhone.trim().length < 2){
            elem.style.border = '1px solid red';
            return false;
        }

        if(!rulePhone.test(numberPhone.trim())){
            elem.style.border = '1px solid red';
            return false;
        }

        elem.style.border = 'none';
        return true;
    }

    forms.forEach(elem=>{
        elem.addEventListener('submit', (e)=>{
            e.preventDefault();

            const inputName = elem.querySelector('input[name="name"]'),
                inputPhone = elem.querySelector('input[name="phone"]');

            if(validateName(inputName.value, inputName) && validatePhone(inputPhone.value, inputPhone)){
                // const xhr = new XMLHttpRequest();
                const form = new FormData(elem);
                fetch('http://localhost/dist/server.php', {
                    method: 'POST',
                    body: form,
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Ответ сервера:", data);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
    })
    

    resetTabHeaders();

    tabHeader();
    switcherSlider();
    calculateCalorie();
    timePromotion();

    modalSetTime();
    modalHeaderBtnConnect();
    modalOfferBtnConnect();
});