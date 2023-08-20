$(function () {
    var planName;
    var planCost;
    var addOns = [];
    var monthly = true;

    $(".toggle-div").on("click", function () {
        if (monthly) {
            monthly = false;
            $(".toggle").css("justify-content", "end");

            $(".monthly").removeClass("toggled");
            $(".yearly").addClass("toggled");

            $(".year-span").removeClass("hide");
            $(".month-span").addClass("hide");
        } else {
            monthly = true;
            $(".toggle").css("justify-content", "start");

            $(".monthly").addClass("toggled");
            $(".yearly").removeClass("toggled");

            $(".year-span").addClass("hide");
            $(".month-span").removeClass("hide");
        }
    });

    function selectForm(formNum) {
        $(`.form-${formNum}`).css("display", "flex");
        $(`section:not(.form-${formNum})`).css("display", "none");
        selectedForm = formNum;
        $(`.step${formNum} span`).addClass("selected-step");
        $(`:not(.step${formNum} span)`).removeClass("selected-step");
    }

    // Next-buttons;
    for (let i = 3; i < 5; i++) {
        $(`.form-${i} .next-btn`).on("click.next", () => selectForm(i + 1));
    }
    // Back-buttons
    for (let i = 1; i <= 4; i++) {
        $(`.form-${i} .back-btn`).on("click", () => selectForm(i - 1));
    }
    // Steps
    for (let i = 1; i <= 4; i++) {
        $(`.step${i}`).on("click", () => selectForm(i));
    }
    // Confirmation
    $(".form-4 .conf-btn").on("click", () => selectForm(5));

    // Signup Form.
    $(".form-1 .next-btn").on("click", () => {
        _name = $(".input-div:nth(0) input");
        email = $(".input-div:nth(1) input");
        phone = $(".input-div:nth(2) input");
        fields = [_name, email, phone];

        for (let field of fields) {
            if (field.val() === "") {
                field.next().removeClass("hide");
                field.addClass("error");
            } else {
                field.next().addClass("hide");
                field.removeClass("error");
            }
        }
        if (_name.val() && email.val() && phone.val()) {
            selectForm(2);
        }
    });

    // Plan-Form
    // Selection
    for (let i = 0; i <= 3; i++) {
        $(`.plan-div:nth(${i})`).on("click", () => {
            $(`.plan-div:nth(${i})`).addClass("selected");
            $(`:not(.plan-div:nth(${i}))`).removeClass("selected");
            planName = $(`.plan-div:nth(${i})`).find("h4").html();
            planCost = monthly
                ? $(`.plan-div:nth(${i})`).find("span.month-span").html()
                : $(`.plan-div:nth(${i})`).find("span.year-span").html();
        });
    }
    // Plan-form Submission
    $(".form-2 .next-btn").on("click", () => {
        for (let i = 0; i <= 3; i++) {
            if ($(`.plan-div:nth(${i})`).hasClass("selected")) {
                planName = $(`.plan-div:nth(${i})`).find("h4").html();
                planCost = monthly
                    ? $(`.plan-div:nth(${i})`).find("span.month-span").html()
                    : $(`.plan-div:nth(${i})`).find("span.year-span").html();
            }
        }
        if (planName && planCost) {
            selectForm(3);
            $(".plan-error").addClass("hide");
        } else {
            $(".plan-error").removeClass("hide");
        }
    });

    // Add-Ons Form
    // Selection
    for (let i = 0; i <= 3; i++) {
        $(`.add-on:nth(${i})`).on("click", () => {
            $(`.add-on:nth(${i})`).toggleClass("selected");
            $(`.add-on:nth(${i})`).find("div.checkbox").toggleClass("checked");
        });
    }
    //Add-Ons Submission
    $(".form-3 .next-btn").on("click", () => {
        addOns = [];
        for (let i = 0; i <= 3; i++) {
            var addOn = $(`.add-on:nth(${i})`).find("h4").html();
            cost = monthly
                ? $(`.add-on:nth(${i})`).find("span.month-span").html()
                : $(`.add-on:nth(${i})`).find("span.year-span").html();
            if (
                $(`.add-on:nth(${i})`)
                    .find("div.checkbox")
                    .hasClass("checked") &&
                !addOns?.find((x) => x.addOn === addOn)
            ) {
                addOns.push({
                    addOn: $(`.add-on:nth(${i})`).find("h4").html(),
                    cost: cost,
                });
            }
        }
    });

    // Summary
    $(".form-3 .next-btn").on("click", () => {
        total = 0;
        if (planCost && planName) {
            $(".form-4 .content h4").text(planName);
            $(".form-4 .content span").text(planCost);
            total += Number(planCost.match(/(\d+)/)[0]);
        }

        if (addOns.length != 0) {
            $(".added").remove();
            for (let x of addOns) {
                total += Number(x.cost.match(/(\d+)/)[0]);
                $(".form-4 .content").append(
                    ` <div class="add-on added">
                        <h5>${x.addOn}</h5>
                        <span>${x.cost}</span>
                    </div>`
                );
            }
        }

        $(".form-4 .total h4").text(`$${Number(total)}`);
    });

    $("#change").on("click", () => selectForm(2));
});
