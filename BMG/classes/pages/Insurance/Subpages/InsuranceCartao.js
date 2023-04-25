class InsuranceCartao extends React.Component {
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
                        left: "0px",
                        right: "60px"
                    },
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


                {/* MAIN CARD - SECOND PART - HAS TO BE DonutChart*/}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "5px", boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}>
                    <DonutChart objectId={config.kpiIds.donutChart} app={this.props.app} hideTitle={true} hideValue={true} containerStyle={{ flex: "initial", marginRight: "10px", width: "60px" }} chartStyle={{ minHeight: "60px", height: "100%" }}></DonutChart>
                    <div className="double-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi3}></CustomKpi>
                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi4}></CustomKpi>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", paddingBottom: "0", width: "100%" }}>
                    <div className="multi-kpi-container">
                        <CustomKpi objectId={config.kpiIds.kpi5} titleIndicator="#64ccd7" style={{ flex: "1" }} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi6} titleIndicator="#9D63BB" style={{ flex: "1" }} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi7} titleIndicator="#0BBD5A" style={{ flex: "1" }} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                    </div>
                    <BarChart app={this.props.app} objectId={config.kpiIds.barChart1} containerStyle={{ padding: "10px 0 0 0", height: "37px" }} options={Appearance.barChart.smallVertical}></BarChart>
                </div>
            </Card>

            <div class="content-sections-container">

                {/* META - TRIGAUGE  SE REFERE ÀS METAS */  }
                {/* <div class="content-section gauge-card">
                    <div className="top-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={"thcXyA"}></CustomKpi>

                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            objectId={"YWQdMe"}></CustomKpi>
                    </div>
                    <div className="mid-kpi-container">
                        <div>
                            <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#64CCD7" objectId={"vrgK"}></CustomKpi>
                            <TextObject app={this.props.app} className={"date-text"} objectId={"VeUNhb"}></TextObject>
                        </div>
                        <div>
                            <CustomKpi className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} titleIndicator="#FF8954" objectId={"uBrXPs"}></CustomKpi>
                            <TextObject app={this.props.app} className={"date-text"} objectId={"gfMFYWU"}></TextObject>
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