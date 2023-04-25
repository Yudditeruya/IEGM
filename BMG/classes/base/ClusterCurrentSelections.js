class ClusterCurrentSelections extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            selectedFields: []
		};
		
		this.getObjects = this.getObjects.bind(this);
	}

	componentDidMount() {
        this.getObjects();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.app !== this.props.app) {
            this.getObjects();
        }
    }

	limpar(field) {
        this.props.app.field(field).clear();
    }

    clearFilters() {
        if (this.state.selectedFields.length > 0) {
            this.props.app.clearAll();
        }
    }

    getObjects() {
        this.props.app.getList("CurrentSelections", (reply) => {
            var selections = reply.qSelectionObject.qSelections;
            let selectedFieldsArray = []
            selections.forEach(_ => {
                let name = _.qField
                selectedFieldsArray.push({
                    values: _.qSelected,
                    field: _.qField,
                    name: name
                })
            });
            this.setState({
                selectedFields: selectedFieldsArray,
            })

            this.props.onChangeSelectionsLength(selectedFieldsArray.length);
        });
    }

	render() {
		var activeFilters = "";
		var currentSelection = [];

        if(this.state.selectedFields.length > 0) {
            for(var i = 0; i < this.state.selectedFields.length; i++) {
                let selection = this.state.selectedFields[i];
                currentSelection.push(
                    <div>
                        <div className="current-information">
                            <span className="current-title-span">{selection.name}</span>
                            <div className="filter-items">
                                <div>
                                    <div>{selection.values}</div>
                                </div>  
                                <button className="clear-btn" onClick={() => {this.limpar(selection.field)}}>
                                    <i class="fal fa-times-circle"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
            activeFilters = <div id="filtros-ativos">{currentSelection}</div>;

        } else {
            activeFilters = <div className="nenhum-filtro">Nenhum filtro aplicado</div>;
        }

        return (
            <div className="cluster-current-selections">
                {activeFilters}
            </div>
        )
  }

}