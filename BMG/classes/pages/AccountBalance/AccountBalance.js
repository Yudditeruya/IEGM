var HashRouter = ReactRouterDOM.HashRouter;
var Link = ReactRouterDOM.Link;
var NavLink = ReactRouterDOM.NavLink;
var browserHistory = ReactRouter.hashHistory;
var Redirect = ReactRouterDOM.Redirect;


class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.navId = Utils.generateId();

    // SWIPER VARIABLES
    this.swiper = null;
    this.swiperTransitionSpeed = 300;

    // Qlik objects ID
    this.dateObject = "dZPe";
    this.lastUpdateObject = "JrhPxsH";
  }

  componentDidMount() {
    document.title = "Business Insight - Account Balance"
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

    return (<div>
      {this.state.app ? (
        <div>
          <div class="bmg-page-bg"></div>
          <div id={this.navId} className={window && window.innerWidth < 1024 ? "swiper-container" : "nav-desktop"} style={{ width: "100%" }}>
            <div className={"swiper-wrapper"} style={{ width: '140px' }}>
              <NavLink activeClassName="active"
                isActive={(match) => this.swiperIsActive(match, 1)}
                className={navLinkClass}
                to={"./approval"}>APPROVAL</NavLink>

              <NavLink activeClassName="active"
                isActive={(match) => this.swiperIsActive(match, 2)}
                className={navLinkClass}
                to={"./typing-map"}>TYPING MAP</NavLink>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">
            <HashRouter basename="/account-balance">
              <Route path="/approval" exact render={(props) => {
                return <Approval app={this.state.app} config={jsonConfig.approval} props={props} />
              }} />
              <Route path="/typing-map" exact render={(props) => {
                return <TypingMap app={this.state.app} config={jsonConfig.typingMap} props={props} />
              }} />
              <Route exact path="/">
                <Redirect to="./approval" />
              </Route>
            </HashRouter>

          </div>
          {/* END CONTENT */}
        </div>
      ) : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>}
    </div>);
  }
}

