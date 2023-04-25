class Emissoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.tables = [{ name: "Valores por grupo", value: "" }, { name: "Valores por loja", value: "" }];
        this.bars = [{ name: "Por mês", value: "" }, { name: "Por dia", value: "" }];
    }

    render() {
        let barChartPresentation1 = {
            echartsOptions: {
                baseOption: {
                    color: ["#64CCD7", "#9D63BB", "#4477AA", "#ff8954"],
                }
            }
        }

        let config = this.props.config;
        let tables = [{ name: config.tables.firstTableName, value: config.tables.firsTableId }, { name: config.tables.secondTableName, value: config.tables.secondTableId}];
        let bars = [{name: config.barChartToggle.firstBarChartName, value: config.barChartToggle.firstBarChartId}, {name: config.barChartToggle.secondBarChartName, value: config.barChartToggle.secondBarChartId}];

        return <div class="page-content">
            {/* MAIN CARD */}
            <Card className={"top-card"}>
                {/* MAIN CARD - FIRST PART */}
                <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}>
                    <div className="double-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi1}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi2}></CustomKpi>
                    </div>
                </div>

                {/* MAIN CARD - SECOND PART */}
                <div style={{ padding: "10px 0" }}>
                    <div style={{ display: "flex", alignItems: "flex-end", marginBottom: "5px" }}>
                        <CustomKpi className={'bmg-main-kpi '}
                            style={{ marginRight: "5px" }}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi3}></CustomKpi>
                    </div>
                    <div className="mid-kpi-container">
                        <CustomKpi objectId={config.kpiIds.kpi4} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi5} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                    </div>
                </div>


                {/* MAIN CARD - SECOND PART */}
                <div style={{ paddingTop: "17px" }}>
                    {/* <div style={{ display: "flex", alignItems: "flex-end" }}> */}
                    <CustomKpi objectId={config.kpiIds.kpi6} className={'bmg-main-kpi '} style={{ boxShadow: "none", padding: 0 }} app={this.props.app}></CustomKpi>
                    {/* </div> */}
                </div>
            </Card>

            <div class="content-sections-container">
                <div class="content-section gauge-card">
                    <div className="top-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi7}></CustomKpi>

                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi8}></CustomKpi>
                    </div>
                    <div className="mid-kpi-container">
                        <div>
                            <CustomKpi  objectId={config.kpiIds.kpi9} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#64CCD7"></CustomKpi>
                            <TextObject objectId={config.kpiIds.kpi9title} app={this.props.app} className={"date-text"}></TextObject>
                        </div>
                        <div>
                            <CustomKpi objectId={config.kpiIds.kpi10} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}  titleIndicator="#FF8954"></CustomKpi>
                            <TextObject objectId={config.kpiIds.kpi10title} app={this.props.app} className={"date-text"}></TextObject>
                        </div>
                    </div>
                    <ClusterGauge app={this.props.app} gaugeIds={[config.gauge.firstMeasure, config.gauge.secondMeasure, config.gauge.thirdMeasure]}></ClusterGauge>
                </div>

                <div class="content-section">

                    <div className="toggle-button-container">
                        <ToggleButton onSelect={(e) => { this.setState({ activeBar: e.value }) }} values={bars}></ToggleButton>
                    </div>
                    <BarChart app={this.props.app} titleStyle={{ paddingRight: "175px" }} objectId={this.state.activeBar ? this.state.activeBar : config.barChartToggle.activeBarChart} containerStyle={{ minHeight: "228px",  height: "calc(100% - 38px)", }} options={Appearance.barChart.default}></BarChart>
                </div>

                <div class="content-section">
                    <BarChart app={this.props.app}
                        objectId={config.barChart}
                        containerStyle={{ height: "calc(100% - 38px)", minHeight: "108px" }}
                        options={_.merge(_.cloneDeep(Appearance.barChart.vertical), barChartPresentation1)}></BarChart>
                </div>

                <div class="content-section">
                    <PieChart
                        chartStyle={{ height: "calc(100% - 38px)", minHeight: '230px', width: '100%' }}
                        app={this.props.app} objectId={config.pieChart}></PieChart>
                </div>

                {/* % IPP */}
                {/* <div class="content-section">
                    <DonutChart app={this.props.app} chartStyle={{ height: "calc(100% - 38px)", width: '100%' }} objectId={"0e513b20-5545-4118-b187-f34efb908043"}></DonutChart>
                </div> */}


                <div class="content-section">
                    <Dropdown onSelect={(e) => { this.setState({ activeTable: e.value }) }} values={tables}></Dropdown>
                    <NativeQlikObject className={"bmg-native-table"} app={this.props.app} qlikId={this.state.activeTable ? this.state.activeTable : config.tables.activeTable}></NativeQlikObject>
                </div>
            </div>

        </div>

    }
}