const paths = {
    "Tribute Page": 'https://ranker-M.github.io/Tribute Page Bioware/',
    "Survey Form": 'https://ranker-M.github.io/Survey Form-Library Registration/',
    "Technical Documentation Page": 'https://ranker-M.github.io/Technical Documentation Page-React/',
    "Landing Page": 'https://ranker-M.github.io/Product Landing Page/'
}




window.onload = () => {
    const projectTiles = document.querySelectorAll(".project-tile");
    console.log("Project tile objects:", projectTiles);
    projectTiles.forEach(el => {
        el.addEventListener("click", changeIframe);
    });
}

const changeIframe = (e) => {
    const iframeDOC = document.querySelector('#preview');
    const websiteLink = document.querySelector("#projects > div.website-preview > h4 > a")
    const siteName = e.target.querySelector("h3") ? e.target.querySelector("h3") : e.target.parentNode.querySelector("h3");
    console.log(siteName);
    const link = paths[siteName.innerHTML];
    iframeDOC.setAttribute("src", link);
    websiteLink.innerHTML = link;
    websiteLink.setAttribute("href", link);
}