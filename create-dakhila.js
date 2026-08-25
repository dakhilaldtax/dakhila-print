const ownersBody = document.getElementById("ownersBody");
const landBody = document.getElementById("landBody");

const ownerTotal = document.getElementById("ownerTotal");
const ownerStatus = document.getElementById("ownerStatus");

const totalLand = document.getElementById("totalLand");

const totalDemand = document.getElementById("totalDemand");
const totalDue = document.getElementById("totalDue");

const totalInWords = document.getElementById("totalInWords");


// =====================================
// বাংলা সংখ্যা
// =====================================

const banglaDigits = [
    "০", "১", "২", "৩", "৪",
    "৫", "৬", "৭", "৮", "৯"
];

function toBanglaNumber(number) {

    return String(number).replace(/\d/g, digit => {
        return banglaDigits[digit];
    });

}


// =====================================
// Owner Row
// =====================================

document.getElementById("addOwnerBtn")
    .addEventListener("click", function () {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="serial"></td>

            <td>
                <input
                    type="text"
                    class="owner-name"
                    placeholder="মালিকের নাম">
            </td>

            <td>
                <input
                    type="number"
                    class="owner-share"
                    min="0"
                    max="1"
                    step="0.01"
                    placeholder="0.00">
            </td>

            <td>
                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeOwner(this)">
                    Remove
                </button>
            </td>
        `;

        ownersBody.appendChild(row);

        updateOwnerSerial();

    });


function removeOwner(button) {

    const rows = ownersBody.querySelectorAll("tr");

    if (rows.length === 1) {
        alert("কমপক্ষে একজন মালিক থাকতে হবে।");
        return;
    }

    button.closest("tr").remove();

    updateOwnerSerial();
    calculateOwnerTotal();

}


function updateOwnerSerial() {

    const rows = ownersBody.querySelectorAll("tr");

    rows.forEach((row, index) => {

        row.querySelector(".serial").textContent =
            toBanglaNumber(index + 1);

    });

}


// =====================================
// Owner Total
// =====================================

function calculateOwnerTotal() {

    let total = 0;

    document.querySelectorAll(".owner-share")
        .forEach(input => {

            total += parseFloat(input.value) || 0;

        });

    total = Number(total.toFixed(2));

    ownerTotal.textContent = total.toFixed(2);

    if (total === 1) {

        ownerStatus.textContent = "✓ সঠিক";
        ownerStatus.style.color = "green";

    } else {

        ownerStatus.textContent =
            "মোট অংশ অবশ্যই 1.00 হতে হবে";

        ownerStatus.style.color = "red";

    }

}


document.addEventListener("input", function (event) {

    if (event.target.classList.contains("owner-share")) {
        calculateOwnerTotal();
    }

});


// =====================================
// Land Row
// =====================================

document.getElementById("addLandBtn")
    .addEventListener("click", function () {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="serial"></td>

            <td>
                <input
                    type="text"
                    class="dag-no"
                    placeholder="দাগ নং">
            </td>

            <td>
                <select class="main-class">

                    <option value="">
                        নির্বাচন করুন
                    </option>

                    <option value="কৃষি">
                        কৃষি
                    </option>

                    <option value="অকৃষি">
                        অকৃষি
                    </option>

                </select>
            </td>

            <td>

                <select class="usage-class">

                    <option value="">
                        নির্বাচন করুন
                    </option>

                    <option value="ধানী (কৃষি)">
                        ধানী (কৃষি)
                    </option>

                    <option value="বাগান">
                        বাগান
                    </option>

                    <option value="বাড়ি">
                        বাড়ি
                    </option>

                    <option value="পুকুর">
                        পুকুর
                    </option>

                </select>

            </td>

            <td>

                <input
                    type="number"
                    class="land-amount"
                    min="0"
                    step="0.01"
                    placeholder="0.00">

            </td>

            <td>

                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeLand(this)">
                    Remove
                </button>

            </td>

        `;

        landBody.appendChild(row);

        updateLandSerial();

    });


function removeLand(button) {

    const rows = landBody.querySelectorAll("tr");

    if (rows.length === 1) {

        alert("কমপক্ষে একটি জমির তথ্য থাকতে হবে।");

        return;
    }

    button.closest("tr").remove();

    updateLandSerial();
    calculateTotalLand();

}


