class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history
        const current = history[history.length - 1]
        const squares = this.state.squares.slice()

        if (calculateWinner(squares) || squares[i])
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
        })
    }
    
    // Board에서 Square로 value와 onClick 두 개의 props를 전달
    renderSquare(i) {
        return (
        <Square 
            value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)} 
        />
        );
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            value:null
        }
    }
    render() {
        const winner = calculateWinner(this.state.squares)
        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + this.state.xIsNext ? 'X' : 'O'
        }
        return (
            <button className='square' onClick={() => this.props.onClick()}>
                {this.state.value}
            </button>
        )
    }
}

// 함수 컴포넌트
function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    )
}

// 승자 결정하기 
function calculateWinner(squares) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a,b,c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
}

history = [
    {
        squares: [
            null, null, null, null, null, null, null, null, null, null,
        ]
    },
    {
        squares: [
            null, null, null, null, 'X', null, null, null,
        ]
    },
    {
        squares: [
            null, null, null, null, 'Y', null, null, null, 'O',
        ]
    }
]

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        }
    }

    render() {
        const history = this.state.history
        const current = history[history.length - 1]
        const winner = calculateWinner(current.squares)
        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div> </div>
                    <ol> </ol>
                </div>
            </div>
        )
    }
}

