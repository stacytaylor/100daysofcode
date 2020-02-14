var phrases = [
    "Cataloging Paraprofessional",
    "Senior Cataloging Paraprofessional",
    "Cataloging Librarian",
    "Emerging Technologies Librarian",
    "UX Librarian",
    "UX Designer",
    "Product Designer",
    "Senior Product Designer"
]

$("input").on("input", function (){
    
    var value = $(this).val()

    var phrase = phrases[value]

    $("div.phrase").html(phrase)


})