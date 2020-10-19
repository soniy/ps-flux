import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CoursesPage from './CoursesPage';
import HomePage from './HomePage';
import ManageCoursePage from './ManageCoursePage';
import NotFoundPage from './NotFoundPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App(props) {
    // function getPage() {
    //     const route = window.location.pathname;
    //     if (route === '/courses') return <CoursesPage />;
    //     if (route === '/about') return <AboutPage />;
    //     return <HomePage />;
    // }

    return (<div className="container-fluid">
        <ToastContainer autoClose={3000} hideProgressBar />
        <Header />
        <Switch>
            <Route path="/about" component={AboutPage} />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/course/:slug" component={ManageCoursePage} />
            <Route path="/course" component={ManageCoursePage} />
            <Redirect from="/about-page" to="about" />
            <Route component={NotFoundPage} />
        </Switch>
    </div>);
}

export default App;