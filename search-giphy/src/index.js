(function () {
    setup();

    function setup() {
        const btnSearch = document.getElementById("btnSearch");

        btnSearch.addEventListener("click", search);

        search();
    }

    function search() {
        const txtSearch = document.getElementById("txtSearch");

        const searchValue = txtSearch.value.trim();
        const trendingUrl = "https://api.giphy.com/v1/gifs/trending?api_key=dTaU5zZmIIth6j3PH0eSTH8Y8XYARHGE&limit=20&rating=G";
        let searchUrl = "https://api.giphy.com/v1/gifs/search?api_key=dTaU5zZmIIth6j3PH0eSTH8Y8XYARHGE&q=&limit=20&offset=0&rating=G&lang=en";
        let apiUrl = "";

        if (searchValue.length > 0) {
            const regex = /(&q=)/gi;
            apiUrl = searchUrl.replace(regex, `&q=${searchValue}`);
            clear();
        }
        else {
            apiUrl = trendingUrl;
        }

        fetchGIPHY(apiUrl)
            .then((data) => addImages(data))
            .catch(() => console.error("Error in fetch GIPHY"));
    }

    function clear() {
        const container = document.querySelector(".images");

        container.innerHTML = "";
    }

    function addImages(data) {
        const container = document.querySelector(".images");

        data.forEach((data) => {
            const img = createImage(data.title, data.url);

            container.appendChild(img);
        });
    }

    function createImage(title = "", url = "#") {
        const img = document.createElement("img");

        img.src = url;
        img.alt = title;
        img.title = title;

        return img;
    }

    async function fetchGIPHY(apiUrl) {
        const response = await fetch(apiUrl);
        const json = await response.json();

        return json.data.map((gif) => {
            return {
                title: gif.title,
                url: gif.images.fixed_height.url,
            }
        }, []);
    }
}());