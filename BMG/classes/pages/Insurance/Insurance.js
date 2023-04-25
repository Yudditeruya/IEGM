var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var NavLink = ReactRouterDOM.NavLink;
var browserHistory = ReactRouter.hashHistory;
var Redirect = ReactRouterDOM.Redirect;

class Insurance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.navId = Utils.generateId();

        // SWIPER VARIABLES
        this.swiper = null;
        this.swiperTransitionSpeed = 300;

        // qlik objects ID
        this.dateObject = "bBDTuc";
        this.lastUpdateObject = "ZdXdF";
    }

    componentDidMount() {
        document.title = "Business Insight - Insurance"
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.app && !prevState.app && window.innerWidth < 1024) {
            this.initSwiper();
        }
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


    // SWIPER METHODS
    initSwiper() {
        this.swiper = new Swiper("#" + this.navId, {
            spaceBetween: 10,
            slidesPerView: 'auto',
            centeredSlides: true
        });

        let activeSwiperPage = document.querySelector('.swiper-container .swiper-wrapper .swiper-slide.active');
        if (activeSwiperPage) {
            let activeSwiperPageIndex = this.getElementIndex(activeSwiperPage);
            let transitionSpeed = 300;
            this.swiper.slideTo(activeSwiperPageIndex, transitionSpeed);
        }
    }

    getActiveMenu(index, match) {
        if (match) {
            if (this.swiper) {
                this.swiper.slideTo(index, 100);
            }
            return 'active';
        }
    }

    getElementIndex(node) {
        let index = 0;
        while ((node = node.previousElementSibling)) {
            index++;
        }
        return index;
    }
    // END SWIPER METHODS

    swiperIsActive(match, slideIndex) {
        if (match) {
            if (this.swiper) {
                this.swiper.slideTo(slideIndex, this.swiperTransitionSpeed);
            }
            return 'active';
        }
    }

    render() {

        if(!this.props.jsonConfig) {
            throw new Error("Necessário passar configuração da página (JSONConfig)");
        }
        
        let jsonConfig = this.props.jsonConfig;
        let navLinkClass = "bmg-btn-select bmg-btn-navigation swiper-slide";

        return (<div class="page-cartoes">
            {this.state.app ? (
                <div>
                    <div class="bmg-page-bg"></div>
                    <div id={this.navId} className={window && window.innerWidth < 1024 ? "swiper-container" : "nav-desktop"} style={{ width: "100%" }}>
                        <div class="swiper-wrapper" style={{ width: "192px" }}>
                            <NavLink activeClassName="active"
                                isActive={(match) => this.swiperIsActive(match, 0)}
                                className={navLinkClass}
                                to={"./cartao"}>CARTÃO</NavLink>

                            <NavLink activeClassName="active"
                                isActive={(match) => this.swiperIsActive(match, 1)}
                                className={navLinkClass}
                                to={"./account-balance"}>ACCOUNT BALANCE</NavLink>

                            <NavLink activeClassName="active"
                                isActive={(match) => this.swiperIsActive(match, 2)}
                                className={navLinkClass}
                                to={"./stand-alone"}>STAND ALONE</NavLink>

                            <NavLink activeClassName="active"
                                isActive={(match) => this.swiperIsActive(match, 3)}
                                className={navLinkClass}
                                to={"./renovacao-historico"}>RENOVAÇÃO HISTÓRICO</NavLink>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="content">
                        <HashRouter basename="/seguros">
                            <Route path="/cartao" render={(props) => {
                                return <InsuranceCartao app={this.state.app} config={jsonConfig.cartao} props={props} />
                            }} />
                            <Route path="/account-balance" exact render={(props) => {
                                return <InsuranceCreditoNaConta app={this.state.app} config={jsonConfig.creditoNaConta} props={props} />
                            }} />
                            <Route path="/stand-alone" exact render={(props) => {
                                return <InsuranceStandAlone app={this.state.app} config={jsonConfig.standAlone} props={props} />
                            }} />
                            <Route path="/renovacao-historico" exact render={(props) => {
                                return <InsuranceRenovacaoHistorico app={this.state.app} config={jsonConfig.renovacaoHistorico} props={props} />
                            }} />
                            <Route exact path="/">
                                <Redirect to="./cartao" />
                            </Route>
                        </HashRouter>

                    </div>
                    {/* END CONTENT */}
                </div>
            ) : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>}
        </div>);
    }
}

