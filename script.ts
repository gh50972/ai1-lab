const msg: string = "Hello!";
alert(msg);


document.addEventListener('DOMContentLoaded', () => {
    const linkArea = document.getElementById('linkArea');

    if (linkArea) {
        const linksData = [
            { text: 'Link 1', cssFile: 'dist/LabE.css' },
            { text: 'Link 2', cssFile: 'dist/LabE2.css' },
            // Dodaj więcej linków w zależności od potrzeb
        ];

        linksData.forEach((linkData, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = linkData.text;
            link.setAttribute('data-css-file', linkData.cssFile);

            link.addEventListener('click', (event) => {
                event.preventDefault();
                setActiveStyleSheet(linkData.cssFile);
            });

            linkArea.appendChild(link);

            if (index < linksData.length - 1) {
                const separator = document.createTextNode(' | ');
                linkArea.appendChild(separator);
            }
        });
    }

    function setActiveStyleSheet(cssFileName: string): void {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

        stylesheets.forEach((stylesheet) => {
            const linkElement = stylesheet as HTMLLinkElement;
            if (linkElement) {
                linkElement.disabled = true;
            }
        });

        const selectedStylesheet = document.querySelector(`link[href="${cssFileName}"]`) as HTMLLinkElement;
        if (selectedStylesheet) {
            selectedStylesheet.disabled = false;
        }
    }
});
