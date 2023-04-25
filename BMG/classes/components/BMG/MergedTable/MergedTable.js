/*

    Merged Table Component

    This component requires an array of Table IDs to merge them together and make one.
    It is necessary that all tables have the same amount of rows.
    
    Props:
    app = qlik object
    tableIds = string array

*/

class MergedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.hcDefinitions = [];
        this.promises = [];
        this.data = [];
    }

    componentDidMount() {
        this.getHypercubeDefinitions().then(() => { this.getData() });
        Utils.onDataChanged(this.props.app, () => {
            this.getData()
        });
    }

    getData() {
        this.promises = [];
        this.createPromiseChain();
        Promise.all(this.promises).then((data) => {
            this.formatTableData(data);
        })
    }

    createCube(definition, order) {
        return new Promise((resolve, reject) => {
            this.props.app.createCube(definition).then((data) => {
                resolve({data: data, order: order});
            })
        })

    }

    createPromiseChain() {
        for (let i = 0; i < this.hcDefinitions.length; i++) {
            this.promises.push(this.createCube(this.hcDefinitions[i].definition, this.hcDefinitions[i].order));
        }
    }

    getHypercubeDefinitions() {
        let app = this.props.app;
        return new Promise((resolve, reject) => {
            let definitions = [];
            let counter = 0;
            for (let i = 0; i < this.props.tableIds.length; i++) {
                let tableId = this.props.tableIds[i];
                let order = i;
                app.visualization.get(tableId).then((vis) => {
                    vis.model.getProperties().then((properties) => {
                        counter++;
                        definitions.push({id: tableId, definition: properties.qHyperCubeDef, order: order});
                        if (counter == this.props.tableIds.length) {
                            this.hcDefinitions = definitions;
                            resolve(definitions);
                        }
                    })
                })
            }
        })
    }

    formatTableData(tableData) {
        let newData = [];
        tableData.sort((a, b) => (a.order > b.order) ? 1 : -1)
        for (let i = 0; i < tableData.length; i++) {
            newData.push(tableData[i].data.layout.qHyperCube.qPivotDataPages[0]);
        }

        for (let i = 1; i < newData.length; i++) {
            for (let j = 0; j < newData[0].qData.length; j++) {
                newData[0].qData[j].push(newData[i].qData[j][0]);
            }
            newData[0].qTop.push(newData[i].qTop[0]);
        }

        this.setState({ data: newData[0] });
    }

    render() {
        let firstColumn = [];
        let headers = [];
        let rows = [];

        if (this.state.data) {
            for (let i = 0; i < this.state.data.qTop.length; i++) {
                let header = this.state.data.qTop[i].qText;
                headers.push(<th>{header}</th>);
            }

            for (let i = 0; i < this.state.data.qData.length; i++) {
                let row = this.state.data.qData[i];
                let cells = [];

                // FIRST COLUMN CELL FROM qLeft
                cells.push(<td><span>{this.state.data.qLeft[i].qText}</span></td>);

                // REMAINING CELLS qData
                for (let j = 0; j < row.length; j++) {
                    let cell = row[j].qText;
                    if(row[j].qAttrExps) {
                        cells.push(<td><span style={{backgroundColor: row[j].qAttrExps.qValues[0].qText || "", color: row[j].qAttrExps.qValues[1].qText || "", padding: "3px 5px", borderRadius: "6px"}}>{cell}</span></td>);
                    }
                }

                rows.push(<tr>{cells}</tr>)
            }
        }


        return (this.state.data ?
            <table class="bmg-merged-table">
                <thead>
                    <tr>
                        <th>{this.props.firstColumnHeader}</th>
                        {headers}
                    </tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table> 
            :
            <ObjectLoader></ObjectLoader>);
    }
}