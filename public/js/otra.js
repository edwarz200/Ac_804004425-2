window.onload = () => {
    var lista = document.getElementById("S_E"),
        lista2 = document.getElementById("C_R"),
        sync = document.getElementById("sync"),
        syncInput = document.getElementById("syncInput")
    lista.onchange = () => {
        redirect("S_U_E", lista.value)
    }
    lista2.onchange = () => {
        redirect("C_R", lista2.value)
    }
}

function redirect(l, value) {
    if (value == "Deshabilitar")
        location.href = "/"
    else
        window.location = "/" + l + ":" + value;
}

function on(h) {
    var listaAdd, sORa, inputSearch
    if (h == "/agregar:nums=") {
        listaAdd = document.getElementById("inputGroupSelect01")
        sORa = ""
    } else if (h == "/search/SR:") {
        listaAdd = document.getElementById("List_search")
        inputSearch = document.getElementById("inputSearch")
        sORa = "=" + inputSearch.value
    }
    location.href = h + listaAdd.value + sORa;
}

// function onKeyDownHandler(event) {

$("#inputSearch").keypress(function(event) {
    if (event.which == 13) {
        on('/search/SR:')
    }
});

//     if(codigo >= 65 && codigo <= 90){
//       console.log(String.fromCharCode(codigo));
//     }


// }

function eliminar(input)
{
    var deleteOk = confirm('¿Estás seguro de eliminar este acuerdo?')
    return (deleteOk) ? input.parentNode.submit() : false
}

function A_C(value){
    if(value=='agregar'){
        document.querySelector('.contenedor').classList.remove('cont2')
        document.querySelector('.contenedor').classList.add('cont')
    }
    if(value=='cancelar'){
        document.querySelector('.contenedor').classList.add('cont2')
        document.querySelector('.contenedor').classList.remove('cont')
    }
}

function myfun(h_d, h, e, s, b,c) {
    var select = 0,
        selectS = 0,
        inputGroupSelect01 = document.getElementById("inputGroupSelect01"),
        List_search = document.getElementById("List_search"),
        btnsync = document.getElementById("btnsync")
    if (h_d == "false") {
        $(".disable").removeAttr('disabled')
        select = 1
    }
    if (h_d == "true_defect") {
        $(".disable").attr('disabled')
        select = 0
    }
    if (h_d == "false_v") {
        $(".disable").removeAttr('disabled')
        $(".disable").attr('type', 'radio')
        select = 2
    }
    document.querySelector(".selectE").options.item(select).setAttribute('selected', false)

    if (h == "search") {
        document.querySelector(".selectE").setAttribute('hidden', false)
        document.querySelector(".Ag").removeAttribute('hidden')
    } else if (h == "search_ag")
        document.querySelector(".selectE").setAttribute('hidden', false)
    else {
        document.querySelector(".selectE").removeAttribute('hidden')
        document.querySelector(".Ag").setAttribute('hidden', false)
    }
    if (inputGroupSelect01 != null)
        inputGroupSelect01.options.item(e).setAttribute('selected', false)

    if (s == ":Palabra") {
        selectS = 1
    } else if (s == ":Numero de acuerdo") {
        selectS = 2
    } else if (s == ":Fecha del acuerdo") {
        selectS = 3
    }
    if(b == "si"){

    }else if(b=="no"){
        btnsync.classList.remove('btn-info')
        btnsync.classList.add('btn-secondary')
        btnsync.classList.add('btn-lg')
        btnsync.classList.add('disabled')
        btnsync.innerHTML = "La base de datos en la nube esta vacia"
    }
    if(c=="si"){
        document.querySelector('.contenedor').classList.remove('cont2')
        document.querySelector('.contenedor').classList.add('cont')
    }
    if (List_search != null)
        List_search.options.item(selectS).setAttribute('selected', false)
}