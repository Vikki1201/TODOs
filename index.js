$(document).ready(function() {

    var getAndDisplayAllTasks = function (filter) {
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1209',
        dataType: 'json',
        success: function (response, textStatus) {
            $('#todo-list').empty();
            response.tasks.forEach(function (task) {
                if ((filter === 'all') ||
                    (filter === 'active' && !task.completed) ||
                    (filter === 'completed' && task.completed)) {
                        var textDecoration = task.completed ? 'line-through' : 'none';
                    $('#todo-list').append('<div class="row"><div class="col-xs-8 d-flex justify-content-start"><input type="checkbox" class="mark-complete me-3" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><span class="text-center p-2" style="text-decoration:' + textDecoration + '";>' + task.content + '</span><button type="button" class="btn delete ms-auto" data-id="' + task.id + '"><svg width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg></button></div><hr/></div>');
                }
            });
        },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
      }); 
    }

    var createTask = function () {
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1209',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                content: $('#new-task-content').val()
            }
            }),
            success: function (response, textStatus) {
                $('#new-task-content').val('');
                getAndDisplayAllTasks('all');
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });  
    }

    $('#create-task').on('submit', function (ele) {
        ele.preventDefault();
        createTask();
    });

    var deleteTask = function(id) {
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1209',
            success: function (response, textStatus) {
                getAndDisplayAllTasks('all');
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
    });

    var markTaskComplete = function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=1209',
            dataType: 'json',
            success: function (response, textStatus) {
                getAndDisplayAllTasks(filter);
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });  
    }

    var markTaskActive = function (id) {
        $.ajax({
            type: 'PUT',
                url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=1209',
                dataType: 'json',
                success: function (response, textStatus) {
                    getAndDisplayAllTasks(filter);
                },
                error: function (request, textStatus, errorMessage) {
                    console.log(errorMessage);
                }
        });
    }

    $(document).on('change', '.mark-complete', function () {
        var textToCross = $(this).siblings('span');
        if (this.checked) {
            markTaskComplete($(this).data('id'));
            textToCross.css('text-decoration', 'line-through');
        } else {
            markTaskActive($(this).data('id'));
            textToCross.css('text-decoration', 'none');
        }
    });

    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');
        getAndDisplayAllTasks(filter);
    });
    
    getAndDisplayAllTasks('all');
});
  