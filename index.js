$(document).ready(function () {

    requestAllComments =  () => {
        let CmList =  getCommentsFromServer.responseJSON
        displaycommentsListInTable(CmList)
    }

    requestCommentsById = () => {
        let CmList = getCommentsFromServer.responseJSON
        let commentsById = Number(document.getElementById("search-Input").value)
        displaycommentsByIdListInTable(CmList, commentsById)
    }

    const getCommentsFromServer = $.ajax({
        dataType: 'json',
        url: "https://jsonplaceholder.typicode.com/comments",
        data: { get_param: 'value' },
        success: function (result) {
            return result
        }
    });


    $('#buttonGetCommentsByPostId').click(function () {
        let commentsList = getCommentsFromServer.responseJSON
        let postIdSelection = Number(document.getElementById("search-Input").value)
        displaycommentsByIdListInTable(commentsList, postIdSelection)
    })

    $('#buttonGetComments').click(function () {
        let commentsList = getCommentsFromServer.responseJSON
        displaycommentsListInTable(commentsList)
    })

    const displaycommentsListInTable = (commentsList) => {
        const commentsTableBody = document.getElementById("todo-table-body")
        let tableRows = ''
        for (let commentsElement of commentsList) {


            tableRows += `
        <tr>
        <td>${commentsElement.id}</td>
        <td class="name">${commentsElement.name}</td>
        <td>${commentsElement.email}</td>
                        <td>${commentsElement.body}</td>
                        </tr>
                        `

        }
        $("#todo-table-body").append(tableRows)
    }
    const displaycommentsByIdListInTable = (commentsList, commentsById) => {
        let tableRows = ''
        for (let commentsElement of commentsList) {
            if (commentsElement.postId === commentsById)
                tableRows += `
                        <tr>
                        <td>${commentsElement.id}</td>
                        <td class="name">${commentsElement.name}</td>
                        <td>${commentsElement.email}</td>
                        <td>${commentsElement.body}</td>
                        </tr>
                        `

        }
        $("#todo-table-body").append(tableRows)
    }


        $("#filter-input").keyup(function () {
            $("#main-table td.name:contains('" + $(this).val() + "')").parent().show();
            $("#main-table td.name:not(:contains('" + $(this).val() + "'))").parent().hide();
        });


});