class ConsignedLoan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.dateObject = "apSBam";
        this.lastUpdateObject = "euCyLP";
    }

    componentDidMount() {
        document.title = "Business Insight - Consigned Loan"
    }

    onOpenApp(app) {
        this.props._onOpenApp(app, this.dateObject, this.lastUpdateObject);
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

        let config = this.props.jsonConfig;
        let tables = [{ name: config.tables.firstTableName, value: config.tables.firsTableId }, { name: config.tables.secondTableName, value: config.tables.secondTableId }];
        let bars = [{ name: config.barChartToggle.firstBarChartName, value: config.barChartToggle.firstBarChartId }, { name: config.barChartToggle.secondBarChartName, value: config.barChartToggle.secondBarChartId }];

        return (<div>
            {this.state.app ? (
                <div>
                    <div class="bmg-page-bg">
                    </div>

                    {/* CONTENT */}
                    <div className="content">
                        <div class="page-content">

                            {/* MAIN CARD */}
                            <Card className={"top-card"}>
                                {/* MAIN CARD - FIRST PART */}
                                <div>
                                    <div className="double-kpi-container">
                                        <CustomKpi className={'bmg-main-kpi '}
                                            app={this.state.app}
                                            objectId={config.kpiIds.kpi1}></CustomKpi>
                                        <CustomKpi className={'bmg-tiny-kpi'}
                                            app={this.state.app}
                                            objectId={config.kpiIds.kpi2}></CustomKpi>
                                    </div>
                                </div>

                                {/* MAIN CARD - SECOND PART */}
                                <div style={{ padding: "10px 0" }}>
                                    <div className="double-kpi-container">
                                        <CustomKpi className={'bmg-main-kpi '}
                                            app={this.state.app}
                                            objectId={config.kpiIds.kpi3}></CustomKpi>
                                    </div>
                                    <div className="bottom-kpi-container">
                                        <CustomKpi objectId={config.kpiIds.kpi4} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.state.app}></CustomKpi>
                                        <CustomKpi objectId={config.kpiIds.kpi5} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.state.app}></CustomKpi>
                                    </div>
                                </div>


                                {/* MAIN CARD - THIRD PART */}
                                <div style={{ paddingTop: "17px" }}>
                                    <CustomKpi objectId={config.kpiIds.kpi6} className={'bmg-main-kpi '} style={{ boxShadow: "none", padding: 0 }} app={this.state.app}></CustomKpi>
                                </div>
                            </Card>

                            <div class="content-sections-container">

                                {/* META - TRIGAUGE */}
                                <div class="content-section gauge-card">
                                    <div className="top-kpi-container">
                                        <CustomKpi className={'bmg-main-kpi '}
                                            app={this.state.app}
                                            objectId={config.kpiIds.kpi7}></CustomKpi>

                                        <CustomKpi className={'bmg-tiny-kpi'}
                                            app={this.state.app}
                                            objectId={config.kpiIds.kpi8}></CustomKpi>
                                    </div>
                                    <div className="mid-kpi-container">
                                        <div>
                                            <CustomKpi objectId={config.kpiIds.kpi9} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.state.app} titleIndicator="#64CCD7"></CustomKpi>
                                            <TextObject objectId={config.kpiIds.kpi9title} app={this.state.app} className={"date-text"}></TextObject>
                                        </div>
                                        <div>
                                            <CustomKpi objectId={config.kpiIds.kpi10} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.state.app} titleIndicator="#FF8954"></CustomKpi>
                                            <TextObject objectId={config.kpiIds.kpi10title} app={this.state.app} className={"date-text"}></TextObject>
                                        </div>
                                    </div>
                                    <ClusterGauge app={this.state.app} gaugeIds={[config.gauge.firstMeasure, config.gauge.secondMeasure, config.gauge.thirdMeasure]}></ClusterGauge>
                                </div>

                                {/* EVOLUCAO - DIA - MES */}
                                <div class="content-section">
                                    <div className="toggle-button-container">
                                        <ToggleButton onSelect={(e) => { this.setState({ activeBar: e.value }) }} values={bars}></ToggleButton>
                                    </div>
                                    <BarChart app={this.state.app} titleStyle={{ paddingRight: "175px" }} objectId={this.state.activeBar ? this.state.activeBar : config.barChartToggle.activeBarChart} containerStyle={{ height: "calc(100% - 38px)", minHeight: "228px" }} 
                                    options={Appearance.barChart.default}
                                    ></BarChart>
                                </div>

                                {/* TIPO DE SAQUE */}
                                <div class="content-section">
                                    <BarChart app={this.state.app}
                                        objectId={config.barChart}
                                        containerStyle={{ height: "calc(100% - 38px)", minHeight: "108px" }}
                                        options={Appearance.barChart.vertical}
                                        ></BarChart>
                                </div>

                                {/* % SHARE TIPO DOCUMENTO */}
                                <div class="content-section">
                                    <PieChart
                                        chartStyle={{ height: "calc(100% - 38px)", minHeight: '230px', width: '100%' }}
                                        app={this.state.app} objectId={config.pieChart}></PieChart>
                                </div>

                                <div class="content-section">
                                    <Dropdown onSelect={(e) => { this.setState({ activeTable: e.value }) }} values={tables}></Dropdown>
                                    <NativeQlikObject className={"bmg-native-table"} app={this.state.app} qlikId={this.state.activeTable ? this.state.activeTable : config.tables.activeTable}></NativeQlikObject>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* END CONTENT */}

                </div>
            ) : <QlikApp qlik={this.props.qlik} appId={this.props.qvfId} _onOpen={this.onOpenApp.bind(this)}></QlikApp>}
        </div>);
    }
}