'use strict';

window.addEventListener('DOMContentLoaded', ()=>{
    const preview = document.querySelector('.preview'),
        tabHeaders = preview.querySelectorAll(".tabheader__item"),
        tabContent = preview.querySelectorAll(".tabcontent");
        
    const modal = document.querySelector('.modal'),
        modalForm = modal.querySelector('form'),
        modalFormInputName = modalForm.querySelector('.modal__input[name="name"]'),
        modalFormInputPhone = modalForm.querySelector('.modal__input[name="phone"]');
    
    const offerSlider = document.querySelector(".offer__slider"),
        offerSlidePrev = offerSlider.querySelector('.offer__slider-prev'),
        offerSlideNext = offerSlider.querySelector('.offer__slider-next'),
        offerSlides = offerSlider.querySelectorAll('.offer__slide'),
        offerCurrent = offerSlider.querySelector("#current"),
        offerTotal = offerSlider.querySelector("#total");

    const calculateForm = document.querySelector(".calculating"),
        calculateBtnsGender = calculateForm.querySelector('.calculating__choose[id="gender"]').children,
        calculateBtnsActive = calculateForm.querySelector(".calculating__choose_big").children,
        calculateInputs = {
            calculateInputHeight: calculateForm.querySelector('.calculating__choose-item[id="height"]'),
            calculateInputWeight: calculateForm.querySelector('.calculating__choose-item[id="weight"]'),
            calculateInputAge: calculateForm.querySelector('.calculating__choose-item[id="age"]'),
        },
        calculateFinalResult = calculateForm.querySelector('.calculating__result span');

    const orderForm = document.querySelector(".order__form"),
        orderFormInputName = orderForm.querySelector('.order__input[name="name"]'),
        orderFormInputPhone = orderForm.querySelector('.order__input[name="phone"]');

    const timerBlock = document.querySelectorAll('.timer__block span'),
        timeElements = {
            day: timerBlock[0],
            hours: timerBlock[1],
            minute: timerBlock[2],
            second: timerBlock[3],
        }
    
    let calculateGenderBool, calculateActive, finalResult;

    function resetTabHeaders(){
        tabHeaders.forEach((tabElem, tabIndex)=>{
            tabElem.classList.remove("tabheader__item_active");
        });
        tabContent.forEach((tabElem, tabIndex)=>{
            tabElem.classList.add("tabcontent_hidden");
        });
    }

    function resetOffer(){
        offerSlides.forEach((offerElem)=>{
            offerElem.classList.add("offer__slide_hidden");
        });
    }

    function resetCalculateBtnsGender(){
        Object.values(calculateBtnsGender).forEach((elem, index)=>{
            elem.classList.remove("calculating__choose-item_active");
        });
    }

    function resetCalculateBtnsActive(){
        Object.values(calculateBtnsActive).forEach((elem, index)=>{
            elem.classList.remove("calculating__choose-item_active");
        });
    }

    function resetCalculate(){
        resetCalculateBtnsGender();
        resetCalculateBtnsActive();
        
        Object.values(calculateInputs).forEach((elem, index)=>{
            elem.value = '';
        });
        calculateFinalResult.textContent = 0;
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



    function tabUserChoice(){
        tabHeaders.forEach((tabElem, tabIndex)=>{
            tabHeaders[0].classList.add("tabheader__item_active");
            tabContent[0].classList.remove("tabcontent_hidden");

            tabElem.addEventListener('click', ()=>{
                resetTabHeaders();
                tabElem.classList.add('tabheader__item_active');
                tabContent[tabIndex].classList.remove("tabcontent_hidden");
            })
        });
    }

    function modalView(){
        setTimeout(()=>{
            modal.style.display = 'block';
        }, 1000);

        modal.addEventListener('click', (event)=>{
            if(event.target.classList.contains('modal__close') || event.target.classList.contains('modal')){
                modal.style.display = 'none';
            }
        });
    }

    function modalFormValidate(){
        modalForm.addEventListener('submit', (event)=>{
            if(validateName(modalFormInputName.value, modalFormInputName) && validatePhone(modalFormInputPhone.value, modalFormInputPhone)){
                modal.style.display = 'none';
                alert("data send!!!");
                modalFormInputName.value = '';
                modalFormInputPhone.value = '';
                return event.preventDefault();
            }
            console.log('Ошибки в поле');
            return event.preventDefault();
        });
    }

    function changeSlider(countSlide){
        resetOffer();
        offerSlides[countSlide].classList.remove('offer__slide_hidden');
        offerCurrent.textContent = countSlide >= 10 ? `${countSlide+1}` : `0${countSlide+1}`;
    }

    function switchSlider(){
        let countSlide = 0;
        resetOffer();
        offerTotal.textContent = offerSlides.length >= 10 ? `${offerSlides.length}` : `0${offerSlides.length}`;
        offerCurrent.textContent = countSlide >= 10 ? `${countSlide+1}` : `0${countSlide+1}`;
        offerSlides[countSlide].classList.remove('offer__slide_hidden');
        offerSlideNext.addEventListener('click', ()=>{
            countSlide++;
            if(countSlide >= offerSlides.length){
                countSlide = 0;
                changeSlider(countSlide);
            }
            else{
                changeSlider(countSlide);
            }
        });
        offerSlidePrev.addEventListener('click', ()=>{
            countSlide--;
            if(countSlide < 0){
                countSlide = offerSlides.length-1;
                changeSlider(countSlide);
            }
            else{
                changeSlider(countSlide);
            }
        });
    }
    
    function calcultate(){
        const height = calculateInputs.calculateInputHeight.value == '' ? 0 : parseFloat(calculateInputs.calculateInputHeight.value),
            weight = calculateInputs.calculateInputWeight.value == '' ? 0 : parseFloat(calculateInputs.calculateInputWeight.value),
            age = calculateInputs.calculateInputAge.value == '' ? 0 : parseFloat(calculateInputs.calculateInputAge.value);
            
        if(calculateGenderBool == undefined || calculateGenderBool == null && calculateActive == undefined || calculateActive == null){
            calculateFinalResult.textContent = 0;
        }
        // Man
        else if(calculateGenderBool){
            switch(calculateActive){
                case 0:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.2) || 0;
                    break;
                case 1:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.375) || 0;
                    break;
                case 2:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.725) || 0;
                    break;
                case 3:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) + 5) * 1.9) || 0;
                    break;
                default:
                    calculateFinalResult.textContent = 0;
            }
        }
        // Woman
        else{
            switch(calculateActive){
                case 0:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.2) || 0;
                    break;
                case 1:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.375) || 0;
                    break;
                case 2:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.725) || 0;
                    break;
                case 3:
                    calculateFinalResult.textContent = Math.round(((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.9) || 0;
                    break;
                default:
                    calculateFinalResult.textContent = 0;
            }
        }
    }

    function calculateResult(){
        Object.values(calculateBtnsGender).forEach((elem, index)=>{
            elem.addEventListener('click', (event)=>{
                resetCalculateBtnsGender();
                calculateGenderBool = index;
                calculateBtnsGender[index].classList.add('calculating__choose-item_active');
                calcultate();
            })
        });

        Object.values(calculateInputs).forEach((elem, index)=>{
            elem.addEventListener('input', (event)=>{
                calcultate();
            })
        });

        Object.values(calculateBtnsActive).forEach((elem, index)=>{
            elem.addEventListener('click', (event)=>{
                resetCalculateBtnsActive();
                calculateActive = index;
                calculateBtnsActive[index].classList.add('calculating__choose-item_active');
                calcultate();
            })
        });
    }

    function orderFormValidate(){
        orderForm.addEventListener('submit', (event)=>{
            if(validateName(orderFormInputName.value, orderFormInputName) && validatePhone(orderFormInputPhone.value, orderFormInputPhone)){
                alert("data send!!!");
                orderFormInputName.value = '';
                orderFormInputPhone.value = '';
                return event.preventDefault();
            }
            console.log('Ошибки в поле');
            return event.preventDefault();
        });
    }

    function timePromotion(){
        const datePromotion = setInterval(()=>{
            const nowDate = new Date();
            const endDatePromotion = new Date(2025, 11, 25);
            const untilEnd = Date.parse(endDatePromotion) - Date.parse(nowDate);

            if(untilEnd > 0){
                const endDay = Math.floor(untilEnd / (1000 * 60 * 60 * 24));
                const endHours = Math.floor((untilEnd / (1000 * 60 * 60)) % 24);
                const endMinute = Math.floor((untilEnd / (1000 * 60)) % 60);
                const endSecond = Math.floor((untilEnd / 1000) % 60);

                timeElements.day.textContent = endDay >= 10 ? endDay : `0${endDay}`;
                timeElements.hours.textContent = endHours >= 10 ? endHours : `0${endHours}`;
                timeElements.minute.textContent = endMinute >= 10 ? endMinute : `0${endMinute}`;
                timeElements.second.textContent = endSecond >= 10 ? endSecond : `0${endSecond}`;
            }
            else{
                timeElements.day.textContent = '00';
                timeElements.hours.textContent = '00';
                timeElements.minute.textContent = '00';
                timeElements.second.textContent = '00';
                clearInterval(datePromotion);
            }
        }, 1000);
    }


    resetTabHeaders();
    resetCalculate();

    tabUserChoice();
    modalView();
    modalFormValidate();
    switchSlider();
    calculateResult();
    orderFormValidate();
    timePromotion();
});
