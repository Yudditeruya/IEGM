class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.title = "Business Insight - Dashboard"
    }

    onOpenApp(app) {
        this.props._onOpenApp(app);
        this.setState({ app: app });
    }

    componentWillUnmount() {
        if (this.state.app) {
            this.state.app.close();
        }
    }

    render() {
        if(!this.props.jsonConfig) {
            throw new Error("Necessário passar configuração da página (JSONConfig)");
        }
        
        return this.state.app ? <div class="page home" style={{ background: "linear-gradient(90deg, #FAA61A 0%, #F58220 100%)" }}>
            <Carousel jsonConfig={this.props.jsonConfig} app={this.state.app}></Carousel>
        </div>
            : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>
            ;
    }
}