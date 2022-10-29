const questionValue = document.getElementById("question-value");
const questionValueNodes = Array.from(questionValue.parentNode.childNodes).filter(node => node.nodeType !== 3);

const swapColorsHover = (e, color) => {
    questionValue.addEventListener(e, () => {
        for (const [i, node] of (questionValueNodes).entries()) {
            (i == 0) ? node.style.borderRight = `60px solid ${color}` : (i == 1) ? node.style.backgroundColor = `${color}` : node.style.borderLeft = `60px solid ${color}`;
        }
    });
}

for (const node of questionValueNodes) node.addEventListener("click", (e) => window.location.href = "/1");

swapColorsHover("mouseover", "#ffa500");
swapColorsHover("mouseout", "#0000ff");

