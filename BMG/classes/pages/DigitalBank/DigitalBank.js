class DigitalBank extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.dateObject = "VmTzW";
        this.lastUpdateObject = "LLBaZ";
    }

    onOpenApp(app) {
        this.props._onOpenApp(app, this.dateObject, this.lastUpdateObject);
        this.setState({ app: app });
    }

    componentDidMount() {
        document.title = "Business Insight - Digital Bank"
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
        let config = this.props.jsonConfig;

        return (<div>
            {this.state.app ? (
                <div>
                    <div class="bmg-page-bg">
                    </div>

                    {/* CONTENT */}
                    <div className="content">
                        <div class="page-content">

                            <div class="content-sections-container" style={{ paddingBottom: '30px' }}>

                                {/* TODOS OS TIPOS DE CONTAS  */}
                                <div className="digital-bank-card-container">
                                    <KpiCard
                                        imageSrc={"./res/img/bmg_todos.png"}
                                       config={config.todosOsTipos.kpiCard}
                                        app={this.state.app}>
                                    </KpiCard>

                                    <ChartCard
                                        imageSrc= {"./res/img/bmg_todos.png"}
                                        config={config.todosOsTipos.chartCard}
                                        app={this.state.app}
                                    ></ChartCard>
                                </div>

                                {/* MEU BMG  */}
                                <div className="digital-bank-card-container">
                                    <KpiCard
                                        imageSrc={"./res/img/meu-bmg.png"}
                                     config={config.meuBmg.kpiCard}
                                        app={this.state.app}>
                                    </KpiCard>

                                    <ChartCard
                                        imageSrc={"./res/img/meu-bmg.png"}
                                        config={config.meuBmg.chartCard}
                                        app={this.state.app}
                                    ></ChartCard>
                                </div>


                                {/* MEU CORINTHIANS  */}
                                <div className="digital-bank-card-container">
                                    <KpiCard
                                        imageSrc={"./res/img/meu-corinthians.png"}
                                        config={config.meuCorinthians.kpiCard}
                                        app={this.state.app}>
                                    </KpiCard>

                                    <ChartCard
                                        imageSrc={"./res/img/meu-corinthians.png"}
                                        config={config.meuCorinthians.chartCard}
                                        app={this.state.app}
                                    ></ChartCard>
                                </div>


                                {/* MEU VASCO  */}
                                <div className="digital-bank-card-container">
                                    <KpiCard
                                        imageSrc={"./res/img/meu-vasco.png"}
                                       config={config.meuVasco.kpiCard}
                                        app={this.state.app}>
                                    </KpiCard>

                                    <ChartCard
                                        imageSrc={"./res/img/meu-vasco.png"}
                                        config={config.meuVasco.chartCard}
                                        app={this.state.app}
                                    ></ChartCard>
                                </div>


                                {/* MEU GALO  */}
                                <div className="digital-bank-card-container">
                                    <KpiCard
                                        imageSrc={"./res/img/meu-galo.png"}
                                      config={config.meuGalo.kpiCard}
                                        app={this.state.app}>
                                    </KpiCard>

                                    <ChartCard
                                        imageSrc={"./res/img/meu-galo.png"}
                                        config={config.meuGalo.chartCard}
                                        app={this.state.app}
                                    ></ChartCard>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            ) : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>}
        </div>);
    }
}