<script setup>
import {onMounted} from "vue";
import calc from "../funcs/calculate";
onMounted(() => {
    let $errorMsg = document.querySelectorAll(".error-msg");
    let $nmberOfPeopleForm = document.querySelector("#number-of-people");
    $nmberOfPeopleForm.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    $nmberOfPeopleForm.addEventListener("input", (e) => {
        if (isNaN(e.target.value)) {
            $error(true, "Must be a number");
        } else if (e.target.value == "0") {
            $error(true, "cannot be zero");
        } else {
            $error(false);
            let $ob = JSON.parse(window.localStorage.getItem("target-obj"));
            $ob.nmberOfPeople = +e.target.value;
            window.localStorage.setItem("target-obj", JSON.stringify($ob));
            calc();
        }
    });
    function $error($status, $text = "") {
        if ($status) {
            $errorMsg[1].classList.add("active");
            $errorMsg[1].textContent = $text;
            $nmberOfPeopleForm.querySelector("input").classList.add("error");
        } else {
            $errorMsg[1].classList.remove("active");
            $errorMsg.textContent = $text;
            $nmberOfPeopleForm.querySelector("input").classList.remove("error");
        }
    }
});
</script>
<template>
    <form id="number-of-people">
        <div class="top-layer">
            <label for="nmbr-of-people" class="nmbr-of-people"
                >Number of people</label
            >
            <span class="error-msg active"> </span>
        </div>
        <div class="nmbr-of-people-input">
            <input
                autocomplete="off"
                type="text"
                name="nmbrofpeople"
                id="nmbr-of-people"
                placeholder="0"
            />
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16">
                    <path
                        fill="#9EBBBD"
                        d="M9.573 7.729c.406 0 .784.07 1.126.209.342.14.639.33.881.569.232.227.438.503.614.82a5.1 5.1 0 01.407.949c.097.312.178.654.242 1.016.062.359.105.699.126 1.011.02.307.031.624.031.945 0 .836-.259 1.512-.768 2.01-.504.492-1.17.742-1.98.742H2.748c-.81 0-1.477-.25-1.98-.742C.259 14.76 0 14.084 0 13.248c0-.322.01-.64.032-.945.02-.312.063-.652.126-1.01.063-.363.144-.705.242-1.017.1-.323.238-.643.407-.948.176-.318.382-.594.613-.821.243-.238.54-.43.882-.57.342-.138.72-.208 1.125-.208.16 0 .313.067.61.265.183.123.397.264.636.421.204.134.48.259.822.372.333.11.671.167 1.005.167a3.19 3.19 0 001.006-.167c.341-.113.618-.238.822-.372l.636-.42c.296-.2.45-.266.61-.266zM6.598 0C7.63 0 8.522.38 9.252 1.129s1.1 1.666 1.1 2.724c0 1.06-.37 1.976-1.1 2.725-.73.75-1.623 1.13-2.654 1.13-1.03 0-1.924-.38-2.653-1.13-.73-.749-1.1-1.666-1.1-2.725 0-1.058.37-1.975 1.1-2.724C4.675.379 5.567 0 6.598 0z"
                    />
                </svg>
            </span>
        </div>
    </form>
</template>
<style lang="scss" scoped>
form {
    .top-layer {
        margin-bottom: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nmbr-of-people {
            color: var(--Dark-grayish-cyan-2);
            text-transform: capitalize;
            font-size: 17px;

            display: block;
        }
        .error-msg {
            color: var(--red);
            font-size: 13px;
            text-transform: capitalize;
            display: none;
            &.active {
                display: block;
            }
        }
    }
    .nmbr-of-people-input {
        position: relative;
        input {
            position: relative;

            text-align: right;
            display: block;
            width: 100%;
            padding: 9px var(--space-padding);
            border-radius: 4px;
            border: none;
            background-color: var(--Light-grayish-cyan-1);
            font-size: 19px;
            color: var(--Very-dark-cyan);
            &::placeholder {
                color: var(--Dark-grayish-cyan-1);
            }
            &:focus {
                outline: 2px solid var(--Strong-cyan);
            }
            &.error {
                outline: 2px solid var(--red);
            }
        }

        .icon {
            position: absolute;
            top: 50%;
            transform: translateY(-39%);
            left: var(--space-padding);
        }
    }
}
</style>
