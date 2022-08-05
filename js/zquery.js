/* jQuery from scratch */ 
const $ = (element) => {
    let elementName = '';
    if (element.startsWith('#')) {
        elementName = document.getElementById(element.slice(1));
    } else if (element.startsWith('.')) {
        elementName = document.getElementsByClassName(element.slice(1))
    } else {
        elementName = element
    };
    return {
        $: (element) => {
            let elementName = '';
            if (element.startsWith('#')) {
                elementName = document.getElementById(element.slice(1));
            } else if (element.startsWith('.')) {
                elementName = document.getElementsByClassName(element.slice(1))
            } else {
                elementName = element
            };
        },
        addClass: (className) => {
            elementName.classList.add(className)
        },
        removeClass: (className) => {
            elementName.classList.remove(className)
        }
    }
}