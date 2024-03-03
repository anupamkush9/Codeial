{
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(), // convert into json form
                success :  function(data){
                    let newPost = newPostDom(data.data);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($('.delete-post-button', newPost));
                    clickLike($('.toggle-like-button', newPost));
                    createComment('#new-comment', newPost);
                    flash(data.data.message);
                    $('#post-textArea').val("");
                },
                error : function(err){
                    console.log(err.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(data){
        return $(`<li id="post-${data.post._id}">
        <p>${ data.post.content } <br>
        <small> ${data.name } 
        
                  <a class="delete-post-button" href="/posts/destroy/${data.post._id}">Delete</a>
    
         </small>
          
         <small>
                            
                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${data.post._id}&type=Post">
                    0 Likes
                </a>
                            
        </small></p>
         
        <!-- Displaying post comments -->

        <div class="post-comments">
                     
            <div class="post-comments-list">
                <ul id="post-comments-${ data.post._id }">
                    
                </ul>
            </div>

            <form action="/comments/create" id="new-comment" method="POST">
                <textarea type="text" name="content" cols="25" rows="5" placeholder="Type comment..." required></textarea>
                <input type="hidden" name="post" value="${ data.post._id }" ><br>
                <input type="submit" value="Add Comment">
            </form>
               
        </div>

</li>`);
    }

    let clickLike = function(likeLink){
        $(likeLink).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });

        });
    }

    //method to delete post in DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    flash(data.data.message);
                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    //method to cereate post
    let createComment = function(createCommentLink){
        let newComment = $(createCommentLink);

        newComment.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : newComment.serialize(),
                success : function(data){
                    let commentDom = newCommentDom(data.data);
                    $(`#post-comments-${ data.data.comment.post}`).prepend(commentDom);
                    deleteComment('.delete-comment', commentDom);
                    flash(data.data.message);
                    newComment.find('textarea').val("");
                },error : function(error){
                    console.log(err.responseText);
                }
            })
        })
    }

    //method to display comment in DOM
    function newCommentDom(data){
        return $(`<li id="comment-${data.comment._id}" ><p> ${data.comment.content}</p>
                    <small>${data.name }
                        <a class="delete-comment" href="/comments/destroy/${data.comment._id}">Delete</a>
                    </small>
                    <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${data.comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
                    </small>
            </li>`)
    }

    //method to delete comment
    function deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    flash(data.message);
                },error : function(err){
                    console.log(err.responseText);
                }
            })
        }
        )
    }

    // method to flash messages
    let flash = function(message){
        new Noty({
            theme:  'relax',
            text:   message,
            type : 'success',
            layout : 'topRight',
            timeout   : 1500
        }).show();
    }

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }

    createPost();
    convertPostsToAjax();
}