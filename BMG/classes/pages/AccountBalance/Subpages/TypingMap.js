class TypingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTable: "zzQDep"
        };
        this.tables = [{ name: "Valores por grupo", value: "zzQDep" }, { name: "Valores por loja", value: "JfdxXsT" }];
    }

    render() {
        let barChartAprovado = {
            echartsOptions: {
                baseOption: {
                    color: ["#64CCD7", "#0bbd5a"]
                }
            }
        }

        let barChartConcluido = {
            echartsOptions: {
                baseOption: {
                    color: ["#64CCD7", "#9d63bb"]
                }
            }
        };

        let config = this.props.config;

        return <div class="page-content">

            <div>
                {/* MAIN CARD */}
                <Card className={"mapa-de-digitacao-card"}>
                    <CustomKpi objectId={config.kpiIds.kpi1} className={'bmg-main-kpi '} titleIndicator="#64ccd7" style={{ marginRight: "5px" }} app={this.props.app}></CustomKpi>
                </Card>

                {/* SECOND CARD - APROVADO */}
                <Card className={"mapa-de-digitacao-card"}>
                    <div className="top-kpi-container">
                        <CustomKpi objectId={config.kpiIds.kpi2} titleIndicator="#0bbd5a" className={'bmg-main-kpi'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi3} className={'bmg-tiny-kpi'} app={this.props.app} ></CustomKpi>
                    </div>
                    <div className="barchart-container">
                        <BarChart objectId={config.kpiIds.barChart1} app={this.props.app} loaderHeight={"45px"} containerStyle={{ height: "18px" }} options={_.merge(_.cloneDeep(Appearance.barChart.smallVertical), barChartAprovado)}></BarChart>
                    </div>
                    <div className="bottom-kpi-container" style={{marginTop: "10px" }}>
                        <CustomKpi objectId={config.kpiIds.kpi4} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi5} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi6} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                    </div>
                </Card>

                {/* THIRD CARD - CONCLUIDO */}
                <Card className={"mapa-de-digitacao-card"}>
                    <div className="top-kpi-container">
                        <CustomKpi objectId={config.kpiIds.kpi7} className={'bmg-main-kpi '} titleIndicator="#9d63bb" app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi8} className={'bmg-tiny-kpi'} app={this.props.app}></CustomKpi>
                    </div>
                    <div className="barchart-container">
                        <BarChart objectId={config.kpiIds.barChart2} app={this.props.app} loaderHeight={"45px"} containerStyle={{ height: "18px" }} options={_.merge(_.cloneDeep(Appearance.barChart.smallVertical), barChartConcluido)}></BarChart>
                    </div>
                    <div className="bottom-kpi-container" style={{ marginTop: "10px" }}>
                        <CustomKpi objectId={config.kpiIds.kpi9} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi10} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi11} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                    </div>
                </Card>

                {/* FOURTH CARD - TOTAL PRODUÇÃO */}
                <Card className={"mapa-de-digitacao-card"}>
                    <CustomKpi className={'bmg-main-kpi '}
                        style={{ paddingBottom: "16px", width: "100%", boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}
                        app={this.props.app}
                        objectId={config.kpiIds.kpi12}></CustomKpi>
                    <div className="bottom-kpi-container" style={{ paddingTop: "16px" }}>
                        <CustomKpi objectId={config.kpiIds.kpi13} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi14} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi15} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                    </div>
                </Card>
            </div>

        </div>

    }
}