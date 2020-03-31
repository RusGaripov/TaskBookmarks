import React from 'react';
import { Button } from 'react-bootstrap';
import s from './List.module.css';
import PostData from "../data/tags.json"
import PostData2 from "../data/films.json"
import notBookmark from '../image/notBookmark.png';
import bookmark from '../image/bookmark.png';
import { NavLink } from 'react-router-dom'

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagId: null,
            filmId: null,
            films: null,
            tags: null,
            resultSum: [],
            filteredList: [],
            resultSumStore: [],
            query: null,
            activator: false,
            activator2: false,
            store: [],
            bookmarksId: [],
            bId: null,
            count: 1
        };
    }

    componentDidMount() {
        this.state.bookmarksId = JSON.parse(localStorage.getItem("d"))
        this.state.store = JSON.parse(localStorage.getItem("a"))
        this.setState({
            store: JSON.parse(localStorage.getItem("a")),
            bookmarksId: JSON.parse(localStorage.getItem("d"))
        })

        var a = JSON.parse(localStorage.getItem("a"))
        localStorage.setItem("a", JSON.stringify(a));

    }


    addToBookmarks = () => {
        var a = this.state.store
        localStorage.setItem("a", JSON.stringify(a));
    }


    addCounter = () => {
        this.state.count += 1
        this.setState({
            films: this.state.films
        })
    }


    filterByTag = async () => {
        var result = [];
        var resultSum = [];
        if (this.state.activator2 === true) {
            this.setState({
                films: PostData2
            })
        }

        for (var i = 0; i < this.state.films.length; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.state.films[i].tags[j] == this.state.tags[this.state.tagId - 1]) {
                    result.push(this.state.films[i])
                }
            }
        }
        this.state.resultSum.push(result)
        this.state.resultSumStore.push(this.state.tagId)

        for (var i = 0; i < this.state.resultSumStore.length; i++) {
            for (var j = 0; j < this.state.resultSumStore.length; j++) {
                if ((this.state.resultSumStore[i] == this.state.resultSumStore[j]) && (i != j)) {
                    this.state.resultSumStore.splice(i, 1)
                    this.state.resultSum.splice(this.state.resultSum.length - 1, 1)
                }
            }
        }

        for (var i = 0; i < this.state.resultSum.length; i++) {
            for (var j = 0; j < this.state.resultSum[i].length; j++) {
                this.state.filteredList.push(this.state.resultSum[i][j])
            }
        }
        this.state.resultSum = [];
        this.state.films = this.state.filteredList

        this.setState({
            films: this.state.filteredList,
            tags: null,
            activator: true,
            activator2: false
        })
    }


    handleSearch = async (text) => {
        var arr = [];
        var sum = 0;
        this.state.query = text.target.value
        this.setState({
            query: text.target.value,
            activator2: true
        })

        for (var i = 0; i < this.state.films.length; i++) {
            for (var j = 0; j < this.state.query.length; j++) {
                if (this.state.query[j] == this.state.films[i].title[j]) {
                    sum += 1
                }
            }
            if (sum == this.state.query.length)
                arr.push(this.state.films[i])
            sum = 0;
        }
        this.state.films = arr;
    }

    render() {
        return (
            <div className={s.container}>
                <div className={s.buttons}>
                    <Button className={s.button} variant="primary">Фильмы</Button>{' '}
                    <NavLink to="/bookmarks">  <Button className={s.button} variant="secondary">Закладки</Button>{' '}</NavLink>
                </div>

                {this.state.films == null || this.state.activator === false ? <div className={s.searchContainer}><textarea className={s.search} placeholder="Поиск" value={this.state.text}
                    onChange={(value) => {
                        this.state.films = PostData2;
                        this.handleSearch(value);
                    }
                    } /></div>
                    :
                    <div className={s.searchContainer}><textarea className={s.search} placeholder="Поиск" value={this.state.text}
                        onChange={(value) => {
                            this.state.films = this.state.filteredList
                            this.handleSearch(value);
                        }} /></div>
                }

                {this.state.tags == null ? <div className={s.tags}>{PostData.map((postDetail, index) => {
                    return <h1 className={s.tag} onClick={() => {
                        this.setState({
                            tagId: index + 1,
                            tags: PostData,
                            films: PostData2
                        });
                        this.state.tags = PostData;
                        this.state.films = PostData2;
                        this.state.tagId = index + 1
                        this.filterByTag()
                    }}
                    >{postDetail}</h1>
                })}
                </div>
                    :
                    <div className={s.tags}>{this.state.tags.map((postDetail, index) => {
                        return <h1 className={s.tag} onClick={() => {
                            this.setState({
                                tagId: index + 1,
                                tags: PostData,
                                films: PostData2
                            });
                            this.state.tagId = index + 1
                            this.filterByTag()
                        }}
                        >{postDetail}</h1>
                    })}
                    </div>
                }


                {this.state.films == null ? <div className={s.films}>{PostData2.map((postDetail, index) => {
                    if (index < 15 * this.state.count) {
                        var counter = 0;
                        for (var i = 0; i < this.state.bookmarksId.length; i++) {
                            if (this.state.bookmarksId[i] == index) {
                                counter += 1
                            }
                        }
                        return (<div className={s.filmString}><h1
                            className={s.film}>{postDetail.title}</h1>
                            {counter == 0 ? <img className={s.image} src={notBookmark} onClick={() => {
                                this.setState({

                                })
                                var sum = 0;
                                if (this.state.store.length > 1) {
                                    for (var i = 0; i < this.state.store.length; i++) {
                                        if (this.state.store[i].title == postDetail.title)
                                            sum += 1
                                    }
                                }
                                if (sum == 0) {
                                    this.state.store.push(postDetail)
                                    this.addToBookmarks()
                                }

                                this.state.bookmarksId.push(index);
                                var d = this.state.bookmarksId
                                localStorage.setItem("d", JSON.stringify(d));
                            }} />
                                :
                                <img className={s.image} src={bookmark} onClick={() => {
                                    var sum = 0;
                                    if (this.state.store.length > 1) {
                                        for (var i = 0; i < this.state.store.length; i++) {
                                            if (this.state.store[i].title == postDetail.title)
                                                sum += 1
                                        }
                                    }
                                    if (sum == 0) {
                                        this.state.store.push(postDetail)
                                        this.addToBookmarks()
                                    }

                                    this.state.bookmarksId.push(index);
                                    var d = this.state.bookmarksId
                                    localStorage.setItem("d", JSON.stringify(d));
                                }} />

                            }
                        </div>
                        )
                    }
                })}
                </div>
                    :
                    <div className={s.films}>{this.state.films.map((postDetail, index) => {
                        if (index < 15 * this.state.count) {
                            var counter = 0;
                            for (var i = 0; i < this.state.bookmarksId.length; i++) {
                                for (var j = 0; j < PostData2.length; j++) {
                                    if (PostData2[j].title == postDetail.title && this.state.bookmarksId[i] == j) {
                                        counter += 1
                                    }
                                }
                            }
                            return (<div className={s.filmString}><h1
                                className={s.film}>{postDetail.title}</h1>
                                {counter == 0 ? <img className={s.image} src={notBookmark} onClick={() => {
                                    this.setState({})
                                    this.state.store.push(postDetail)
                                    this.addToBookmarks()
            
                                    for (var i = 0; i < PostData2.length; i++) {
                                        if (PostData2[i].title == postDetail.title) { 
                                            this.state.bookmarksId.push(i)
                                            var d = this.state.bookmarksId
                                            localStorage.setItem("d", JSON.stringify(d));   
                                        }
                                    }
                                }} />
                                    :
                                    <img className={s.image} src={bookmark} onClick={() => {
                                        this.setState({})
                                        this.state.store.push(postDetail)
                                        this.addToBookmarks()
                        
                                        for (var i = 0; i < this.state.films.length; i++) {
                                            if (PostData2[i].title == postDetail.title) {        
                                                this.state.bookmarksId.push(i)
                                                var d = this.state.bookmarksId
                                                localStorage.setItem("d", JSON.stringify(d));
                                            }
                                        }
                                    }} />}
                            </div>
                            )
                        }
                    })}
                    </div>
                }

                {(this.state.films != undefined && (this.state.films.length > 15)) || (this.state.films == undefined && (PostData2.length > 15)) ? <Button className={s.showMore} variant="primary" onClick={this.addCounter}>Показать еще</Button>
                    :
                    null
                }

            </div>
        );
    }
}

export default List;