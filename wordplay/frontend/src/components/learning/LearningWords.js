import React, {Component, Fragment} from 'react'
import store from "../../store"
import {tokenConfig} from "../../actions/auth";
import {Link} from "react-router-dom";
import axios from "axios";


class LearningWords extends Component{
    state = {
        all_words: [],
        random_words: [],
        learning_word: {},
        continue: true,
        dictionaries:[],
        isLearningWord: false
    };

    putChangeWord(word){
         axios
            .put((`http://localhost:8000/learning/api/word/detail/${word.id}`), {
                    ru_word: word.ru_word,
                    en_word: word.en_word,
                    example: word.example,
                    status: word.status,
                    dictionary: word.dictionary,
                    progress: word.progress + 1
                }, tokenConfig(store.getState)
            )
            .then()


    }


    getAllWords = () => {
    return axios
        .get((`http://localhost:8000/learning/api/dictionary/words/learning/${this.props.match.params.id}`), tokenConfig(store.getState))
        .then(result => {
            this.setState((state)=>{
                return{
                    all_words : result.data
                }
            });
            }
        )
    };

    startLearning(){
        this.setState(()=>{
            return{
                all_words: [],
                random_words: [],
                learning_word: [],
                continue: true,
                isLearningWord: false

            }
        });

         this.getAllWords()
             .then(()=>{
               this.getWordForLearning()
          })
            .then(()=>{
                this.getRandomWords()
            })
            // Перемешиваем массив
            .then(()=>{
                this.setState((state)=>{
                    return {words: state.random_words.sort(()=>{
                            return Math.random() - 0.5;
                        })}
                });
            });
    }

    componentDidMount(){
        this.getDictionaries().then();
        this.startLearning()
        }

    getDictionaries(){
        return axios
            .get('http://localhost:8000/learning/api/dictionaries', tokenConfig())
            .then(result => this.setState(()=>{
                return {
                    dictionaries: result.data
                }
            }))
    }


    getWordForLearning(){                                                                                               // Ищем влово для изучения
        for (let i=0; i < this.state.all_words.length; i++)
            if (this.state.all_words[i].status === "Необходимо повторить"){
                this.setState((state)=>{
                    return {
                        learning_word: this.state.all_words[i],
                        random_words: [...state.random_words, this.state.all_words[i]],
                        isLearningWord: true
                    }
                });
                break;
            }
    }

    getRandomWords(){                                                                                                   // Добавляем несколько (3) рандомных слова
        for (let i = 0; i<this.state.all_words.length; i++){
            let random_word = this.state.all_words[Math.floor(Math.random() * this.state.all_words.length)];         // Получаем рандомное слово
            let flag = true;
                  for (let j=0; j < this.state.random_words.length; j++){
                    if (this.state.random_words[j] === random_word) {                                                   // Проверяем, нет ли этого слова в массиве random_words,
                        flag=false                                                                                      // чтобы исключить повторы слов
                    }
                }
                  if(flag){                                                                                             // Если повторов нет, добавляем слово в массив
                      this.setState((state)=>{
                            return {
                               random_words: [...state.random_words, random_word]
                           }
                        });
                  }
            if (this.state.random_words.length === 4){
                break
            }
        }
    }

    render(){
        const cards = <div>

            <div className="container-fluid mt-4">
                        <div className="row justify-content-center">

                                <div className="col-auto mb-3" key="0">
                                    <div className="row text-center h-100">
                                        <div className="col-md-3 text-center my-auto">
                                            <div className="card card-block d-flex learning-card">
                                                <div className="card-body align-items-center d-flex justify-content-center">
                                                    <h5 className="card-title align-items-center">{this.state.learning_word.ru_word}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>


                    <div className="container-fluid mt-4">
                        <div className="row justify-content-center">
                            {this.state.random_words.map((word, index)=>(
                                <div className="grow col-auto" key={index}>
                                    <div className="col-auto pb-5">
                                        <div className="row text-center h-100">
                                        <div className="col-pd-3 text-center my-auto " onClick={()=> {
                                            if (word === this.state.learning_word){
                                                word.status = "Изученно";
                                                if( word.progress < 4 ){
                                                    word.progress++
                                                }
                                                this.putChangeWord(word);
                                                this.setState((state)=>{
                                                    return {continue: false}
                                                })
                                            }
                                        }}>
                                            <div className="card card-block d-flex learning-card">
                                                <div className="card-body align-items-center d-flex justify-content-center">
                                                    <h5 className="card-title align-items-center">{word.en_word}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                            ))
                            }

                        </div>
                    </div>

            </div>;

        const no_words = <div className="row justify-content-center">
            <h1>Нет слов для изучения</h1>
        </div>;

        return(

             <Fragment>
                 {this.state.isLearningWord ? cards : no_words}


                 <div className="row justify-content-around">
                     <Link to={`/dictionaries/detail/${this.props.match.params.id}`} className="btn col col-lg-2 btn-danger">
                         Закончить
                     </Link>

                     <button className="btn col col-lg-2 btn-primary" disabled={this.state.continue} onClick={()=>{this.startLearning()}}>Продолжить</button>
                 </div>
                </Fragment>
        )
    }
}

export default LearningWords
