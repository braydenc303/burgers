$(function(){
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var newDevoured = $(this).data("newdevoured");

        var newDevouredState = {
            devoured: newDevoured
        };

    $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
    }).then(
        function() {
            console.log("changed devoured to", newDevoured);
            //Reload the page to get the updated list
            location.reload();
        }
    );
    });

    $(".create-form").on("submit", function(event){
        //Make sure to prevenDefault on submit
        event.preventDefault();

        var newBurger = {
            burger_name: ($("#byob").val().trim() + " Burger"),
            devoured: false
            //May need to insert a value for devoured here as well.
        };

        //Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("cooked a new burger");
                //Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event){
        var id = $(this).data("id");

        //Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("deleted burger", id);
                //Reload the page to get the updated list
                location.reload();
            }
        );
    });
});