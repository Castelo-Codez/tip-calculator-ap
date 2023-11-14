<script setup>
import billForm from "./billForm.vue";
import nmbrOfpeopleForm from "./numberOfPeople.vue";
import {onMounted} from "vue";
import calc from "../funcs/calculate";
onMounted(() => {
    let $tipPercentage = document.querySelectorAll("ul > li");
    let $customInput = document.querySelector("ul > li:last-child");
    $tipPercentage.forEach(($tipel) => {
        $tipel.addEventListener("click", (e) => {
            $tipPercentage.forEach(($l) => $l.classList.remove("selected"));
            $tipel.classList.add("selected");
            $customInput.querySelector("input").value = "";
            if (
                $tipel.classList.contains("selected") &&
                $tipel !== document.querySelector("ul > li:last-child")
            ) {
                let $ob = JSON.parse(window.localStorage.getItem("target-obj"));
                $ob.percentage = parseInt(
                    $tipel.querySelector("button").textContent
                );
                window.localStorage.setItem("target-obj", JSON.stringify($ob));
                calc();
            }
        });
    });
    $customInput.querySelector("input").addEventListener("input", (e) => {
        let $ob = JSON.parse(window.localStorage.getItem("target-obj"));
        $ob.percentage = parseInt(e.target.value);
        window.localStorage.setItem("target-obj", JSON.stringify($ob));
        calc();
    });
    let $resetBtn = document.querySelector("#reset");
    $resetBtn.addEventListener("click", reset);
    function reset() {
        window.localStorage.setItem(
            "target-obj",
            JSON.stringify({
                bill: null,
                percentage: null,
                nmberOfPeople: null,
            })
        );
        $customInput.querySelector("input").value = "";
        $tipPercentage.forEach(($l) => $l.classList.remove("selected"));
        document.querySelector("#tip-input").value = "";
        document.querySelector("#nmbr-of-people").value = "";
        document.querySelector("#tip-person").textContent = "$0.00";
        document.querySelector("#total-per-person").textContent = "$0.00";
    }
});
</script>
<template>
    <div class="parent">
        <h1>spli<br />tter</h1>
        <div class="main-box">
            <div class="left">
                <billForm />
                <div class="tip-amount">
                    <h2>select tip %</h2>
                    <ul role="listbox">
                        <li role="listitem">
                            <button role="button">5%</button>
                        </li>
                        <li role="listitem">
                            <button role="button">10%</button>
                        </li>
                        <li role="listitem">
                            <button role="button">15%</button>
                        </li>
                        <li role="listitem">
                            <button role="button">25%</button>
                        </li>
                        <li role="listitem">
                            <button role="button">50%</button>
                        </li>
                        <li role="listitem">
                            <input type="text" placeholder="custom" />
                        </li>
                    </ul>
                </div>
                <nmbrOfpeopleForm />
            </div>
            <div class="right">
                <div class="top">
                    <div class="tip-amount-person">
                        <div>
                            <span>Tip Amount</span>
                            <span>/ person</span>
                        </div>
                        <span id="tip-person">$0.00</span>
                    </div>
                    <div class="total">
                        <div>
                            <span>Total</span>
                            <span>/ person</span>
                        </div>
                        <span id="total-per-person">$0.00</span>
                    </div>
                </div>
                <div class="bottom">
                    <button role="button" id="reset">reset</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.parent {
    width: 50%;
    margin: 0px auto;
    @media (max-width: 1199px) {
        width: 60%;
    }
    @media (max-width: 992px) {
        width: 80%;
    }
    @media (max-width: 576px) {
        width: 100%;
    }
    h1 {
        text-align: center;
        text-transform: uppercase;
        color: var(--Dark-grayish-cyan-2);

        letter-spacing: 19px;
    }
    .main-box {
        margin-top: 50px;
        padding: 25px;
        @media (max-width: 576px) {
            padding: 30px 20px;
        }
        border-radius: 15px;
        min-height: 400px;
        background-color: var(--White);
    }
}
$space-padding: 10px;
$spac-between-el: 30px;
.main-box {
    display: flex;
    flex-wrap: wrap;
    column-gap: 40px;
    @media (max-width: 768px) {
        row-gap: 40px;
    }
    > div {
        flex: 1;
    }
    @media (max-width: 768px) {
        flex-direction: column;
    }
    .left {
        .tip-amount {
            margin: $spac-between-el 0px;
            h2 {
                font-size: 16px;
                text-transform: capitalize;
                color: var(--Dark-grayish-cyan-2);
                margin-bottom: 15px;
            }
            ul {
                list-style: none;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                row-gap: 10px;
                li {
                    width: calc(90% / 3);
                    @media (max-width: 576px) {
                        width: calc(90% / 2);
                    }
                    button,
                    input {
                        display: block;
                        width: 100%;
                        text-align: center;
                        padding: 8px 10px;
                        border-radius: 6px;
                        border: none;
                        font-weight: 700;
                        &:focus {
                            outline: none;
                        }
                        text-transform: capitalize;
                        font-size: 18px;
                    }
                    &.selected {
                        button {
                            color: var(--Very-dark-cyan);
                            background-color: var(--Strong-cyan);
                        }
                        input {
                            outline: 2px solid var(--Strong-cyan);
                        }
                    }
                    button {
                        cursor: pointer;
                        background: var(--Very-dark-cyan);
                        color: var(--White);
                        &:hover {
                            background-color: #9fe8df;
                            color: var(--Very-dark-cyan);
                        }
                    }
                    input {
                        background-color: var(--Light-grayish-cyan-1);
                        color: var(--Very-dark-cyan);
                        &::placeholder {
                            color: var(--Dark-grayish-cyan-2);
                        }
                        &.selected {
                            outline: 2px solid var(--Strong-cyan);
                        }
                    }
                }
            }
        }
    }
    .right {
        min-height: 280px;
        background-color: var(--Very-dark-cyan);
        border-radius: 18px;
        padding: 40px 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top {
            > div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                > span {
                    font-size: 29px;
                    color: var(--Strong-cyan);
                }
                > div {
                    span {
                        display: block;
                        &:nth-child(1) {
                            color: var(--Light-grayish-cyan-1);
                            & + span {
                                color: var(--Dark-grayish-cyan-2);
                                font-size: 14px;
                                margin-top: 8px;
                            }
                        }
                    }
                }
            }
        }
        .bottom {
            button {
                display: block;
                width: 100%;
                padding: 9px;
                text-transform: uppercase;
                background-color: var(--Strong-cyan);
                font-size: 15px;
                color: var(--Very-dark-cyan);
                border: none;
                cursor: pointer;
                font-weight: 700;
                letter-spacing: 3px;
                &:hover {
                    background-color: var(--Light-grayish-cyan-2);
                }
            }
        }
    }
}
</style>
