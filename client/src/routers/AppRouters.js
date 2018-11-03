import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Landing from '../components/layout/Landing';
import Navbar from '../components/layout/Navbar';
import NotFound from '../components/NotFound';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const AppRouter = () => (
    <BrowserRouter>
        <React.Fragment>
            <Navbar />
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </React.Fragment>

    </BrowserRouter>
);

export default AppRouter;
