class InsuranceRenovacaoHistorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let config = this.props.config;

        return <div class="page-content">

            <div class="content-sections-container" style={{ paddingBottom: '30px', width: '100%' }}>
                {/* MAIN CARD */}
                <div class="content-section card-seguros">
                    {/* MAIN CARD - FIRST PART */}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8" }}>
                        <div>
                            <TextObject objectId={config.kpiIds.kpi1title} titleIndicator="#64CCD7" app={this.props.app} className={"kpi-row-title"}></TextObject>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <CustomKpi className={'bmg-main-kpi'}
                                    style={{ marginRight: "5px" }}
                                    app={this.props.app}
                                    objectId={config.kpiIds.kpi1}></CustomKpi>
                                <CustomKpi className={'bmg-tiny-kpi'}
                                    app={this.props.app}
                                    style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                                    objectId={config.kpiIds.kpi2}></CustomKpi>
                            </div>
                        </div>
                    </div>
                    {/* MAIN CARD - SECOND PART*/}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", padding: '10px 0' }}>
                        <div>
                            <TextObject objectId={config.kpiIds.kpi3title} titleIndicator="#0BBD5A" app={this.props.app} className={"kpi-row-title"}></TextObject>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <CustomKpi className={'bmg-main-kpi'}
                                    style={{ marginRight: "5px" }}
                                    app={this.props.app}
                                    objectId={config.kpiIds.kpi3}></CustomKpi>
                                <CustomKpi className={'bmg-tiny-kpi'}
                                    app={this.props.app}
                                    style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                                    objectId={config.kpiIds.kpi4}></CustomKpi>
                            </div>
                        </div>
                    </div>
                    {/* MAIN CARD - THIRD PART*/}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", padding: '10px 0' }}>
                        <div>
                            <TextObject objectId={config.kpiIds.kpi5title} titleIndicator="#F74C19" app={this.props.app} className={"kpi-row-title"}></TextObject>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <CustomKpi className={'bmg-main-kpi'}
                                    style={{ marginRight: "5px" }}
                                    app={this.props.app}
                                    objectId={config.kpiIds.kpi5}></CustomKpi>
                                <CustomKpi className={'bmg-tiny-kpi'}
                                    app={this.props.app}
                                    style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                                    objectId={config.kpiIds.kpi6}></CustomKpi>
                            </div>
                        </div>
                    </div>
                    {/* MAIN CARD - FOURTH PART*/}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", padding: '10px 0' }}>
                        <div>
                            <TextObject objectId={config.kpiIds.kpi7title} titleIndicator="#FF8954" app={this.props.app} className={"kpi-row-title"}></TextObject>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <CustomKpi className={'bmg-main-kpi'}
                                    style={{ marginRight: "5px" }}
                                    app={this.props.app}
                                    objectId={config.kpiIds.kpi7}></CustomKpi>
                                <CustomKpi className={'bmg-tiny-kpi'}
                                    app={this.props.app}
                                    style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                                    objectId={config.kpiIds.kpi8}></CustomKpi>
                            </div>
                        </div>
                    </div>
                    {/* MAIN CARD FIFTH PART (BARCHART)  */}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", padding: '10px 0' }}>
                        <BarChart objectId={config.barChart} app={this.props.app} containerStyle={{ padding: "10px 0 0 0", height: "57px" }} options={Appearance.barChart.smallVertical}></BarChart>
                    </div>


                    {/* MAIN CARD - SIXTH PART*/}
                    <div style={{ boxShadow: "inset 0 -1px 0 0 #E7E7E8", padding: '10px 0' }}>
                        <div>
                            <TextObject objectId={config.kpiIds.kpi9title} app={this.props.app} className={"kpi-row-title"}></TextObject>
                            <div style={{ display: "flex", alignItems: "flex-start" }}>
                                <CustomKpi className={'bmg-main-kpi'}
                                    style={{ marginRight: "5px" }}
                                    app={this.props.app}
                                    objectId={config.kpiIds.kpi9}></CustomKpi>
                                <CustomKpi className={'bmg-tiny-kpi'}
                                    app={this.props.app}
                                    style={{ flexDirection: "column", alignItems: "center", margin: '2px 0 7px 5px' }}
                                    objectId={config.kpiIds.kpi10}></CustomKpi>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

        </div>

    }
}