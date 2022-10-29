const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const param = Object.fromEntries(new URLSearchParams(window.location.search).entries());

const goToNext = async () => {
    await wait(4000);
    (!("end" in param)) ? window.location.href = `/${param.correct_answers}` : window.location.href = "/1";
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

for (const [i, node] of Array.from(document.getElementsByClassName("money-row")).entries()) { if (i % 5 == 0) node.style.color = "#fff"; }

goToNext();


const won = () => {
    if (document.getElementById("current-sum") == null) return 0;
    return document.getElementById("current-sum").getElementsByClassName("money-sum")[0].innerText.split("£")[1];
}

document.getElementsByClassName("won")[0].innerText += won();






