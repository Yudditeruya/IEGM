class InsuranceStandAlone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        let barChartPresentation1 = {
            echartsOptions: {
                baseOption: {
                    grid: {
                        top: "0px",
                        bottom: "0px",
                        // left: "160px",
                        right: "75px"
                    },
                    dataZoom: {
                        orient: 'vertical',
                        show: true,
                        start: 0,
                        end: 50
                    }
                }
            }
        };
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
                {/* MAIN CARD - SECOND PART*/}
                <div style={{padding: '0px'}}>
                    <CustomKpi className={'bmg-main-kpi '}
                        style={{ marginRight: "5px", paddingTop: '15px'}}
                        app={this.props.app}
                        objectId={config.kpiIds.kpi3}></CustomKpi>
                </div>

            </Card>

            <div class="content-sections-container">

                {/* META - TRIGAUGE SE REFERE ÀS METAS */}
                {/* <div class="content-section gauge-card">
                    <div className="top-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={"f37c4935-a2a8-41cc-94bb-263325f2e9a4"}></CustomKpi>

                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={"1b2a46c0-7740-4477-a859-1145c72b13e5"}></CustomKpi>
                    </div>
                    <div className="mid-kpi-container">
                        <div>
                            <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#64CCD7" objectId={"a96cb7a1-19db-4c56-ba55-a5d1a269a827"}></CustomKpi>
                            <TextObject app={this.props.app} className={"date-text"} objectId={"b3102f01-0093-48ac-8c7a-0f27e06c08e6"}></TextObject>
                        </div>
                        <div>
                            <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#FF8954" objectId={"d3aefcff-da05-4081-86ed-8cf184489112"}></CustomKpi>
                            <TextObject app={this.props.app} className={"date-text"} objectId={"843cd796-bb55-4a60-9821-a7a532c7657f"}></TextObject>
                        </div>
                    </div>
                    <ClusterGauge app={this.props.app} gaugeIds={[config.gauge.firstMeasure, config.gauge.secondMeasure, config.gauge.thirdMeasure]}></ClusterGauge>
                </div> */}

                {/* EVOLUCAO - DIA - MES */}
                <div class="content-section">
                    <div className="toggle-button-container">
                        <ToggleButton onSelect={(e) => { this.setState({ activeBar: e.value }) }} values={bars}></ToggleButton>
                    </div>
                    <BarChart app={this.props.app} titleStyle={{ paddingRight: "175px" }} objectId={this.state.activeBar ? this.state.activeBar : config.barChartToggle.activeBarChart} containerStyle={{ minHeight: "228px", height: "calc(100% - 68px)" }} options={Appearance.barChart.default}></BarChart>
                </div>

                {/* TIPO DE SAQUE */}
                <div class="content-section">
                    <BarChart app={this.props.app}
                        objectId={config.barChart2}
                        containerStyle={{ height: "calc(100% - 68px)", minHeight: "244px" }}
                        options={_.merge(_.cloneDeep(Appearance.barChart.vertical), barChartPresentation1)}></BarChart>
                </div>

                <div class="content-section">
                    <Dropdown onSelect={(e) => { this.setState({ activeTable: e.value }) }} values={tables}></Dropdown>
                    <NativeQlikObject className={"bmg-native-table"} app={this.props.app} qlikId={this.state.activeTable ? this.state.activeTable : config.tables.activeTable}></NativeQlikObject>
                </div>
            </div>

        </div>

    }
}