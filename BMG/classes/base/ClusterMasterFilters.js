class ClusterMasterFilters extends React.Component {

	constructor(props){
		super(props);
		this.state = {
            filterActive: false
        };
        this.openFilter = this.openFilter.bind(this);
        this.closeFilter = this.closeFilter.bind(this);
	}

    componentDidMount(){
        this.renderFilters();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.app !== this.props.app) {
            this.renderFilters();
        }
    }

    renderFilters() {
        var app = this.props.app;
        app.getList('masterobject', (reply) => {
            var objects = reply.qAppObjectList.qItems;
            var filterObjects = [];
            for (var i = 0; i < objects.length; i++) {
                for (var n = 0; n < objects[i].qMeta.tags.length; n++ ) {
                    if (objects[i].qMeta.tags[n].indexOf('Filtro') != -1) {
                        filterObjects.push(objects[i]);
                    }
                }
            };
            filterObjects.sort(function(a, b) {
                function getIndexTagOrder(letra) {
                    var indexTagOrder = null;
                    for(var i = 0; i < letra.qMeta.tags.length; i++) {
                        if(letra.qMeta.tags[i].split(': ')[0] == 'Order') {
                            indexTagOrder = i;
                        }
                    }
                    return indexTagOrder;
                }
                var valor1 = parseInt(a.qMeta.tags[getIndexTagOrder(a)].split(': ')[1]);
                var valor2 = parseInt(b.qMeta.tags[getIndexTagOrder(b)].split(': ')[1]);
                if(valor1 > valor2) {
                    return 1;
                }
                if(valor1 < valor2) {
                    return -1;
                }
                // se valor1 for igual a valor2
                return 0;
            })
            this.setState({filters: filterObjects});
            app.destroySessionObject(reply.qInfo.qId);
        });
    };


    

    openFilter() {
        this.setState({filterActive: true})
     }
 
     closeFilter() {
         this.setState({filterActive: false})
      }


	render() {
        let filterElements = [];
        if(this.state.filters) {
            for(var i = 0; i < this.state.filters.length; i++) {
                filterElements.push(<FilterPane _onClickMessage={this.openFilter} app={this.props.app} filterObject={this.state.filters[i]}></FilterPane>);
            }
        } else {
            <div>Nenhum filtro foi configurado</div>
        }

        
        return (
            <div className="filter-container cluster-master-filters" id="master-filters">
                {this.state.filterActive ?
                    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <button className="filter-back-btn" onClick={this.closeFilter}>
                            <i style={{marginRight: '9px', fontSize: '20px'}} class="fas fa-arrow-square-left"></i>
                            voltar</button>
                        <div id="current-filter" style={{ flex: "1" }}></div>    
                    </div>
                    :
                    filterElements
                }
                
            </div>
        )
  }

}