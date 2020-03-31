import React from 'react';
import { Button } from 'react-bootstrap';
import s from './Bookmarks.module.css';
import PostData from "../data/tags.json"
import PostData2 from "../data/films.json"
import bookmark from '../image/bookmark.png';
import { NavLink } from 'react-router-dom'

class Bookmarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: PostData,
            films: PostData2,
            added: JSON.parse(localStorage.getItem("a")),
            bookmarksId: [],
            count: 1

        };
    }

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem("d")))
        this.state.bookmarksId = JSON.parse(localStorage.getItem("d"))
        console.log(this.state.bookmarksId)
        this.setState({
            bookmarksId: JSON.parse(localStorage.getItem("d"))
        })
    }


    addCounter = () => {
        this.state.count += 1
        this.setState({
            added: this.state.added
        })
        console.log(this.state.count)
    }


    render() {

        if (this.state.added != undefined) {
            return (
                <div className={s.container}>
                    <div className={s.buttons}>
                        <NavLink to="/list"> <Button className={s.button} variant="secondary">Фильмы</Button>{' '}</NavLink>
                        <Button className={s.button} variant="primary">Закладки</Button>{' '}
                    </div>

                    <div className={s.films}>{this.state.added.map((postDetail, index) => {
                        if (index < 15 * this.state.count) {
                            return (
                                <div className={s.filmString}>
                                    <h1 className={s.film}>{postDetail.title}</h1>
                                    <img className={s.image} src={bookmark} onClick={() => {
                                        var u;
                                        for (var i = 0; i < this.state.films.length; i++) {
                                            if (postDetail.title == this.state.films[i].title) {
                                                u = i
                                                for (var j = 0; j < this.state.bookmarksId.length; j++) {
                                                    if (this.state.bookmarksId[j] == u) {
                                                        this.state.bookmarksId.splice(j, 1)
                                                        var d = this.state.bookmarksId
                                                        localStorage.setItem("d", JSON.stringify(d));
                                                    }
                                                }
                                            }
                                        }
                                        this.state.added.splice(index, 1)
                                        this.setState({
                                            added: this.state.added
                                        })
                                        var a = this.state.added
                                        localStorage.setItem("a", JSON.stringify(a));
                                    }} />

                                </div>
                            )
                        }
                    })}</div>

                    {this.state.added != undefined && this.state.added.length > 15
                        ?
                        < Button className={s.showMore} variant="primary" onClick={this.addCounter}>Показать еще</Button>
                        :
                        null
                    }
                </div >
            );
        }
    }
}

export default Bookmarks;