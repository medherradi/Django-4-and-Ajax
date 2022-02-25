const alertBox = document.getElementById("alert-box")
const imgBox = document.getElementById("img-box")
const form = document.getElementById("p-form")

const name = document.getElementById("id_name")
const description = document.getElementById("id_description")
const image = document.getElementById("id_image")

const csrf = document.getElementsByName("csrfmiddlewaretoken")[0].value

const url = ""

const alertsMessage = (type, message) =>{
    alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">
                             ${message}
                          </div>`
}

image.addEventListener('change', ()=>{
    const img_data = image.files[0]
    const url = URL.createObjectURL(img_data)
    console.log(url)
    imgBox.innerHTML = `
    <img src="${url}" width="50%">
    `
})

form.addEventListener('submit', e=>{
    e.preventDefault()
    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf)
    fd.append('name', name.value)
    fd.append('description', description.value)
    fd.append('image', image.files[0])

    $.ajax({
        type: 'POST',
        url: url,
        data : fd,
        success: function(response){
            console.log(response)
            const text = `successfully saved ${response.name}`
            alertsMessage('success', text)
            setTimeout(()=>{
                imgBox.innerHTML = ""
                name.value = ""
                description.value = ""
                image.value = ""
            },10)
            setTimeout(()=>{
                alertBox.innerHTML = ""
            },2000)
        },
        error: function(error){
            console.log(error)
            alertsMessage('danger', 'Something went wrong ...')
        },
        cache: false,
        contentType: false,
        processData: false,
    })

})