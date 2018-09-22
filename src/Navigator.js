import { NavigationActions } from 'react-navigation';

let _navigator, _session, _controls = {};

function setNavigator(navigator) {
    _navigator = navigator;
}

function setSession(session) {
    _session = session;
}

function setControl(key, control) {
    _controls[key] = control
}

function getControl(key) {
    return _controls[key];
}

function getSession() {
    return _session;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function getCurrentRoute() {
    if (!_container || !_container.state.nav) {
        return null;
    }
  
    return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
    setNavigator,
    setSession,
    setControl,
    getControl,
    navigate,
    getCurrentRoute,
    getSession,
}
