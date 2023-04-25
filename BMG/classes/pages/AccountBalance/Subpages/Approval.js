class Approval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let config = this.props.config;
        let tables = [{ name: config.tables.firstTableName, value: config.tables.firsTableId }, { name: config.tables.secondTableName, value: config.tables.secondTableId }];

        return <div class="page-content">
            {/* MAIN CARD */}
            <Card className={"top-card"}>
                {/* MAIN CARD - FIRST PART */}
                <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}>
                    <div className="double-kpi-container" style={{marginBottom: '5px'}}>
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi1}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi2}></CustomKpi>
                    </div>
                    <div className="multi-kpi-container" style={{ justifyContent: "space-between" }}>
                        <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} objectId={config.kpiIds.kpi3}></CustomKpi>
                        <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} objectId={config.kpiIds.kpi4}></CustomKpi>
                        <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} objectId={config.kpiIds.kpi5}></CustomKpi>
                    </div>
                </div>
                {/* MAIN CARD - SECOND PART */}
                <div style={{ paddingTop: "17px", paddingBottom: "0px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
                        <CustomKpi className={'bmg-main-kpi '}
                            style={{ boxShadow: "none", padding: 0 }}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi6}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            style={{ flexDirection: "column", alignItems: "flex-start", marginBottom: "7px", marginLeft: "5px" }}
                            objectId={config.kpiIds.kpi7}></CustomKpi>
                    </div>
                    <CustomKpi className={'bmg-main-kpi kpi-small'}
                        style={{ boxShadow: "none", padding: 0 }}
                        app={this.props.app}
                        objectId={config.kpiIds.kpi8}></CustomKpi>
                </div>
            </Card>

            <div class="content-sections-container">
                {/* SECOND CONTAINER */}
                <div class="content-section gauge-card">
                    {/* BIG KPI */}
                    <div className="top-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi9}></CustomKpi>

                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi10}></CustomKpi>
                    </div>
                    {/* SMALLER KPIS */}
                    <div className="mid-kpi-container">
                        <div>
                            <CustomKpi objectId={config.kpiIds.kpi11} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#64CCD7"></CustomKpi>
                            <TextObject objectId={config.kpiIds.kpi11title} app={this.props.app} className={"date-text"}></TextObject>
                        </div>
                        <div>
                            <CustomKpi objectId={config.kpiIds.kpi12} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#FF8954"></CustomKpi>
                            <TextObject objectId={config.kpiIds.kpi12title} app={this.props.app} className={"date-text"}></TextObject>
                        </div>
                    </div>
                    {/* CUSTOM GAUGE */}
                    <ClusterGauge app={this.props.app} gaugeIds={[config.gauge.firstMeasure, config.gauge.secondMeasure, config.gauge.thirdMeasure]}></ClusterGauge>
                </div>

                {/* THIRD CONTAINER */}
                <div class="content-section">
                    <LineChart
                        chartStyle={{ minHeight: "307px", height: '100%'}}
                        app={this.props.app} objectId={config.lineChart}
                        options={Appearance.lineChart.default}
                    ></LineChart>
                </div>

                <div class="content-section">
                    <PieChart
                        chartStyle={{ minHeight: "307px", height: '100%' }}
                        app={this.props.app} objectId={config.pieChart}></PieChart>
                </div>

                <div class="content-section">
                    <DonutChart app={this.props.app} containerStyle={{ height: "calc(100% - 38px)" }} objectId={config.donutChart}></DonutChart>
                </div>

                <div class="content-section" style={{ padding: "20px 10px" }}>
                    <Dropdown onSelect={(e) => { this.setState({ activeTable: e.value }) }} values={tables}></Dropdown>
                    <NativeQlikObject className={"bmg-native-table"} app={this.props.app} qlikId={this.state.activeTable ? this.state.activeTable : config.tables.activeTable}></NativeQlikObject>
                </div>
            </div>
        </div>

    }
}