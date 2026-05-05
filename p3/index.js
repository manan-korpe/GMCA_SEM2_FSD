function XMLAPI() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);

    xhttp.onreadystatechange = function () {
        const container = document.getElementById("use");

        if (this.readyState === 4) {
            if (this.status === 200) {
                container.innerText = this.responseText;
            } else {
                container.innerText = "Something went wrong";
            }
        }
    };
    xhttp.send();
}
function fetchAPI() {
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET"
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((data) => {
        console.log(data);
        document.getElementById("use").innerText = JSON.stringify(data, null, 2);
    }).catch((error)=>document.getElementById("use").innerText=error);
}
function clearData() {
    document.getElementById("use").innerText = "";
}
