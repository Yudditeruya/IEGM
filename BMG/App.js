'use strict';
var browserHistory = ReactRouter.hashHistory;
var ReactRouter = window.ReactRouter;
var Router = ReactRouterDOM.Router;
var Route = ReactRouterDOM.Route;
var Link = ReactRouter.Link;
var Redirect = ReactRouter.Redirect;
var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var Redirect = ReactRouterDOM.Redirect;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSideBar: false };

        this.navItems = [
            { name: "Dashboard", alias: "Business Insight", path: "/dashboard/", icon: "far fa-tachometer-alt-slowest" },
            { name: "Consigned Loan", path: "/consigned-loan/", icon: "fal fa-hand-holding-usd" },
            { name: "Cards", path: "/cards/", icon: "fal fa-credit-card" },
            { name: "Account Balance", path: "/account-balance/", icon: "fal fa-chart-line" },
            { name: "Digital Bank", path: "/digital-bank/", icon: "fal fa-mobile-android-alt" },
            { name: "Insurance", path: "/Insurance/", icon: "fal fa-hands-usd" }
        ];
    }

    componentDidMount() {
        browserHistory.listen(location => {
            this.setState({ showSideBar: false })
        })
    }

    onMessage(state) {
        this.setState(state);
    }

    showSideBar() {
        this.setState({ showSideBar: !this.state.showSideBar })
        this.state.qlik.resize();
    }

    showRightSideBar() {
        this.setState({ showRightSideBar: !this.state.showRightSideBar })
        this.state.qlik.resize();
    }

    onOpenApp(app, dateObject, lastUpdateObject) {
        if (dateObject && lastUpdateObject) {
            this.setState({ app: app, dateObject: dateObject, lastUpdateObject: lastUpdateObject })
        } else {
            this.setState({ app: app, dateObject: '', lastUpdateObject: '' })
        }
    }

    onConfigReady(jsonConfig) {
        this.setState({ jsonConfig });
    }

    render() {
        let app = this.state.app;

        if (this.state.timeOut) {
            return <ErrorPage errorMessage={this.state.timeOut} />
        }

        return (
            <HashRouter>
                {this.state.qlik && this.state.jsonConfig ? (
                    <div>
                      <HubspotContactForm />
                        <Route render={(props) => {
                            return <NavBar config={this.state.config} activeNav={this.navItems.filter((item) => {
                                return item.path.split('/')[1] == props.location.pathname.split('/')[1];
                            })[0]} app={app} dateObject={this.state.dateObject} lastUpdateObject={this.state.lastUpdateObject} navItems={this.navItems} props={props} showSideBar={this.state.showSideBar} showRightSideBar={this.state.showRightSideBar} _onClick={this.showSideBar.bind(this)} _onClickRightSideBar={this.showRightSideBar.bind(this)} />
                        }} />
                        <SideBar opened={this.state.showSideBar} navItems={this.navItems} _onClose={e => this.setState({ showSideBar: !this.state.showSideBar })} />
                        <Mask active={this.state.showSideBar} _onClick={e => this.setState({ showSideBar: false })}></Mask>
                        <section className="content-page">
                            <div className="main-content">

                                <Route path="/" exact render={() => { return <Redirect to="/dashboard/" /> }} />
                                
                                <Route path="/dashboard/" render={(props) =>
                                    <Dashboard
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.dashboard.qvfId}
                                        jsonConfig={this.state.jsonConfig.dashboard}
                                        _onOpenApp={this.onOpenApp.bind(this)} props={props} />} />

                                
                                <Route path="/consigned-loan/" render={(props) =>
                                    <ConsignedLoan
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.consignado.qvfId}
                                        jsonConfig={this.state.jsonConfig.consignado}
                                        _onOpenApp={this.onOpenApp.bind(this)}
                                        props={props} />} />
                                
                                <Route path="/cards/" render={(props) =>
                                    <Cards
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.cartoes.qvfId}
                                        jsonConfig={this.state.jsonConfig.cartoes}
                                        _onOpenApp={this.onOpenApp.bind(this)}
                                        props={props} />} />
                                
                                <Route path="/account-balance/" render={(props) =>
                                    <AccountBalance
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.creditoEmConta.qvfId}
                                        jsonConfig={this.state.jsonConfig.creditoEmConta}
                                        _onOpenApp={this.onOpenApp.bind(this)}
                                        props={props} />} />
                                
                                <Route path="/digital-bank/" render={(props) =>
                                    <DigitalBank
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.bancoDigital.qvfId}
                                        jsonConfig={this.state.jsonConfig.bancoDigital}
                                        _onOpenApp={this.onOpenApp.bind(this)}
                                        props={props} />} />
                                
                                <Route path="/Insurance/" render={(props) =>
                                    <Insurance
                                        qlik={this.state.qlik}
                                        qvfId={this.state.jsonConfig.general.seguros.qvfId}
                                        jsonConfig={this.state.jsonConfig.seguros}
                                        _onOpenApp={this.onOpenApp.bind(this)}
                                        props={props} />} />
                            </div>
                        </section>
                    </div>
                ) : (
                        <div className="loader-container"><Loader color="#004f99" /></div>
                    )}
                <JSONConfig _onConfigReady={this.onConfigReady.bind(this)} />
                <QlikRoot _onModuleReady={this.onMessage.bind(this)} config="config" qlik="qlik" />
            </HashRouter>
        )
    }
}

// Inicialização do react 
const domContainer = document.querySelector('#mashup_container');
ReactDOM.render(<App />, domContainer);





