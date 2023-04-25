var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var NavLink = ReactRouterDOM.NavLink;
var browserHistory = ReactRouter.hashHistory;
var Redirect = ReactRouterDOM.Redirect;


class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.navId = Utils.generateId();

        this.dateObject = "Qzhvsf";
        this.lastUpdateObject = "emjyh";
    }

    componentDidMount() {
        document.title = "Business Insight - Cards"
    }

    componentWillUnmount() {
        if (this.state.app) {
            this.state.app.close();
        }
    }

    onOpenApp(app) {
        this.props._onOpenApp(app, this.dateObject, this.lastUpdateObject);
        app.clearAll();
        this.setState({ app: app });
    }

    render() {
        if(!this.props.jsonConfig) {
            throw new Error("Necessário passar configuração da página (JSONConfig)");
        }
        let jsonConfig = this.props.jsonConfig;
        return (<div class="page-cartoes">
            {this.state.app ? (
                <div>
                    <div class="bmg-page-bg"></div>
                    <div class="page-navigation">
                        <NavLink activeClassName="active" className={"bmg-btn-select bmg-btn-navigation auto swiper-slide"} to={"./saque"}>SAQUE</NavLink>
                        <NavLink activeClassName="active" className={"bmg-btn-select bmg-btn-navigation auto swiper-slide"} to={"./compras"}>COMPRAS</NavLink>
                        <NavLink activeClassName="active" className={"bmg-btn-select bmg-btn-navigation auto swiper-slide"} to={"./emissoes"}>EMISSÕES</NavLink>
                    </div>
                    <div className="content">
                        <HashRouter basename="/cartoes">
                            <Route path="/saque" render={(props) => {
                                return <Saque app={this.state.app} config={jsonConfig.saque} props={props} />
                            }} />
                            <Route path="/compras" exact render={(props) => {
                                return <Compras app={this.state.app} config={jsonConfig.compras} props={props} />
                            }} />
                            <Route path="/emissoes" exact render={(props) => {
                                return <Emissoes app={this.state.app} config={jsonConfig.emissoes} props={props} />
                            }} />
                            <Route exact path="/">
                                <Redirect to="./saque" />
                            </Route>
                        </HashRouter>

                    </div>
                    {/* END CONTENT */}
                </div>
            ) : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>}
        </div>);
    }
}

