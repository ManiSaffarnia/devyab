import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routers/PrivateRoute';
import PublicRoute from '../routers/PublicRoute';
import Dashboard from '../components/dashboard/Dashboard';
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
                <PrivateRoute path="/dashboard" component={Dashboard} exact />
                <PublicRoute path="/register" component={Register} />
                <PublicRoute path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </React.Fragment>

    </BrowserRouter>
);

export default AppRouter;
