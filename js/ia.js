$(document).ready(function(){

    board = new Board();
    var currPlayer = 'X';
    var scoreX = 0;
    var scoreO = 0;

    $('.cell').css('cursor','pointer');

    $('.cell').click( function(){
        let clickedCell = $(this).attr('id');

        //if the cell is empty, we add the current user
        if($('#'+clickedCell).is(':empty')){
            $('#'+clickedCell).append('<h1>'+currPlayer+'</h1>');
            $('#'+clickedCell).css('cursor','not-allowed')
            board.setState(clickedCell,currPlayer);

            if(winner = board.hasWinner()){
                if(winner == 'none'){
                    $('#whoWin').append("It's a draw !");
                }else{
                    $('#whoWin').append(winner+' a gagné !');
                    if(winner == 'X'){
                        scoreX++;
                        $('#scoreX').html(scoreX);
                        
                    }else if(winner == 'O'){
                        scoreO++;
                        $('#scoreO').html(scoreO);
                    }
                }
                $('.win-message').first().css('display','flex');
            }else{

            //ia turn-----
            iaTurn(board);
            //------------
            
            if(winner = board.hasWinner()){
                if(winner == 'none'){
                    $('#whoWin').append("It's a draw !");
                }else{
                    $('#whoWin').append(winner+' a gagné !');
                    if(winner == 'X'){
                        scoreX++;
                        $('#scoreX').html(scoreX);
                        
                    }else if(winner == 'O'){
                        scoreO++;
                        $('#scoreO').html(scoreO);
                    }
                }
                $('.win-message').first().css('display','flex');
            }
            }

        }
        
        
        

        
    });

    $('#restart').click( function(){
        board.reset();
        $('#whoWin').empty();
        $('.win-message').first().css('display','none');
        $('.cell').empty();
        $('.cell').css('cursor','pointer');
    });
});

function iaTurn(board){
    let currPlayer = 'O';


    console.log(board.availables);
    let len = board.availables.length-1
    let rand = Math.floor(Math.random() * (len - 0 +1)) + 0
    let moove = board.availables[rand];
    let clickedCell = moove;

    $('#'+clickedCell).append('<h1>'+currPlayer+'</h1>');
    $('#'+clickedCell).css('cursor','not-allowed')
    board.setState(clickedCell,currPlayer);
}

class Board{

    state = [0,0,0,
             0,0,0,
             0,0,0]
    availables = [1,2,3,4,5,6,7,8,9]

    setState(i,value){
        this.availables = this.availables.filter(function(value,index,arr){
            return value != i;
        })
        this.state[i-1]=value;
    }
    isFull(){
        for(let i = 0; i < 9 ; i++){
            if(this.state[i] == 0){
                return false;
            }
        }
        return true;
    }

    reset(){
       this.state = [0,0,0,
                     0,0,0,
                     0,0,0]; 
        this.availables = [1,2,3,4,5,6,7,8,9]
    }

    hasWinner(){
        if(this.isFull()){
            return 'none';
        }
        // check column and lines
        for(let i = 0; i < 3; i++){
            // check column
            if(this.state[0+i] == 'X' && this.state[3+i] == 'X' && this.state[6+i] == 'X'){
                return 'X';
            }
            if(this.state[0+i] == 'O' && this.state[3+i] == 'O' && this.state[6+i] == 'O'){
                return 'O';
            }
            //check lines
            if(this.state[0+(i*3)] == 'X' && this.state[1+(i*3)] == 'X' && this.state[2+(i*3)] == 'X'){
                return 'X';
            }
            if(this.state[0+(i*3)] == 'O' && this.state[1+(i*3)] == 'O' && this.state[2+(i*3)] == 'O'){
                return 'O';
            }
        }
        //check top left diag
        if(this.state[0] == 'X' && this.state[4] == 'X' && this.state[8] == 'X'){
            return 'X';
        }
        if(this.state[0] == 'O' && this.state[4] == 'O' && this.state[8] == 'O'){
            return 'O';
        }
        // check top right diag
        if(this.state[2] == 'X' && this.state[4] == 'X' && this.state[6] == 'X'){
            return 'X';
        }
        if(this.state[2] == 'O' && this.state[4] == 'O' && this.state[6] == 'O'){
            return 'O';
        }
        return false;
    }


}