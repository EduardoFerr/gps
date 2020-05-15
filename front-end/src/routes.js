import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Logon from './pages/Logon'
import Registrar from './pages/Registrar'
import Profile from './pages/Profile'
import NovoAnuncio from './pages/NovoAnuncio';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/registrar" component={Registrar} />
                
                <Route path="/profile" component={Profile} />
                <Route path="/anuncio/novo" component={NovoAnuncio} />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;