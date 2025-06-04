$(document).ready(function(){
    var intervalId; // Store interval ID for clearing

    $("#submit").click(function(e){
        e.preventDefault();

        var input = $("#dob-input").val();
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    // RESET button logic
    $("#reset-btn").click(function(){
        // Clear the interval
        if (intervalId) {
            clearInterval(intervalId);
        }
        // Remove dob from localStorage
        localStorage.removeItem("dob");
        // Hide timer, show choose
        $("#timer").css("display", "none");
        $("#choose").css("display", "block");
        $("#dob-input").val("");
        $("#reset-btn").hide();
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    };

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    };

    function renderAgeLoop()
    {
        var dob = load();
        $("#choose").css("display", "none");
        $("#timer").css("display", "block");
        $("#reset-btn").show();

        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(function(){
            var age = getAge(dob);
            $("#age").html(age.year + "<sup>." + age.ms + "</sup>");
        }, 100);
    };

    function renderChoose()
    {
        $("#choose").css("display", "block");
    };

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;

        var majorMinor = years.toFixed(9).toString().split('.');

        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    };

    function main() {
        if (load() != -1)
        {
            renderAgeLoop();
        } else {
            renderChoose();
        }
    };
    main();
});
