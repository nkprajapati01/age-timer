document.addEventListener('DOMContentLoaded', function(){
    var intervalId; // Store interval ID for clearing

    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleAriaLabel(savedTheme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleAriaLabel(newTheme);
    }

    function updateThemeToggleAriaLabel(theme) {
        const toggleButton = document.getElementById('theme-toggle');
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        toggleButton.setAttribute('aria-label', label);
    }

    // Initialize theme on page load
    initTheme();

    // Theme toggle button event
    document.getElementById('theme-toggle').addEventListener('click', function(){
        toggleTheme();
    });

    document.getElementById('submit').addEventListener('click', function(e){
        e.preventDefault();

        var input = document.getElementById('dob-input').value;
        var dob = new Date(input);
        save(dob);
        renderAgeLoop();
    });

    // RESET button logic
    document.getElementById('reset-btn').addEventListener('click', function(){
        // Clear the interval
        if (intervalId) {
            clearInterval(intervalId);
        }
        // Remove dob from localStorage
        localStorage.removeItem("dob");
        // Hide timer, show choose
        document.getElementById('timer').style.display = 'none';
        document.getElementById('choose').style.display = 'block';
        document.getElementById('dob-input').value = '';
        document.getElementById('reset-btn').style.display = 'none';
    });

    function save(dob)
    {
        localStorage.dob = dob.getTime();
    }

    function load()
    {
        var dob;
        if (dob = localStorage.getItem("dob"))
        {
            return new Date(parseInt(dob));
        }
        return -1;
    }

    function renderAgeLoop()
    {
        var dob = load();
        document.getElementById('choose').style.display = 'none';
        document.getElementById('timer').style.display = 'block';
        document.getElementById('reset-btn').style.display = 'block';

        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(function(){
            var age = getAge(dob);
            document.getElementById('age').innerHTML = age.year + "<sup>." + age.ms + "</sup>";
        }, 100);
    }

    function renderChoose()
    {
        console.log("renderChoose() called");
        document.getElementById('choose').style.display = 'block';
    }

    function getAge(dob){
        var now       = new Date;
        var duration  = now - dob;
        var years     = duration / 31556900000;

        var majorMinor = years.toFixed(9).toString().split('.');

        return {
            "year": majorMinor[0],
            "ms": majorMinor[1]
        };
    }

    function main() {
        console.log("main() called");
        var loadResult = load();
        console.log("load() result:", loadResult);
        if (loadResult != -1)
        {
            console.log("Calling renderAgeLoop()");
            renderAgeLoop();
        } else {
            console.log("Calling renderChoose()");
            renderChoose();
        }
    }
    main();
});
