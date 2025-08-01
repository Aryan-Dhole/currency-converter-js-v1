const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const resultDiv = document.getElementById("result");
const swapBtn = document.getElementById("swapBtn")






const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

fetch(apiURL)
    .then(res => res.json())
    .then(data => {

        const currencyList = Object.keys(data.rates); // ['INR', 'USD', 'EUR', ...]

        currencyList.forEach(code => {
            fromCurrency.innerHTML += `<option value="${code}">${code}</option>`;
            toCurrency.innerHTML += `<option value="${code}">${code}</option>`;
        });

        // Set default values
        fromCurrency.value = "USD";
        toCurrency.value = "INR";

        //live Event Listners
        amountInput.addEventListener("input", convert);
        fromCurrency.addEventListener("change", convert);
        toCurrency.addEventListener("change", convert);

        function convert() {
            const amount = parseFloat(amountInput.value)
            const from = fromCurrency.value
            const to = toCurrency.value

            if (isNaN(amount)) {
                if (amountInput.value.trim() !== "") {
                    resultDiv.innerHTML = `<p class="text-danger">❌ Please Enter Valid Amount</p>`
                } else {
                    resultDiv.innerHTML = ""
                }
                return;
            }

            //loading spinner
            resultDiv.innerHTML = `<p class="text-muted">⏳ Converting...</p>`;
            //Fetch conversion rates using selected "from" currency
            fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
                .then(res => res.json())
                .then(data => {
                    const rate = data.rates[to]
                    const converted = (amount * rate).toFixed(2)
                    resultDiv.innerHTML = `<h4>${amount} ${from} = ${converted} ${to}</h4>`
                })

        }
        swapBtn.addEventListener("click", () => {
            const temp = fromCurrency.value;
            fromCurrency.value = toCurrency.value;
            toCurrency.value = temp;
            convert(); // Auto-convert after swapping
        });

    });
