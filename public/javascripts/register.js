
function resendOTP() {
    // alert('clicked')
    $.post("/register/resendOTP/",
        {
            userId: "<%= userId %>"
        },
        function (data, status) {
            alert("OTP sent successfully!");
        });
};
