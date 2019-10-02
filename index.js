const startButton = document.getElementsByClassName('play')[0];

window.onload = () => {
    startButton.onclick = () => {
        adventurerWindow = window.open("./adventurer/index.html", 
            "adventurerWindow", 
            `
                menubar=no,
                location=no,
                status=1,
                scrollbars=no,
                width=226,
                height=200,
                screenX=0,
                screenY=${window.outerHeight}
            `
        );
    }
}