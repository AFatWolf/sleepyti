$(document).ready(() => {
    $("#sleep").submit(validSubmit);

    handleLayout = () => {
        $("h1").addClass("display-3");

        // $("select").addClass("col-md-2 form-control input-sm");
        // $("button").addClass("btn btn-info");
    
    };
    handleLayout();
});

function validSubmit()
{
   
    let hour = $(this).find("[name=hour] option:selected").text();
    let minute = $(this).find("[name=minute] option:selected").text();
    let ampm = $(this).find("[name=ampm] option:selected").text();
    console.log(`${hour}:${minute}`);
    if(hour === "(hour)" || minute === "(minute)")
    {
        alert("Choose an hour and minute before processing!");
        event.preventDefault();
    }
}