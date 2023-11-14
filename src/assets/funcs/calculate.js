function $calcualte() {
    let $status = false;
    let tipPerPerson = document.querySelector("#tip-person");
    let $totalPerPerson = document.querySelector("#total-per-person");
    let $targetOj = JSON.parse(window.localStorage.getItem("target-obj"));
    let $arr = [];
    for (let $prop in $targetOj) {
        $arr.push($targetOj[$prop]);
    }
    $arr.some((el) => (el === null ? ($status = true) : ($status = false)));

    if ($status) {
        return;
    } else {
        let $amount = +$targetOj.bill * (+$targetOj.percentage / 100);
        tipPerPerson.textContent = `$${(
            $amount / $targetOj.nmberOfPeople
        ).toFixed(2)}`;
        $totalPerPerson.textContent = `$${(
            (+$targetOj.bill +
                +$targetOj.bill * (+$targetOj.percentage / 100)) /
            $targetOj.nmberOfPeople
        ).toFixed(2)}`;
    }
}

export default $calcualte;
