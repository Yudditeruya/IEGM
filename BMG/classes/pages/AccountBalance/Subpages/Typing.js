class Typing extends React.Component {
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
                    <div className="double-kpi-container">
                        <CustomKpi className={'bmg-main-kpi '}
                            app={this.props.app}
                            objectId={config.kpiIds.kpi1}></CustomKpi>

                        <CustomKpi className={'bmg-tiny-kpi'}
                            app={this.props.app}
                            valueStyle={{ whiteSpace: "nowrap" }}
                            objectId={config.kpiIds.kpi2}></CustomKpi>
                    </div>
                    <div className="multi-kpi-container" style={{ padding: "10px 0" }}>
                        <CustomKpi objectId={config.kpiIds.kpi3} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi4} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi5} className={'bmg-main-kpi kpi-small kpi-small-c2'} app={this.props.app} ></CustomKpi>
                    </div>
                </div>
                {/* MAIN CARD - SECOND PART */}
                <div style={{ paddingTop: "17px", paddingBottom: "0px" }}>
                    <div className="double-kpi-container">
                        <CustomKpi objectId={config.kpiIds.kpi6} className={'bmg-main-kpi '} app={this.props.app}></CustomKpi>
                        <CustomKpi objectId={config.kpiIds.kpi7} className={'bmg-tiny-kpi'} app={this.props.app}></CustomKpi>
                    </div>
                    <CustomKpi className={'bmg-main-kpi kpi-small'}
                        style={{ boxShadow: "none", padding: "10px 0 0 0" }}
                        app={this.props.app}
                        objectId={config.kpiIds.kpi8}></CustomKpi>
                </div>
            </Card>
            {/* TABELA LOJA X CONSULTOR */}

            <div class="content-sections-container">
                <div class="content-section">
                    <MergedTable app={this.props.app} firstColumnHeader={"Cadastro"} tableIds={[config.mergedTable.table1, config.mergedTable.table2]}></MergedTable>
                </div>

                {/* MES ATUAL X MES ANTERIOR */}
                <div class="content-section">
                    <LineChart
                        chartStyle={{ height: "calc(100% - 38px)", minHeight: "244px"}}
                        app={this.props.app} objectId={config.lineChart}
                        options={Appearance.lineChart.default}
                    ></LineChart>
                </div>

                {/* ESTOQUE PENDENTE */}
                <div class="content-section" >
                    <BarChart app={this.props.app} objectId={config.barChart} containerStyle={{ height: "calc(100% - 38px)", minHeight: "108px" }} options={Appearance.barChart.verticalShowPercents}></BarChart>
                </div>

                {/* TABELA POR GRUPO OU LOJA */}
                <div class="content-section">
                    <Dropdown onSelect={(e) => { this.setState({ activeTable: e.value }) }} values={tables}></Dropdown>
                    <NativeQlikObject className={"bmg-native-table"} app={this.props.app} qlikId={this.state.activeTable ? this.state.activeTable : config.tables.activeTable}></NativeQlikObject>
                </div>
            </div>
        </div>

    }
}