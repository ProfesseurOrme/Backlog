import * as React from "react";
import {Container, Row, Col, Button, Jumbotron} from "react-bootstrap";
import {getUsers} from "../../api/ApiGames";
import DataService from "../../api/Auth/DataService";
import background from "../../img/background.jpg";
import {Link} from "react-router-dom";

const Home = ({user}) => {

    return (
        <main>
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black">
                    </span>
                </div>
                <div className="container relative mx-auto">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div className="pr-12">
                                <h1 className="text-white">Backlog.io</h1>
                                <p className="mt-4 text-lg text-blueGray-200">Save your games and share your progress with other players in the community !</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100">
                        </polygon>
                    </svg>
                </div>
            </div>
            <section className="pb-20 bg-blueGray-200 -mt-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-12/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                                <div className="px-4 py-5 flex-auto">
                                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                                        <i className="fas fa-retweet">
                                        </i>
                                    </div>
                                    <h6 className="text-xl font-semibold">Free Revisions</h6>
                                    <p className="mt-2 mb-4 text-blueGray-500">Save your games and share your progress with other players in the community.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;