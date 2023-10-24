$(function () {

    var planName;
    var planCost;
    var addOns = [];
    var monthly = true;


    // Step 2 Toggle.
    $(".toggle-div").on("click", function () {
        $(".year").toggle().removeClass("hide");
        $(".month").toggle().addClass("hide");
        monthly = !monthly
    });

    // Select Form.
    function selectForm(formNum) {
        $(`.form-${formNum}`).css("display", "flex");
        $(`section:not(.form-${formNum})`).hide();

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
                field.next().show();
                field.addClass("error");
            } else {
                field.next().hide();
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
        });
    }
    // Plan-Form 
    // Submission
    $(".form-2 .next-btn").on("click", () => {
        for (let i = 0; i <= 3; i++) {
            if ($(`.plan-div:nth(${i})`).hasClass("selected")) {
                planName = $(`.plan-div:nth(${i})`).find("h4").html();
                planCost = monthly
                    ? $(`.plan-div:nth(${i})`).find("span.month").html()
                    : $(`.plan-div:nth(${i})`).find("span.year").html();
            }
        }
        if (planName && planCost) {
            selectForm(3);
            $(".plan-error").hide();
        } else {
            $(".plan-error").show();
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
    //Add-Ons Form
    // Submission
    $(".form-3 .next-btn").on("click", () => {
        addOns = [];
        for (let i = 0; i <= 3; i++) {
            var addOn = $(`.add-on:nth(${i})`).find("h4").html();
            var cost = monthly
                ? $(`.add-on:nth(${i})`).find("span.month").html()
                : $(`.add-on:nth(${i})`).find("span.year").html();

            if (
                $(`.add-on:nth(${i})`)
                    .find("div.checkbox")
                    .hasClass("checked") &&
                !addOns?.find((x) => x.addOn === addOn)
            ) {
                addOns.push({
                    addOn: $(`.add-on:nth(${i})`).find("h4").html(),
                    cost,
                });
            }
        }


    });

    // Summary
    $(".form-3 .next-btn").on("click", () => {
        total = 0;
        if (planCost) {
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