function updateLandSerial() {

    const rows = landBody.querySelectorAll("tr");

    rows.forEach((row, index) => {

        row.querySelector(".serial").textContent =
            toBanglaNumber(index + 1);

    });

}


// =====================================
// Total Land
// =====================================

function calculateTotalLand() {

    let total = 0;

    document.querySelectorAll(".land-amount")
        .forEach(input => {

            total += parseFloat(input.value) || 0;

        });

    totalLand.textContent =
        total.toFixed(2);

}


document.addEventListener("input", function (event) {

    if (event.target.classList.contains("land-amount")) {

        calculateTotalLand();

    }

});


// =====================================
// Collection
// =====================================

function calculateCollection() {

    const oldDue =
        parseFloat(document.getElementById("oldDue").value) || 0;

    const threeYearDue =
        parseFloat(document.getElementById("threeYearDue").value) || 0;

    const penalty =
        parseFloat(document.getElementById("penalty").value) || 0;

    const currentDemand =
        parseFloat(document.getElementById("currentDemand").value) || 0;

    const collection =
        parseFloat(document.getElementById("totalCollection").value) || 0;


    const demand =
        oldDue +
        threeYearDue +
        penalty +
        currentDemand;


    const due =
        Math.max(demand - collection, 0);


    totalDemand.value =
        demand.toFixed(2);

    totalDue.value =
        due.toFixed(2);


    totalInWords.textContent =
        numberToBanglaWords(demand);

}


document.addEventListener("input", function (event) {

    if (event.target.classList.contains("money")) {

        calculateCollection();

    }

});


// =====================================
// বাংলা কথায় টাকা
// =====================================

function numberToBanglaWords(number) {

    number = Math.round(Number(number));

    if (number === 0) {
        return "শূন্য টাকা মাত্র";
    }

    const units = [
        "",
        "এক",
        "দুই",
        "তিন",
        "চার",
        "পাঁচ",
        "ছয়",
        "সাত",
        "আট",
        "নয়"
    ];

    if (number < 10) {
        return units[number] + " টাকা মাত্র";
    }

    if (number < 100) {

        return "বাংলা কথায় রূপান্তর প্রয়োজন" +
            " — " +
            toBanglaNumber(number) +
            " টাকা মাত্র";

    }

    return toBanglaNumber(number) + " টাকা মাত্র";

}


// =====================================
// বাংলা তারিখ
// =====================================

document.getElementById("paymentDate")
    .addEventListener("change", function () {

        const date = this.value;

        if (!date) {

            document.getElementById("banglaDate").value = "";

            return;

        }

        document.getElementById("banglaDate").value =
            convertEnglishDateToBangla(date);

    });


function convertEnglishDateToBangla(dateString) {

    const date = new Date(dateString + "T00:00:00");

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();


    const banglaMonths = [
        "বৈশাখ",
        "জ্যৈষ্ঠ",
        "আষাঢ়",
        "শ্রাবণ",
        "ভাদ্র",
        "আশ্বিন",
        "কার্তিক",
        "অগ্রহায়ণ",
        "পৌষ",
        "মাঘ",
        "ফাল্গুন",
        "চৈত্র"
    ];


    /*
       প্রকৃত বাংলা ক্যালেন্ডার conversion
       পরবর্তী ধাপে আলাদা accurate
       Bangla Calendar function যুক্ত করব।
    */


    return (
        toBanglaNumber(day) +
        " " +
        banglaMonths[0] +
        " " +
        toBanglaNumber(year - 593)
    );

}


// =====================================
// Form Submit
// =====================================

document.getElementById("dakhilaForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        // Owner validation

        let ownerSum = 0;

        document.querySelectorAll(".owner-share")
            .forEach(input => {

                ownerSum +=
                    parseFloat(input.value) || 0;

            });


        ownerSum =
            Number(ownerSum.toFixed(2));


        if (ownerSum !== 1) {

            alert(
                "মালিকের অংশের মোট যোগফল অবশ্যই 1.00 হতে হবে।"
            );

            return;

        }


        // Basic validation

        if (!this.checkValidity()) {

            this.reportValidity();

            return;

        }


        alert(
            "Form validation সফল হয়েছে।\n\n" +
            "পরবর্তী ধাপে Database Save + Token + QR যুক্ত হবে।"
        );

    });


// Initial calculation

updateOwnerSerial();
updateLandSerial();

calculateOwnerTotal();
calculateTotalLand();
calculateCollection();
