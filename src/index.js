import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './jogo_velha.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


function Quadrado(props){
    return(
        <button className='quadrado' onClick={props.onClick}>{props.value}</button>
    );
}

//class Quadrado extends React.Component{ constructor(props){ super(props); this.state = { value:null,}; } render(){ return( <button className="quadrado"  onClick={() =>this.props.onClick()}> {this.props.value}</button>);}}

class Bordas extends React.Component{
    //constructor(props){ super(props); this.state = { quadrados: Array(9).fill(null),   xIsNext: true, };}
   // handleClick(i){const historico = this.state.historico; const atual = historico[historico.length - 1]; const quadrados = this.state.quadrados.slice();if (calculateWinner(quadrados) || quadrados[i]){return;}quadrados[i] = this.state.xIsNext ? 'X' : 'O';this.setState({historico : historico.concat([{quadrados: quadrados,}]), xIsNext: !this.state.xIsNext,});  }

    renderQuadrado(i){
        return (<Quadrado value={this.props.quadrados[i]}
                onClick={() => this.props.onClick(i)}/>
        );
    }
    render(){
        //const winner = calculateWinner(this.state.quadrados);let status; if (winner) {status = 'Vencedor: ' + winner } else { status = 'Proximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O')}
        
        return(
            <div>
               {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderQuadrado(0)}
                    {this.renderQuadrado(1)}
                    {this.renderQuadrado(2)}
                </div>
                <div className="board-row">
                    {this.renderQuadrado(3)}
                    {this.renderQuadrado(4)}
                    {this.renderQuadrado(5)}
                </div>
                <div className="board-row">
                    {this.renderQuadrado(6)}
                    {this.renderQuadrado(7)}
                    {this.renderQuadrado(8)}
                </div>
            </div>
        );
    }
}

class Jogo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            historico: [{ quadrados: Array(9).fill(null)}], 
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i){

    const historico = this.state.historico.slice(0, this.state.stepNumber + 1);
    const atual = historico[historico.length - 1];
    const quadrados = atual.quadrados.slice();

        if (calculateWinner(quadrados) || quadrados[i]){
            return;
        }
        quadrados[i] = this.state.xIsNext ? 'X' : 'O';
       this.setState({historico : historico.concat([{quadrados: quadrados}]),
       stepNumber: historico.length,
        xIsNext: !this.state.xIsNext,});
       }

       jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
        });
      }

    render(){

        const historico = this.state.historico;
       const atual = historico[this.state.stepNumber];
        const winner = calculateWinner(atual.quadrados);

        const movimentos = historico.map((step, movendo) => {
            const desc = movendo ? ' movimeto ' + movendo : 'Voltar ao início do jogo';

            return(
                <li key={movendo}>
                   
                    <button onClick={() => this.jumpTo(movendo)}>{desc}</button>
                </li>
            );
        })
        let status;
        if (winner) {
            status = 'Vencedor: ' + winner;
          } else {
            status = 'Próximo Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
          }

        return(
            <div className="jogo">
                 <div className="jogo-borda"> <Bordas quadrados={atual.quadrados} 
                                                onClick={(i) => this.handleClick(i)}/></div>
                 <div className="info-jogo">
                    <div>{status}</div>
                    <ol>{movimentos}</ol>
                 </div>
            </div>

        );

    }
}

ReactDOM.render(
    <Jogo/>,document.getElementById('root')
);
//serviceWorker.unregister();


function calculateWinner(quadrados) {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
        return quadrados[a];
      }
    }
       return null;
  }