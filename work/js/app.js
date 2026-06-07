document.getElementById('get-weather').addEventListener("click", function () {
    let city = document.getElementById("city-select").value;
    if (!city) {
        alert("都市を選択してください。");
    }

    let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${city}.json`
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("取得に失敗しました。")
                return;
            }
            return response.json();
        })
        .then(function (weather) {
            let area = weather[0].timeSeries[0].areas[0];
            let temps = weather[1].tempAverage.areas[0];

            document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
            document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
            document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
            document.getElementById("todayHighTemperature").lastElementChild.textContent = temps.max + "℃";
            document.getElementById("todayLowTemperature").lastElementChild.textContent = temps.min + "℃";
            document.getElementById("today").lastElementChild.textContent = area.weathers[0];
            document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
            document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
        })
        .catch(function (error) {
            alert(error.message);
    })
});
