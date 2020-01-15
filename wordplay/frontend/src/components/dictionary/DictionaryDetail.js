import React, {Component, Fragment} from "react"
import ReactDOM from "react-dom"
import 'babel-polyfill';
import store from "../../store"
import {Link, Redirect} from "react-router-dom";
import {tokenConfig} from "../../actions/auth";
import axios from "axios";


class Dictionary extends Component{
    state = {
        ru_word: "",
        en_word: "",
        example: "",
        status: "Необходимо повторить",

        countOfLearningWord: 0,
        lengthWords: 0,
        dictionary: {},

        words: [],
        count: 0,
        next: "",
        previous: "",
    };

     async deleteDictionary () {
       try {
         let result = await axios.delete((`http://localhost:8000/learning/api/dictionaries/detail/${this.props.match.params.id}`), tokenConfig())
       } catch(err){
         console.log("error", err)
       }
      };

     routeChange () {
         let path = `/dictionaries`;
         this.props.history.push(path);
     }

     async deleteWord(id){
       try {
         let result = await axios.delete(`http://localhost:8000/learning/api/word/detail/${id}`, tokenConfig())
         this.setState({words: this.state.words.filter(word => word.id !== id)})
       } catch (err){
         console.log("error", err)
       }

    }

     async getWords (url) {
       try {
         let result = await axios.get(url,  tokenConfig())
         this.setState({
           words: result.data.results,
           count: result.data.count,
           next: result.data.next,
           previous: result.data.previous
         })
       } catch (err){
         console.log("error", err)
       }
     };

    async getDictionary(){
      try {
        let result = await axios.get(`http://localhost:8000/learning/api/dictionaries/detail/${this.props.match.params.id}`, tokenConfig())
        this.setState({dictionary: result.data})
      } catch (err){
        console.log("error", err)
      }
    }

    async updateDictionary(){
      try {
        let result = await axios.get(`http://localhost:8000/learning/api/dictionary/update/${this.props.match.params.id}`, tokenConfig())
      } catch (err){
        console.log("error", err)
      }
    }


     componentDidMount(){
        this.getDictionary();
        this.getWords(`http://localhost:8000/learning/api/dictionary/words/${this.props.match.params.id}`);
        this.progressBar()
    }

    progressBar(){
          let countOfLearningWords = 0;
          const lengthWords = this.state.words.length;
          this.state.words.map((word)=> (word.status === "Изучено" ? countOfLearningWords++: countOfLearningWords));

            this.setState(()=>{
               return {countOfLearningWords: countOfLearningWords, lengthWords: lengthWords}
            });
    }

    async createWord(){
      try {
        let result = await axios.post('http://localhost:8000/learning/api/word/create/', {
          ru_word: this.state.ru_word,
          en_word: this.state.en_word,
          example: this.state.example,
          dictionary: this.props.match.params.id,
        }, tokenConfig())
        this.setState({words: [result.data.word, ...this.state.words]})
      } catch (err){
        console.log("error", err)
      }
    }

    onSubmit = async e => {
      try {
        e.preventDefault();
        await this.createWord()
        this.getWords()
      } catch (err){
        "error", err
      }
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    render(){
        const {ru_word, en_word, example, title} = this.state;
        const persent = (this.state.countOfLearningWord / this.state.lengthWords) * 100;                               // Сколько слов выучено в процентах
        return(
            <Fragment>
                <div className="row">
                    <div className="col">
                        <h3>{this.state.dictionary.title}</h3>
                    </div>
                    <div className="col">
                        <Link to={`/learning/${this.props.match.params.id}`} >
                            <button className="dictionary-button" onClick={(()=>{
                              this.updateDictionary()
                            })}>Изучить</button>
                        </Link>
                    </div>
                    <div className="col text-right">
                        <h3>Количество слов: {this.state.words.length}</h3>
                    </div>
                </div>

                {/*Показывает прогресс изучения словаря*/}
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: persent + "%"}} aria-valuenow="100"
                         aria-valuemin="0" aria-valuemax="100">
                    </div>
                </div>


                {/*Форма для создания слова. Находится в первой строке таблицы*/}
                <form onSubmit={this.onSubmit} id="create_word">
                </form>

                <table className="table table-striped text-center">
                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Слово</th>
                            <th>Перевод</th>
                            <th>Прогресс изучения</th>
                            <th>Пример</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                    <tr>
                            <td>
                                #
                            </td>
                            <td>
                                <input
                                type="text"
                                className="form-control"
                                name="ru_word"
                                onChange={this.onChange}
                                value={ru_word}
                                form="create_word"/>
                            </td>
                             <td>
                                 <input
                                type="text"
                                className="form-control"
                                name="en_word"
                                onChange={this.onChange}
                                value={en_word} />
                            </td>
                            <td>

                            </td>
                            <td>
                                  <input
                                type="text"
                                className="form-control"
                                name="example"
                                onChange={this.onChange}
                                value={example} />
                            </td>
                            <td>
                                <input type="submit" className="btn btn-primary btn-sm"
                                       form="create_word" value="Add"/>
                            </td>
                        </tr>


                      {this.state.words.map((word, index) => (
                          <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{word.ru_word}</td>
                              <td>{word.en_word}</td>
                              <td>{word.status}</td>
                              <td>{word.example}</td>
                              <td>
                                  <button
                                      onClick={() => this.deleteWord(word.id)}
                                      className="btn btn-danger btn-sm">
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      ))}
                    </tbody>
                </table>

                <div className="text-center">
                    <button disabled={!this.state.previous} onClick={()=> this.getWords(this.state.previous)}>
                        prev
                    </button>
                    <button disabled={!this.state.next} onClick={()=> this.getWords(this.state.next)}>
                        next
                    </button>

                </div>

                <div className="text-left">
                    <button
                        onClick={()=>{
                            this.deleteDictionary().then(()=>{
                                this.routeChange()
                            })
                        }}
                    className="btn btn-danger btn-sm">
                    Удалить словарь
                </button>
                </div>
            </Fragment>
        )
    }
}

export default Dictionary
