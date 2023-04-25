class RightSideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectionsLength: 0 };
    }

    onChangeSelectionsLength(length) {
        this.setState({ selectionsLength: length });
    }



    back() {
        this.props.app.back();
    }

    forward() {
        this.props.app.forward();
    }

    clear() {
        this.props.app.clearAll();
    }

    render() {
        let closeRightSidebar = ''
        let rightSideBarClass = 'right-sidebar';
        let btnControl = 'filter-control-btn';
        let gaugeQtdeSelecoes;
        if (this.props.showRightSideBar) {
            rightSideBarClass = 'right-sidebar active';
            btnControl = 'filter-control-btn menu-active';
            closeRightSidebar = 'close-right-sidebar'
        }

        if (this.state.selectionsLength > 0) {
            gaugeQtdeSelecoes = <div className="qtde-slections-gauge">{this.state.selectionsLength}</div>
        }

        var currentSelections = [];
        let filters;
        if (this.props.app) {
            currentSelections = <ClusterCurrentSelections app={this.props.app} onChangeSelectionsLength={this.onChangeSelectionsLength.bind(this)} />;
            filters = <ClusterMasterFilters app={this.props.app} key="filter02" />;
        }

        let closeSidebar = <div className={closeRightSidebar} onClick={this.props._onClickRightSideBar}></div>;

        let rightSideBar = <div className={'right-sidebar-class'}></div>;
        if (this.props.props.location.pathname !== "/dashboard/") {
            rightSideBar = <div className={'right-sidebar-class'}>
                <button onClick={this.props._onClickRightSideBar} className={btnControl}>
                    <i class="fal fa-filter"></i>
                    {gaugeQtdeSelecoes}
                </button>

                <div className={rightSideBarClass}>
                    <button onClick={this.props._onClickRightSideBar} className="x-close">
                        <i class="fal fa-times"></i>
                    </button>
                    <div className="custom-font selecoes-atuais">
                        Seleções Atuais
                    </div>
                    {currentSelections}
                    <div className="filters-control custom-font">
                        <div onClick={this.back.bind(this)} className="filter-back custom-font">
                            <i class="far fa-undo-alt"></i>
                        </div>
                        <div onClick={this.clear.bind(this)} className="filter-clear-all custom-font">
                            Limpar Tudo
                        </div>
                        <div onClick={this.forward.bind(this)} className="filter-next custom-font">
                            <i class="far fa-redo"></i>
                        </div>
                    </div>
                    {filters}
                </div>
                {closeSidebar}
            </div>
        }

        return (
            rightSideBar
        )
    }
}

