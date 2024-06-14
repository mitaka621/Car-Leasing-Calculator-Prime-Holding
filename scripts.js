document.addEventListener("DOMContentLoaded", () => {
    const carValueInput = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const downPaymentInput = document.getElementById('downPayment');
    const downPaymentRange = document.getElementById('downPaymentRange');
    const carTypeInput=document.getElementById('carType');
    const leasePeriodInput=document.getElementById('leasePeriod');

    updateLeasingDetails();

    carTypeInput.addEventListener('input', () => {
        updateLeasingDetails();              
    });

    leasePeriodInput.addEventListener('input', () => {
        updateLeasingDetails();              
    });

    carValueInput.addEventListener('input', () => {
        carValueRange.value = carValueInput.value;
        if (carValueInput.value>=10000&&carValueInput.value<=200000) {
            updateLeasingDetails();
        }        
    });

    carValueInput.addEventListener('blur', function() {
        if (carValueInput.value<10000) {
            carValueInput.value=10000;
        }else if(carValueInput.value>200000){
            carValueInput.value=200000;
        }
    });

    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateLeasingDetails();
    });

    downPaymentRange.addEventListener('input', () => {
        downPaymentInput.value = downPaymentRange.value;
        updateLeasingDetails();
    });

    function updateLeasingDetails() {
        const annualInterestRateNew = 2.99; 
        const annualInterestRateUsed = 3.7;  
    
        let carValue = parseInt(carValueInput.value);  
        let leasePeriod = parseInt(leasePeriodInput.value);  
        let downPaymentPercentage = parseInt(downPaymentInput.value);  
        let carType = carTypeInput.value;
    
        let annualInterestRate = (carType === 'new') ? annualInterestRateNew : annualInterestRateUsed;

        let downPayment=carValue*(downPaymentPercentage*0.01);

        let P=carValue-downPayment;
        let r=annualInterestRate/100/12;
        let montlyLease=P*r/(1-Math.pow((1+r),leasePeriod*(-1))); //Pmt formula, used to calculte the monthly lease based on an annual interest rate

        let totalLeasingCost=downPayment+(montlyLease*leasePeriod);

        document.getElementById("totalLeasingCost").textContent = "€" + totalLeasingCost.toFixed(2);
        document.getElementById("monthlyInstallment").textContent = "€" + montlyLease.toFixed(2);
        document.getElementById("downPaymentAmount").textContent = "€" + downPayment.toFixed(2);
        document.getElementById("interestRate").textContent =annualInterestRate + "%";  
    }
});
