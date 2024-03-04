class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriend();
    }

    toggleFriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

    console.log("executed friend");

            $.ajax({
                type : "POST",
                url : $(self).attr('href')
            })
            .done(function(data){
                if(data.data.deleted == true){
                    $(self).html('Follow');
                }else{
                    $(self).html('Following');
                }
            })
            .fail(function(errData){
                console.log("error in completing the request");
            })
        })
        
    }
}