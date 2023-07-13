

$(document).ready(function () {
    // Prepare the preview for profile picture
    $("#wizard-picture").change(function () {
        console.log("dari kemariiin")
        recruitmentReadURL(this);
    });

    // $("#attachment_ids").change(function () {
    //     recruitmentReadAttachment(this);
    // });
});

function recruitmentReadURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            var data = reader.result;
            var img_base64 = data.split(",")[1];
            console.log("<><><><><", img_base64)
            document.querySelector("#base64_picture").value = img_base64;
        };
        reader.readAsDataURL(input.files[0]);
    }
}