const page = document.querySelector(".page");
const main = document.querySelector(".main");
const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".navbar__menu-btn");
const menuOpen = document.querySelector(".navbar__menu-open");
const menuClose = document.querySelector(".navbar__menu-close");
const popupContainer = document.querySelector(".popup-container");
const errorText = document.querySelector(".errortext")
const form = document.querySelector(".form");
let current = document.querySelector(".main__product");


document.addEventListener("click", (e) => {
        //Показ меню
        if (e.target.classList.contains("navbar__menu-btn")) {
            main.classList.toggle("page-hidden");
            menu.classList.toggle("page-hidden");
            menuOpen.classList.toggle("page-hidden");
            menuClose.classList.toggle("page-hidden");
            page.classList.toggle("page_bg-gray");
            menuBtn.classList.toggle("menu-btn_red");

        }
        //Показ всплывающего окна
        if (e.target.classList.contains("product")) {
            popupContainer.style.display = "block";

        }
        //Закрытие всплывающего окна
        if (e.target.parentElement.classList.contains("popup__close")) {
            popupContainer.style.display = "none";
            form.reset();
            document.querySelector('._error').classList.toggle("_error")
            errorText.textContent = '';
        }
    })
    //Показ нужного контент-блока
document.addEventListener("mouseover", (e) => {

        if (e.target.classList.contains("main__product")) {
            document.querySelector(`.${current.dataset.deps}`).style.display = "none";
            current = e.target;
            document.querySelector(`.${current.dataset.deps}`).style.display = "block";
        }

    })
    //обработчик формы
form.addEventListener("submit", formSend);

async function formSend(e) {
    const formData = new FormData(form);
    errorText.textContent = ''
    e.preventDefault();
    let error = formValidate(form);
    if (error == 0) {

        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        })
        if (response.ok) {
            let result = await response.json();
            console.log(result.message);
            form.reset();
        } else {
            alert('Error')
        }
    } else {
        errorText.textContent = "Заполните все поля правильно"
    }
}
//Валидация полей
function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("._req");
    for (let i = 0; i < formReq.length; i++) {
        const input = formReq[i];
        console.log(input);
        formRemoveError(input);
        if (input.classList.contains('_email')) {

            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.classList.contains('_phone')) {

            if (phoneTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.classList.contains('_name')) {

            if (nameTest(input)) {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}

function formAddError(input) {
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function phoneTest(input) {
    return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
}

function nameTest(input) {
    return !/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(input.value);
}