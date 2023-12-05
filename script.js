const game = {
    width: 3,
    height: 3,
    board : [],
    el: null,
    turn: true,

    //methods
    generateBoard(){
        this.board = []
        for (let i = 0; i < this.height; i++) {
            let hb = []
            for (let j = 0; j < this.width; j++) {
                hb.push(0)
            }
            this.board.push(hb)
        }
    },

    draw(){
      let content = ''
        for (let i = 0; i < this.height; i++) {
            content += '<tr>'
            for (let j = 0; j < this.width; j++) {
                content += `<td onclick="game.clicked(${i}, ${j})">${this.board[i][j] === 0 ? '' : this.board[i][j]}</td>`
            }
            content += '</tr>'
        }
        this.el.innerHTML = content
    },

    clicked(i, j){
      if (this.board[i][j] === 0) {
          this.board[i][j] = this.turn ? 'X' : 'O'
          this.checkWinner()
          this.turn = !this.turn
          this.draw()
      }
    },

    restart(){
      this.generateBoard()
      this.draw()
    },

    checkWinner(){
        let is_restart = false
        let a = this.board
        //first check horizontal
        for (let i = 0; i < this.height; i++) {
            if (
                a[i][0] !== 0 &&
                a[i][0] === a[i][1] &&
                a[i][1] === a[i][2]
            ){
                is_restart = window.confirm(`${a[i][0]} is winner. Would you like to play again?`)

            }
        }

        //check vertical

        for (let i = 0; i < this.width; i++) {
            if (
                a[0][i] !== 0 &&
                a[0][i] === a[1][i] &&
                a[1][i] === a[2][i]
            ){
                is_restart = window.confirm(`${a[0][i]} is winner. Would you like to play again?`)
            }
        }

        //now check diagonal

        if (
            a[0][0] !== 0 &&
            a[0][0] === a[1][1] &&
            a[1][1] === a[2][2]
        ){
            is_restart = window.confirm(`${a[0][0]} is winner. Would you like to play again?`)
        }

        if (
            a[0][2] !== 0 &&
            a[0][2] === a[1][1] &&
            a[1][1] === a[2][0]
        ){
            is_restart = window.confirm(`${a[1][1]} is winner. Would you like to play again?`)
        }

        //now check draw
        let draw = true
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (a[i][j] == 0) draw = false
            }
        }

        if (draw){
            is_restart = window.confirm(`Game is draw. Would you like to play again?`)
        }

        if (is_restart){
            this.restart()
        }
    },

    init(){
        this.generateBoard()
        this.el = document.getElementById('board')
        this.draw()
    }
}

game.init()